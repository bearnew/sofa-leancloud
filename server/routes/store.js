const controller = require('../controllers/store');
const Router = require('koa-router');

const router = new Router({ prefix: '/store' });

// 获取店铺信息
router.get('/get', controller.getStoreInfo);

// 更新店铺信息
router.post('/update', controller.updateStoreInfo);

module.exports = router;
