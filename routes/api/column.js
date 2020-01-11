let router=require("express").Router();
let mgdb=require("../../utils/mgdb");

//列表
router.get("/",(req,res,next)=>{
    let _id=req.query._id;
    if (!_id) {
        mgdb.find({
            collectionName:"column",
            ...req.query
            
        }).then(
            result=>res.send(result)
        ).catch(
            err=>res.send(err)
        )
    } else {
        mgdb.find({
            collectionName:"column",_id:_id
        }).then(
            result=>res.send(result)
        ).catch(
            err=>res.send(err)
          )
        // getDetail(_id)
    }
})
//详情
router.get("/:_id",(req,res,next)=>{
    console.log("column详情",_id);
    mgdb.find({
        collectionName:"column",_id:req.params._id
    }).then(
        result=>res.send(result)
    ).catch(
        err=>res.send(err)
      )
    // getDetail(req.params._id)
    // res.end()
})

// function getList(){
//     mgdb.open({
//         dbName:"newapp",
//         collectionName:"home"
//     }).then(
//         ({collection,client})=>{
//             collection.find({},{projection:{}}).toArray((err,result)=>{
//                 console.log(result);
//                 client.close()
//             })
//         }
//     )
// }
// function getDetail(_id){
//     // console.log("home详情",_id);
//     mgdb.open({
//         dbName:"newapp",
//         collectionName:"home"
//     }).then(
//         ({collection,client,ObjectId})=>{
//             collection.find({
//                 _id:ObjectId(_id)
//             },{projection:{}}).toArray((err,result)=>{
//                 console.log(result);
//                 client.close()
//             })
//         }
//     )
    
// }
module.exports=router