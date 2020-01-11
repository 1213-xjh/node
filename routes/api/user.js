let router=require("express").Router();
let open=require("../../utils/mgdb").open;
let jwt=require("../../utils/jwt");

 
router.get("/",(req,res,next)=>{
    //拿到地址栏的用户名和密码
    let token=req.body.token || req.headers.token||req.query.token;
    
    jwt.verify(token).then(
        // 兜库   校验
        decode=>{
            // console.log("token",decode);

            open({
                dbName:"newapp", 
                collectionName:"user", 
            }).then(
                ({collection,client,ObjectId})=>{
                    collection.find({
                        username:decode.username,_id:ObjectId(decode.id)
                    },{}).toArray((err,result)=>{//obj转arr
                        if(err){
                            res.send({err:1,msg:"集合操作失败3"})
                        }else{
                            if(result.length>0){
                                delete result[0].username
                                delete result[0].password
                             res.send({err:0,msg:"登录成功",data:result[0]})//返回的数据是个对象
                              
                        }else{
                            res.send({err:1,msg:"登录失败"})
                            }
                        }
                        client.close()
                    })
                }
        
            )
            
        }).catch(
        message=>res.send({
            err:1,
            msg:"未登录"
        })
    )

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbmEiLCJpZCI6IjVlMTMyODEzMzVjZTkxMDk4MDRlMjM5ZCIsImlhdCI6MTU3ODM1NTg4MiwiZXhwIjoxNTc4NDQyMjgyfQ.UyGuCIajvSV7AR73BAGsY5B-WJ5a7smThRnmXS-HG7E
    
})

module.exports=router