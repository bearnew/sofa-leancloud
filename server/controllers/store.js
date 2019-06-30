const AV = require('leancloud-storage');
const StoreModel = AV.Object.extend('Store');
const store = new StoreModel();

module.exports = {
    // 获取店铺文字描述
    async getStoreText(ctx) {
        let textInfo = {
            activityName: '',
            shopName: '',
            name: '',
            phone: '',
            advertise: ''
        };
        let msg = '';

        try {
            var query = new AV.Query('Store');
            const list = await query.find();

            for (let i = 0; i < list.length; i++) {
                const data = await list[i].get('textInfo');
                data && (textInfo = data)
            }

            msg = '获取数据成功!'
        } catch (err) {
            msg = '数据还未填写!'
        }

        ctx.status = 200;
        ctx.body = {
            data: textInfo,
            msg
        };
    },
    // 更新店铺文字描述
    async updateStoreText(ctx) {
        const {
            ...info
        } = ctx.request.body;
        let msg = '更新数据成功！';

        try {
            const query = new AV.Query('Store');
            const list = await query.find();
            let result = null;

            for (let i = 0; i < list.length; i++) {
                if (list[i].get('textInfo')) {
                    result = list[i];
                }
            }

            objectId = result.get('objectId');
            const todo = AV.Object.createWithoutData('Store', objectId);
            todo.set('textInfo', info);
            await todo.save();
        } catch (err) {
            msg = '更新数据失败, 请重试!';
            store.set('textInfo', info);
            await store.save();
            msg = '更新数据成功！';
        }

        ctx.status = 200;
        ctx.body = {
            msg
        };
    },
    // 获取店铺图片
    async getStorePic(ctx) {
        let msg = '获取图片成功!';
        let urls = [];

        try {
            const query = new AV.Query('Store');
            const list = await query.find();

            for (let i = 0; i < list.length; i++) {
                const data = await list[i].get('imageInfo');
                data && (urls = data);
            }
        } catch (err) {
            msg = '获取图片失败！';
        }

        ctx.status = 200;
        ctx.body = {
            data: urls || [],
            msg
        };
    },
    // 更新店铺图片
    async updateStorePic(ctx) {
        const {
            urls
        } = ctx.request.body;
        let msg = '';

        try {
            // 将上传后返回的url存储在imageInfo中
            const query = new AV.Query('Store');
            const list = await query.find();
            let result = null;

            for (let i = 0; i < list.length; i++) {
                if (list[i].get('imageInfo')) {
                    result = list[i];
                }
            }

            // 已存在，更新
            const objectId = result.get('objectId');

            const todo = AV.Object.createWithoutData('Store', objectId);
            todo.set('imageInfo', urls);
            await todo.save();
            msg = '图片上传成功！'
        } catch (err) {
            msg = '图片上传失败，请重试！';
            // 不存在，创建
            store.set('imageInfo', urls);
            await store.save();
            msg = '图片上传成功！';
        }

        ctx.status = 200;
        ctx.body = {
            msg
        };
    }
};
