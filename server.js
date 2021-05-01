const express =  require('express')
const bodyParser=require('body-parser')
const app=express()
const MongoClient=require('mongodb').MongoClient
var db;
var s;
MongoClient.connect('mongodb://localhost:27017/Inventory',(err, database) => {
    if (err) return console.log(err)
    console.log('Connected')
    db=database.db('Inventory')
      app.listen(3000, () => {
    console.log('listening on 3000')
    })
        })
    app.set('view engine','ejs')
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(express.static('public'))
    
    //Homepage
    app.get( '/', (req,res) =>{
        db.collection('Mobiles').find().toArray((err,result)=>{
            if(err) return console.log(err)
            res.render('homepage.ejs',{data:result})
        })
    })
        app.get('/create', (req,res)=>{
            db.collection('Mobiles').find().toArray((err,result)=>{
                if(err) return console.log(err)
            res.render('add.ejs',{data:result})
        })
    })
        
        app.get('/updatestock', (req,res)=>{
            db.collection('Mobiles').find().toArray((err,result)=>{
                if(err) return console.log(err)
            res.render('update.ejs',{data:result})
        })
    })
        
        app.get('/deleteproduct', (req,res)=>{
            db.collection('Mobiles').find().toArray((err,result)=>{
                if(err) return console.log(err)
            res.render('delete.ejs',{data:result})
        })
    })
        
        app.post('/AddData', (req,res)=>{
            db.collection('Mobiles').save(req.body, (err, result)=>{
                if(err) return console.log(err)
                res.redirect('/')
            })
        })
        app.post('/delete', (req,res)=>{
            db.collection('Mobiles').findOneAndDelete({Product_id:req.body.Product_id},(err, result) => {
                if (err)
                    return console.log(err)
                res.redirect('/')
                })
            })
        app.post('/update', (req, res) => {
        
            db.collection('Mobiles').find().toArray((err, result) => {
                if (err)
                    return console.log(err)
                for(var i=0; i<result.length; i++)
                {
                    if(result[i].Product_id==req.body.Product_id)
                    {
                        s = result[i].Stock
                        break
                    }
                }
                db.collection('Mobiles').findOneAndUpdate({Product_id:req.body.Product_id}, {
                    $set: {Stock: parseInt(s) + parseInt(req.body.Stock)}}, {sort: {_id:-1}},
                    (err, result) => {
                    if (err)
                        return console.log(err)
                    res.redirect('/')
                    })
                })
            })
           
            