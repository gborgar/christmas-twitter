const mongoose = require('mongoose');
const Post = require("../models/post.model");

module.exports.list = (req, res, next) => {
  Post.find({ author: req.user.id })
    .then((posts) => res.render("posts/list", { posts }))
    .catch((error) => next(error));
};


module.exports.newPost = (req, res, next) => {
  res.render("posts/new");
};

module.exports.doNewPost = (req, res, next) => {
    const post = req.body;
    post.author = req.user.id;

  Post.create(post)
    .then(() => res.redirect("/posts"))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("posts/new", {
          contact: req.body,
          errors: error.errors,
        });
      } else {
        next(error);
      }
    });
};
module.exports.doLike = (req, res, next) => {
	console.log("id:: ", req.params.id);
	Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1} })
			.then((post) => {
				if (post) {
						res.redirect('/posts');
				} else {
						next(createError(404, 'Post not found'))
				}
			})
			.catch((error) => next(error));
};
