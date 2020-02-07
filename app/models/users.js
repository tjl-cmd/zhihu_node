const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const userSchema = new Schema({
    __v: {type: Number, select: false},
    name: {type: String, required: true},//名字
    password: {type: String, required: true, select: false},//密码
    avatar_url: {type: String},//头像
    gender: {type: String, enum: ['male', 'female'], default: 'male', required: true},//性别
    headline: {type: String,}, //一句话介绍自己
    locations: {type: [{type: Schema.Types.ObjectId,ref :'Topic'}],select: false}, //居住地
    business: {type: Schema.Types.ObjectId,ref:'Topic',select: false}, //所在行业
    employments: {
        type: [{
            company: {type: Schema.Types.ObjectId,ref:'Topic',}, //公司
            job: {type: Schema.Types.ObjectId,ref : "Topic",} //行业
        }],select: false
    }, //职业经历
    educations:{
       type:[{
           school : {type : Schema.Types.ObjectId,ref : "Topic" ,},//学校
           major : {type : Schema.Types.ObjectId, ref :"Topic"},//专业方向
           diploma:{type : Number,enum : [1,2,3,4,5]},//学历
           entrance_year:{type :Number},//入学年份
           graduation_year:{type :Number},//毕业年份
       }],select: false
    },
    following:{type:[{type : Schema.Types.ObjectId,ref:'User'}],select : false},//关注
    followingTopics:{ //关注话题
        type:[{type : Schema.Types.ObjectId,ref:'Topic'}],select : false
    }
    // age:{type:Number,default:0}
});
module.exports = model('User', userSchema);

