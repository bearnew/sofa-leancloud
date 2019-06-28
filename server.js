var AV = require('leanengine');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID || 'EIgBYotIgkBg6gI1Pilq0SAY-9Nh9j0Va',
  appKey: process.env.LEANCLOUD_APP_KEY || 'TK8nEix64Fy5Baz5tR1wG0Qe',
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'rMz9qreOybamQtAySDlhI3Vc'
});

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

var app = require('./server/app');

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);

app.listen(PORT, function (err) {
  console.log('Node app is running on port:', PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function (err) {
    console.error("Caught exception:", err.stack);
  });
  process.on('unhandledRejection', function (reason, p) {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack);
  });
});
