const Koa = require('koa'); //引入koa框架
const koaBody = require("koa-body"); //获取请求参数中间件
const koaStatic = require("koa-static");//使用中间件生产图片链接
const error = require("koa-json-error"); //报错信息中间件
const parameter = require("koa-parameter");//校验参数
const mongoose = require('mongoose'); //引用MongoDB
const path = require("path"); //引用路径
const {connectionStr} = require("./config/config"); //引入配置文件

const app = new Koa(); //实例化一个koa对象
const routing = require("./routes"); //引入路由文件
//初始化中间件
app.use(koaStatic(path.join(__dirname,"public"))); //存储静态文件

mongoose.connect(connectionStr, {useNewUrlParser: true},); //MongoDB连接
mongoose.connection.on('connected', function (e) {
    console.log('connect success');
});
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(1);
});
mongoose.Promise = Promise;
app.use(error({postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}}));//判断开发环境

//初始化koa-body中间件
app.use(koaBody({
    multipart:true,
    formidable:{
        uploadDir : path.join(__dirname,"/public/uploads"),
        keepExtensions:true,
    }
}));
app.use(parameter(app));
routing(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`程序启动在${port}`));