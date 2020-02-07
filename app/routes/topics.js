const Router = require('koa-router'); //引入路由
const router = new Router({prefix: '/topics'});//引入模型
const {find,findById,create,update,listTopicFllowers,checkTopicExist,listQuestions}= require("../controllers/topics");//引入控制器
const jwt = require("koa-jwt"); //引入jwt
const {secret} = require("../config/config");//引入配置文件
const auth = jwt({secret}); //jwt token 验证

/*查找话题*/
router.get("/",find);
/*创建话题*/
router.post("/",auth,create);
/*根据话题id查找话题*/
router.get("/:id" , checkTopicExist,findById);
/*更新话题*/
router.patch("/:id", auth, checkTopicExist, update);
/*根据id获取话题列表*/
router.get("/:id/followersTopic" , checkTopicExist, listTopicFllowers);
router.get("/:id/questions" , checkTopicExist, listQuestions);

module.exports = router;
