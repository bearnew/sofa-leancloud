'use strict';

const path = require('path');

const AV = require('leanengine');
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const statics = require('koa-static');
const bodyParser = require('koa-bodyparser');

// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./cloud');

const app = new Koa();

// 设置模版引擎
app.use(views(path.join(__dirname, '../dist')));

// 设置静态资源目录
// app.use(statics(path.join(__dirname, '../dist')));

app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "http://localhost:2222");
    await next();
});

let count = 0;
const maxAllowRequest = 5;
const queue = [];

app.use(async (ctx, next) => {
    count++;
    // 如果超过了最大并发数目
    if (count >= maxAllowRequest) {
        // 如果当前队列中已经过长
        await new Promise((resolve, reject) => {
            queue.push(resolve);
        });
    }
    await next();
    count--;

    const task = queue.shift();
    task && task();
});

// 加载云引擎中间件
app.use(AV.koa());

app.use(bodyParser());

const router = new Router();
app.use(router.routes());


router.get('/', async function (ctx) {
    ctx.state.currentTime = new Date();
    // await ctx.render('./index.html');
    await delay();
    ctx.body = 'hello koa';
});

// 可以将一类的路由单独保存在一个文件中
app.use(require('./routes/todos').routes());
app.use(require('./routes/store').routes());
app.use(require('./routes/user').routes());

module.exports = app;

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    });
}
