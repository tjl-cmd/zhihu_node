const Router = require('koa-router');
const router = new Router({prefix: '/users'});
const
    {
        find,
        findById,
        create,
        update,
        delete: del,
        login,
        checkOwer,
        listFollowing,
        checkUserExist,
        follow,
        unfollow,
        listFllowers,
        followTopic,
        unfollowTopic,
        listFollowingTopics,
        listQuestion
    } = require("../controllers/users");
const jwt = require("koa-jwt");
const {secret} = require("../config/config");
const {checkTopicExist} = require("../controllers/topics");

function ltrim(str) { //删除左边的空格
    return str.replace(/(^\s*)/g, "");
}

/*jwt验证*/
const auth = jwt({secret});
/*查找用户*/
router.get("/", find);
/*创建用户*/
router.post("/", create);
/*查找用户*/
router.get("/:id", findById);
/*查询指定用户*/
router.patch("/:id", auth, checkOwer, update);
/*删除用户*/
router.delete("/:id", auth, checkOwer, del);
/*登陆*/
router.post('/login', login);
/*粉丝列表*/
router.get("/:id/following", listFollowing);
/*关注列表*/
router.get("/:id/followings", listFllowers);
/*关注*/
router.put("/following/:id", auth, checkUserExist, follow);
/*取消关注*/
router.delete("/following/:id", auth, checkUserExist, unfollow);
/*话题列表*/
router.get("/:id/followingTopics", listFollowingTopics);
/*更新话题*/
router.put("/followingTopics/:id", auth, checkTopicExist, followTopic);
/*根据id删除话题*/
router.delete("/followingTopics/:id", auth, checkTopicExist, unfollowTopic);
/*获取用户问题列表*/
router.get("/:id/questions", listQuestion);
module.exports = router;
/*
async (ctx, next) => {
    const {authorization = ''} = ctx.request.header;
    const token = authorization.replace('Bearer', '');
    const token1 = ltrim(token);
    try {
        const user = jwt.verify(token1, secret);
        ctx.state.user = user;
    } catch (err) {
        console.log(err);
        ctx.throw(401, err.message)
    }
    await next();
};
*/