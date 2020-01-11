let router=require("express").Router();
let open=require("../../utils/mgdb").open;
let jwt=require("../../utils/jwt");
let bcrypt=require("bcryptjs");

router.post("/",(req,res,next)=>{
    //拿到地址栏的用户名和密码
    let {username,password}=req.body
    if(!username || !password){
        res.send({
            err:1,
            msg:"用户名和密码为必传参数"
        });
        return;
    }

    //兜库  校验
    open({
        dbName:"newapp", 
        collectionName:"user", 
    }).then(
        ({collection,client})=>{
            collection.find({
                username
            },{}).toArray((err,result)=>{//obj转arr
                if(err){
                    res.send({err:1,msg:"集合操作失败3"})
                }else{
                    if(result.length>0){

                        let bl = bcrypt.compareSync(password, result[0].password);

                        if(bl){
            
                          //4. 生成token
                          let token = jwt.sign({username,id:result[0]._id})
            
                          //返回信息给客户端
                          delete result[0].username;
                          delete result[0].password; //用户名和密码无需返回给客户端
            
                          res.send({err:0,msg:'登录成功',data:result[0],token});//返回的数据是个对象
            
                        }else{
                          res.send({err:1,msg:'用户名或者密码有误'});//返回的数据是个对象
                        }
                }else{
                    res.send({err:1,msg:"集合失败"})
                    }
                }
                client.close()
            })
        }

    )
    
})

module.exports=router
// let router = require('express').Router();
// let open = require('../../utils/mgdb').open;
// let jwt = require('../../utils/jwt')
// let bcrypt = require('bcryptjs')
// router.post('/',(req,res,next)=>{
// 	let {username,password}=req.body;
// 	if(!username||!password){
// 		res.send({
// 			err:1,
// 			msg:'用户名,密码为必传参数'
// 		});
// 		return;
// 	}
// 	open({
// 		dbName:'newsapp',
// 		collectionName:'user'
// 	}).then(
// 		({collection,client})=>{
// 			collection.find({
// 				username
// 			}).toArray((err,result)=>{
// 				if(err){
// 					res.send({err:1,msg:'集合操作失败3'})
// 				}else{
// 					if(result.length>0){
// 						let bl = bcrypt.compareSync(password, result[0].password);
// 						if(bl){		
// 							let token = jwt.sign({username,id:result[0]._id});
							
// 							delete result[0].username;
// 							delete result[0].password;
							
// 							res.send({err:0,msg:'登陆成功',data:result[0],token})
// 						}else{
// 							res.send({err:1,msg:'用户名密码错误'})
// 						}
// 					}else{
// 						res.send({err:1,msg:'登陆失败'})
// 					}
// 				}
// 				client.close()
// 			})
// 		}
// 	).catch()
// })

// module.exports=router;