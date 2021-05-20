const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
 
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User 
        },
      ],
    });
    
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
   
    // Pass serialized data and session flag into template
    res.render('homepage', { posts});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));
    const post = postData.get({ plain: true });
    //console.log(comments)
    res.render('post', {post, comments});
  } catch (err) {
    res.status(500).json(err);
  }
});



// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
 // console.log( req.session.user_id)

  try {
  
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Post 
        },
      ],
      
    });
    const user = userData.get({ plain: true });

    //console.log( user)


    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
