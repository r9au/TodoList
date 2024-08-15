const exp=require('express')
const port=3000
const app=exp()
const cors=require('cors')
const bodyparser=require('body-parser')
const {MongoClient}=require('mongodb')
const cli= new MongoClient('mongodb://localhost:27017')
app.use(cors())
app.use(bodyparser.json())
cli.connect()
// const tododb= new cli.db('tododb')
// const todocol=tododb.collection('todocl')
// cli.connect((err)=>{
//     if(!err){
//         console.log('connection created')
//     }
//     // const tododb= new cli.db('tododb')
//     // tododb.createCollection('todocol')
// })
app.get('/',async(req,res)=>{
    const tododb= cli.db('tododb')
    const todocol=tododb.collection('todocl')
    const tl= await todocol.find({}).toArray()
    res.json(tl)
})
app.post('/',async(req,res)=>{
    const to1=req.body
    const tododb=cli.db('tododb')
    const todocol=tododb.collection('todocl')
    const tdata= await todocol.insertOne(to1)
    res.send({success:true,result:tdata})
})
app.delete('/',async(req,res)=>{
    const id=req.body
    const tododb=cli.db('tododb')
    const todocol=tododb.collection('todocl')
    const tdata= await todocol.deleteOne(id)
    // res.send({res})
})
app.delete('/day',async(req,res)=>{
    let p =req.body
    const tododb=cli.db('tododb')
    const todocol=tododb.collection('todocl')
    const tdata= await todocol.deleteMany(p)
    // res.send({res})
})
app.listen(port,()=>{
    console.log(`app listening on port http://localhost:${port}`)
})
