const express = require('express');

const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());


//MOngoDB_Info
//user name: dbUser1
// password : XZE4SZWYe7OuYf8D
// DB-NAME=fruitsExpress // newDB
// Collection_name=user // worker
//Node.s venison = 2.2.12




const uri = "mongodb+srv://dbUser1:XZE4SZWYe7OuYf8D@cluster0.itabl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log('DB connected')
async function run(){
    
    try{
        await client.connect();
        const userCollection = client.db("newDB").collection("worker");
        // const user = {name:'Babul Kumar', email: 'babul@gmail.com' };
        // const result = await userCollection.insertOne(user);
        // console.log(`User inserted id:${result.insertedId}`);

    // get a user    
        app.get('/user', async (req, res) =>{
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);

        })
        //update a user client
        app.get('/user/:id', async(req, res) =>{
            const id = req.params.id;
            const query ={_id:ObjectId(id)};
            const result = await userCollection.findOne(query);
            res.send(result); 
        })

// POST user: add a new user
        app.post('/user', async (req, res) =>{
            const newUser = req.body;
            console.log('adding new user', newUser);
            const result = await userCollection.insertOne(newUser);
                    res.send(result);
        })
        // Update user server
        app.put('/user/:id', async(req, res) =>{
            const id =req.params.id;
            const updatedUser = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true};
            const updateDoc = {
                $set:{
                    name: updatedUser.name,
                    email: updatedUser.email
                 }
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })


        // delete a user 
        app.delete('/user/:id', async(req,res) =>{
            const id =req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })



    }
    finally{
        // await client.close();
    }

}
    run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('Running my server node crud');
});

app.listen(port,()=>{
    console.log('CRUD server is running');
})