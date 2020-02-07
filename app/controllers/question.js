const Question = require("../models/questions");

class QuestionCtl {
    /*模糊查找问题*/
    async find(ctx) {
        const {per_page = 10} = ctx.query;
        const page = Math.max(ctx.query.page * 1 ,1) - 1;
        const perPage = Math.max(per_page * 1,1);
        const q = new RegExp(ctx.query.q );
        ctx.body = await Question
            .find({$or:[{title:q},{description : q}]}) //模糊搜索
            .limit(perPage)
            .skip(page * perPage);
    }
    /*判断问题是否存在*/
    async checkQuestionExist(ctx, next) {
        const question = await Question.findById(ctx.params.id).select('+questioner');
        if (!question) {
            ctx.throw(404, '问题不存在')
        }
        ctx.state.question = question;
        await next();
    }
    /*根据id查找问题*/
    async findById(ctx) {
        const { fields = ''} = ctx.query;
        const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
        ctx.body = await Question.findById(ctx.params.id).select(selectFields).populate('questioner topics');
    }
    /*创建问题*/
    async create(ctx) {
        ctx.verifyParams({
            title: {type: 'string', required: true},
            description: {type: 'string', required: false},
        });
        ctx.body = await new Question({...ctx.request.body, questioner: ctx.state.user._id}).save();
    }
    async checkQuestioner(ctx,next){
        const {question} = ctx.state
        if (question.questioner.toString() !== ctx.state.user._id){ctx.throw(403,'没有权限')};
        await next();
    }
    /*更新问题*/
    async update(ctx) {
        ctx.verifyParams({
            title: {type: 'string', required: false},
            description: {type: 'string', required: false}
        });
        await  ctx.state.question.update(ctx.request.body);
        console.log(ctx.body);
        ctx.body = ctx.state.question;
    }
   async delete(ctx){
        await  Question.findByIdAndRemove(ctx.params.id);
        ctx.status = 204;
   }
}

module.exports = new QuestionCtl();