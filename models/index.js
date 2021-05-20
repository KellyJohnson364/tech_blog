const User = require('./User');
const Post = require('./post');
const Comment = require('./comment');


User.hasMany(Post, {
  foreignKey: 'user_id',  
});
Post.belongsTo(User, {
  foreignKey: 'user_id'
});
Post.hasMany(Comment, {
  foreignKey: 'post_id',
});



module.exports = { User, Post, Comment };
