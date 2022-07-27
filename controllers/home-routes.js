const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    include: [User]
  })
    .then(dbPostData => {
      const posts = dbPostData.map((post) => post.get({ plain: true }))
      // pass a single post object into the homepage template
      res.render('homepage', {posts, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

  });
  
  router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      include: [User, {
        model: Comment,
        include: [User]
      }]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }

        // serialize the data
        const post = dbPostData.get({ plain: true });

        // pass data to template
        res.render('single-post', { post, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('signup')
})
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('login')
})



module.exports = router;

  //14.3.3 Did you notice that we're hardcoding the post data again? This is an easier way to test the template than going straight to the Sequelize query. Just imagine—if we sent the Sequelize query at this stage, then we wouldn't know where to look for errors if something went wrong. This way, if any problems arise, we know that they must originate between the client and the server.

//Restart the server and navigate to http://localhost:3001/post/1 (Links to an external site.) in the browser. 