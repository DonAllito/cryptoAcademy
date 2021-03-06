const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('../../http/controllers/homeController');
const courseController = require('app/http/controllers/courseController');
const userController = require('app/http/controllers/userController');
const articleController = require('app/http/controllers/articleController');
// validators 
const commentValidator = require('app/http/validators/commentValidator');

// middlewares
const redirectIfNotAuthenticated = require('app/http/middleware/redirectIfNotAuthenticated');

router.get('/logout' , (req ,res) => {
    req.logout();
    res.clearCookie('remember_token');
    res.redirect('/');
});

// course Routes
router.get('/about-me' , homeController.index);
router.get('/courses' , courseController.index);
router.get('/courses/:course' , courseController.single);
router.post('/courses/payment' , redirectIfNotAuthenticated.handle , courseController.payment);
router.get('/courses/payment/checker' , redirectIfNotAuthenticated.handle , courseController.checker);

//ََArticle
router.get('/articles', articleController.allArticle);
router.get('/article/:article', homeController.articlePage);

// home routes
router.get('/' , homeController.index);
router.get('/faq' , homeController.faq);
router.get('/features' , homeController.features);
router.get('/chart' , homeController.chart);
router.get('/contact' , homeController.contact);
router.get('/exchange' , homeController.exchange);


router.post('/comment' , redirectIfNotAuthenticated.handle , commentValidator.handle() ,homeController.comment);
router.get('/download/:episode' , courseController.download);

router.get('/user/panel' , userController.index);
router.get('/user/panel/history' , userController.history);
router.get('/user/panel/vip' , userController.vip);
router.post('/user/panel/vip/payment' , userController.vipPayment);
router.get('/user/panel/vip/payment/check' , userController.vipPaymentCheck);


module.exports = router;