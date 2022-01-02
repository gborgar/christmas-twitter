const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");
const misc = require("../controllers/misc.controller");
const secure = require("../middlewares/secure.mid");

router.get("/", misc.home);

router.get('/register', auth.register);
router.post('/register', auth.doRegister);
router.get('/login', auth.login);
router.post('/login', auth.doLogin);
router.get('/logout', auth.logout);



module.exports = router;