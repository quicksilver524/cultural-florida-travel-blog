const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth =  require('../utils/auth')

router.get('/', (req, res)=>{ 
  // router.get('/', withAuth, (req, res)=>{ 
  Post.findAll({
        // where: {
        //     user_id: req.session.user_id
        // }
      })
        .then(dbPostData => {
          const posts = dbPostData.map((post) => post.get({ plain: true }))
          // pass a single post object into the homepage template
          res.render('dashboard', {posts, loggedIn: req.session.loggedIn});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
})

//New Route for new posts needs to have a handlebar form for submit and (js)

router.post('/', withAuth, (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Edit Route for editing your posts and handlebar form for submit (js)
router.get('/edit/:id', withAuth, (req, res) => { 
  Post.findByPk(req.params.id)
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        
        res.render('edit-post', {
          post,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports =  router;