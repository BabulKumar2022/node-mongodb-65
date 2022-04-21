const express = require('express');

const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

//user name: dbUser1
// password : XZE4SZWYe7OuYf8D




const uri = "mongodb+srv://dbUser1:XZE4SZWYe7OuYf8D@cluster0.itabl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");

  console.log('db connected');
  // perform actions on the collection object
  client.close();
});


app.get('/',(req, res) =>{
    res.send('Running my server node crud');
});

app.listen(port,()=>{
    console.log('CRUD server is running');
})