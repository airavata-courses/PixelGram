var express = require('express');
var router = express.Router();
var userRouter = require('./userService');
var imageRouter = require('./imageService');
var cloudRouter = require('./cloudService');


router.use((req, res, next) => {
    console.log("Called: ", req.path);
    next();
});

router.use(userRouter);
router.use(imageRouter);
router.use(cloudRouter);

module.exports = router;