const Router = require('koa-router'); //引入路由
const router = new Router({prefix: '/questions'});//引入模型
const {find,findById,create,update,delete:del,checkQuestioner,checkQuestionExist}= require("../controllers/question");//引入控制器
const jwt = require("koa-jwt"); //引入jwt
const {secret} = require("../config/config");//引入配置文件
const auth = jwt({secret}); //jwt token 验证

/*查找问题*/
router.get("/",find);
/*创建问题*/
router.post("/",auth,create);
/*根据问题id查找问题*/
router.get("/:id" , checkQuestionExist,findById);
/*更新问题*/
router.patch("/:id", auth, checkQuestionExist, checkQuestioner, update);
/*删除问题*/
router.delete("/:id",auth,checkQuestionExist,checkQuestioner, del);
module.exports = router;
