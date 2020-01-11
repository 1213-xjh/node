let router=require("express").Router();



//session清除
router.delete("/",(req,res,next)=>{
    // console.log("logout");

    req.session.key=undefined;
    
})

module.exports=router