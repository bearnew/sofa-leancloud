const AV = require('leanengine');
const StoreModel = AV.Object.extend('Store');
const store = new StoreModel();

module.exports = {
    async updateStoreInfo(ctx) {
        const {
            ...info
        } = ctx.request.body;

        store.set('textInfo', info);
        await store.save();

        ctx.status = 200;
        ctx.body = {
            msg: '更新数据成功！'
        };
    },
    async getStoreInfo(ctx) {
        let info = {
            activityName: '',
            shopName: '',
            name: '',
            phone: '',
            advertise: ''
        };
        try {
            info = await store.fetch();
        } catch(err) {
            if (err.code === 101) {
                // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
                // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
            } else {
                throw err;
            }
        }

        ctx.status = 200;
        ctx.body = {
            res: info,
            msg: '获取数据成功！'
        };
    }
};
