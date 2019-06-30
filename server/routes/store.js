const controller = require('../controllers/store');
const Router = require('koa-router');

const router = new Router({ prefix: '/store' });

// 获取店铺文字信息
router.get('/getText', controller.getStoreText);

// 更新店铺文字信息
router.post('/updateText', controller.updateStoreText);

// 获取店铺图片信息
router.get('/getPic', controller.getStorePic);

// 更新店铺图片信息
router.post('/updatePic', controller.updateStorePic);

module.exports = router;
