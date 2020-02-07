const Router = require('koa-router');
const router = new Router();
const {index,upload} = require("../controllers/home");
/*首页*/
router.get('/', index);
/*上传文件接口*/
router.post("/upload" , upload);

module.exports = router;