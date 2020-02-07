const fs = require('fs');
module.exports = (app) =>{
    /*上传文件*/
    fs.readdirSync(__dirname).forEach(file =>{
        if (file === 'index.js'){return;}
        const route = require(`./${file}`);
        app.use(route.routes()).use(route.allowedMethods());
    })
}