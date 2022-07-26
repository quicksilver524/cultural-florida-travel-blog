const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Post, User, Comment, Vote} = require('../../models');
const withAuth = require('../../utils/auth');
var _ = require('lodash');

// get all users
router.get('/', (req, res) => {

    Post.findAndCountAll({
        attributes: [
            'id',
            'title',
            'cover_url',
            'post_body',
            'view_count',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ],
        limit: _.parseInt(req.query.limit) || 20,
        offset: _.parseInt(req.query.offset) || 0,
        distinct: true
    }).then(dbPostData => {
        res.json(_.assign({
            limit: _.parseInt(req.query.limit) || 20,
            offset: _.parseInt(req.query.offset) || 0,
            hasNextPage: (_.parseInt(req.query.limit) || 20) + (_.parseInt(req.query.offset) || 0) < dbPostData.count
        }, dbPostData));
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'cover_url',
            'post_body',
            'view_count',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({message: 'No post found with this id'});
                return;
            }
            res.json(dbPostData);

            Post.upview({post_id: req.params.id}, {Vote, Comment, User});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
        title: req.body.title,
        cover_url: req.body.cover_url,
        user_id: req.session.user_id,
        post_body: req.body.post_body,
        view_count: 1
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/upvote', (req, res) => {
    // custom static method created in models/Post.js
    Post.upvote({...req.body, user_id: req.session.user_id}, {Vote, Comment, User})
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/upview', (req, res) => {
    // custom static method created in models/Post.js
    Post.upview({...req.body, user_id: req.session.user_id}, {Vote, Comment, User})
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {

    let needModifyObj = _.pick(req.body, ['title', 'cover_url', 'user_id', 'post_body']);

    Post.update(
        needModifyObj,
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({message: 'No post found with this id'});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({message: 'No post found with this id'});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;