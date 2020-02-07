const mongoose = require("mongoose");

const {Schema, model} = mongoose;
const questionSchema = new Schema({
    __v:{type:Number,select:false},
    title:{type : String, required : true}, //名字
    description:{type : String,},//头像
    questioner:{type :Schema.Types.ObjectId,ref:'User',required:true,select : false},//简介
    topics: {
        type:[{type :Schema.Types.ObjectId,ref:'Topic'}],
        select:false
    }

});
module.exports = model('Question',questionSchema);