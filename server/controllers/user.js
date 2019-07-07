const AV = require('leancloud-storage');
const { AppID, AppSecret } = require('../constant/index');
const userModel = AV.Object.extend('Customer');
const request = require('request');

module.exports = {
    // 登录
    async login(ctx) {
        const {
            jsCode,
            language,
            ...userInfo // avatarUrl, city, country, nickName, province
        } = ctx.query;

        const apiUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${AppID}&secret=${AppSecret}&js_code=${jsCode}&grant_type=authorization_code`;
        console.log('4444')
        request(apiUrl, async function (error, response, body) {
            console.log('5555', JSON.stringify(response.body))
            if (response && response.body) {
                console.log('9999', JSON.parse(response.body).openid)
                const {
                    session_key,
                    openid
                } = JSON.parse(response.body);
                console.log('8888', openid)

                let userId = '';

                try {
                    var query = new AV.Query('Customer');
                    console.log('11111')
                    const list = await query.find();
                    console.log('44444')
                    // 如果已存在，则返回userId
                    for (let i = 0; i < list.length; i++) {
                        console.log('7777', JSON.stringify(list[i]))
                        if (list[i].get('openid') === openid) {
                            userId = list[i].get('userId');
                        }
                    }

                    console.log('2222')
                    // 如果不存在，则创建
                    if (userId === '') {
                        console.log('3333', openid, JSON.stringify(userInfo))

                        var UserModel = AV.Object.extend('Customer');
                        // 新建对象
                        var users = new UserModel();
                        users.set('openid', openid);
                        users.set('avatarUrl', userInfo.avatarUrl);
                        users.set('city', userInfo.city);
                        users.set('country', userInfo.country);
                        users.set('gender', userInfo.gender); // 1-male,
                        users.set('nickName', userInfo.nickName);
                        users.set('province', userInfo.province);

                        users.save().then(function (todo) {
                            console.log('objectId is ' + todo.id);
                        }, function (error) {
                            console.error(error);
                        });
                    }
                    // ctx.status = 201;
                    // ctx.body = {
                    //     userId,
                    //     // token,
                    //     openid
                    // }
                } catch (err) {
                    var UserModel = AV.Object.extend('Customer');
                    // 新建对象
                    var users = new UserModel();
                    users.set('openid', openid);
                    users.set('avatarUrl', userInfo.avatarUrl);
                    users.set('city', userInfo.city);
                    users.set('country', userInfo.country);
                    users.set('gender', userInfo.gender); // 1-male,
                    users.set('nickName', userInfo.nickName);
                    users.set('province', userInfo.province);

                    users.save().then(function (todo) {
                        console.log('objectId is ' + todo.id);
                    }, function (error) {
                        console.error(error);
                    });
                }
            } else {
                ctx.status = 201;
                ctx.body = {
                    // userId,
                    // token,
                    // openid
                }
            }
        });
    }
};
