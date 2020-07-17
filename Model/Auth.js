// const mongoose=require('mongoose') 
// const Schema= mongoose.Schema;
const {Schema,model}=require('mongoose');//one line instead of above two line Destructuring

const userSchema = new Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },

},{timesstamps:true}) ;

module.exports=model('users',userSchema);