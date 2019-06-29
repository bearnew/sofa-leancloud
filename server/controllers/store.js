const AV = require('leanengine');
const StoreModel = AV.Object.extend('Store');
const store = new StoreModel();

module.exports = {
    // 更新店铺文字描述
    async updateStoreInfo(ctx) {
        const {
            ...info
        } = ctx.request.body;
        let msg = '更新数据成功！';

        try {
            const query = new AV.Query('Store');
            const data = await query.find();

            if (data[0]) {
                // 已存在，更新
                objectId = data[0].get('objectId');
                const todo = AV.Object.createWithoutData('Store', objectId);
                todo.set('textInfo', info);
                await todo.save();
            } else {
                // 不存在，创建
                store.set('textInfo', info);
                await store.save();
            }
        } catch (err) {
            msg = '更新数据失败, 请重试!';
        }

        ctx.status = 200;
        ctx.body = {
            msg
        };
    },
    // 获取店铺文字描述
    async getStoreInfo(ctx) {
        let textInfo = {
            activityName: '',
            shopName: '',
            name: '',
            phone: '',
            advertise: ''
        };
        let msg = '';

        try {
            // AV.Query.doCloudQuery('delete from Store where objectId="5d177bdf1c0c7f00090b9fc1"')
            var query = new AV.Query('Store');
            const data = await query.find();
            // const data = await store.fetch();

            textInfo = data[0].toJSON().textInfo;
            msg = '获取数据成功!'
        } catch (err) {
            msg = '数据还未填写!'
        }

        ctx.status = 200;
        ctx.body = {
            data: textInfo,
            msg
        };
    }
};
