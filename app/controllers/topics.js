const Topic = require("../models/topics");
const User = require("../models/users");
const Question = require("../models/questions");

class TopicsCtl {
    /*模糊查找话题*/
    async find(ctx) {
        const {per_page = 10} = ctx.query;
        const page = Math.max(ctx.query.page * 1 ,1) - 1;
        const perPage = Math.max(per_page * 1,1);
        ctx.body = await Topic
            .find({name: new RegExp(ctx.query.q)}) //模糊搜索
            .limit(perPage)
            .skip(page * perPage);
    }
    /*判断话题是否存在*/
    async checkTopicExist(ctx, next) {
        const user = await Topic.findById(ctx.params.id);
        if (!user) {
            ctx.throw(404, '话题不存在')
        }
        await next();
    }
    /*根据id查找话题*/
    async findById(ctx) {
        const { fields = ''} = ctx.query;
        const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
        ctx.body = await Topic.findById(ctx.params.id).select(selectFields);
        // ctx.body = topic;
    }
    /*创建话题*/
    async create(ctx) {
        ctx.verifyParams({
            name: {type: 'string', required: true},
            avatar_url: {type: 'string', required: false},
            introduction: {type: 'string', required: false}
        });
        // const topic = await new Topic(ctx.request.body).save();
        ctx.body = await new Topic(ctx.request.body).save();
        // ctx.body = topic;
    }
    /*更新话题*/
    async update(ctx) {
        ctx.verifyParams({
            name: {type: 'string', required: false},
            avatar_url: {type: 'string', required: false},
            introduction: {type: 'string', required: false}
        });
        console.log(ctx.request.body);
        const topic = await  Topic.findByIdAndUpdate(ctx.params.id,ctx.request.body);
        console.log(topic);
        ctx.body = topic;
    }
    /*获取粉丝*/
    async listTopicFllowers(ctx) {
        // const users = await User.find({followingTopics: ctx.params.id});
        ctx.body = await User.find({followingTopics: ctx.params.id});
        // ctx.body = users;
    }
    /*列出问题模型*/
    async listQuestions(ctx){
        const questions = await Question.find({topics:ctx.params.id});
        ctx.body = questions;
    }
}

module.exports = new TopicsCtl();