const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");
const post = require("../controllers/post.controller");
const secure = require("../middlewares/secure.mid");
const profile = require("../controllers/profile.controller");

router.get("/", secure.isAuthenticated, post.list);

router.get("/profile", secure.isAuthenticated, profile.profile);

router.get("/posts/new", secure.isAuthenticated, post.newPost);
router.post("/posts", secure.isAuthenticated, post.doNewPost);
router.get("/posts", secure.isAuthenticated, post.list);
router.post("/posts/:id/like", secure.isAuthenticated, post.doLike);

router.get('/register', auth.register);
router.post('/register', auth.doRegister);
router.get('/login', auth.login);
router.post('/login', auth.doLogin);
router.get('/logout', auth.logout);



module.exports = router;