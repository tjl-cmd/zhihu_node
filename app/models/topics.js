const mongoose = require("mongoose");

const {Schema, model} = mongoose;
const topicSchema = new Schema({
    __v:{type:Number,select:false},
    name:{type : String, required : true}, //名字
    avatar_url:{type : String,},//头像
    introduction:{type :String,select : false},//简介

});
module.exports = model('Topic',topicSchema);