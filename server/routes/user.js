const controller = require('../controllers/user');
const Router = require('koa-router');

const router = new Router();

// 注册登录
router.get('/login', controller.login);

module.exports = router;
