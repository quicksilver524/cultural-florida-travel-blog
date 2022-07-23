router.get('/post/:id', (req, res) => {
    const post = {
      id: 1,
      post_url: 'https://handlebarsjs.com/guide/',
      title: 'Handlebars Docs',
      created_at: new Date(),
      vote_count: 10,
      comments: [{}, {}],
      user: {
        username: 'test_user'
      }
    };
  
    res.render('single-post', { post });
  });

  //14.3.3 Did you notice that we're hardcoding the post data again? This is an easier way to test the template than going straight to the Sequelize query. Just imagine—if we sent the Sequelize query at this stage, then we wouldn't know where to look for errors if something went wrong. This way, if any problems arise, we know that they must originate between the client and the server.

//Restart the server and navigate to http://localhost:3001/post/1 (Links to an external site.) in the browser. 