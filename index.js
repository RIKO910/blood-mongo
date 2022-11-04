const express =require('express');
const cors =require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app=express();
const port = process.env.PORT || 5000;

app.use (cors());
app.use(express.json())

//user name:riko
//password:zsIaHntenATorwzs


const uri = "mongodb+srv://riko:zsIaHntenATorwzs@cluster0.ew4o60e.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
        try{
                await client.connect();
                const usersCollection = client.db("express").collection("users");
                app.post('/users' ,async(req,res)=>{
                    const newUser =req.body;
                    console.log('adding new user',newUser);
                    const result =await usersCollection.insertOne(newUser);
                    res.send(result)
                });
        }
        finally{
            await client.close();
        }
}

run().catch(console.dir);

app.get('/',(req,res) =>{
    res.send("Running my Node CRUD Server");
});

app.listen(port,() =>{
    console.log('CRUD Server is running');
})