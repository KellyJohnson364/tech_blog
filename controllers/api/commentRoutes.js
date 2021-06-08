const router = require('express').Router();
const {Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    //console.log(req.session.user_name)
    const newComment = await Comment.create({
      ...req.body,
      username: req.session.user_name,
    });
    // console.log(newComment)
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;