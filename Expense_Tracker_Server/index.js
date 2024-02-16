const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;



//Midle Wares
app.use(cors());
app.use(express.json());




console.log(process.env.DB_USER);




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jip67yo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db("expenseMasteryDB").collection("users");
    const incomeCollection = client.db("expenseMasteryDB").collection("incomes");
    const expenseCollection = client.db("expenseMasteryDB").collection("expenses");





    app.post('/users', async(req, res) =>{
      const user = req.body;
      // insert email if user doesnt exists: 
      // you can do this many ways (1. email unique, 2. upsert 3. simple checking)
      const query = {email: user.email};
      const existingUser = await userCollection.findOne(query);
      if(existingUser){
        return res.send({message: "User Already Exists", insertedId: null});
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
  
      // Extract the inserted document's _id
      const insertedId = result.insertedId;
  
      // Update the user document with the photo URL
      await userCollection.updateOne(
          { _id: insertedId },
          { $set: { photo: user.photo } }
      );
      console.log(user);
    });


    app.get('/users',  async (req, res) => {

      const result = await userCollection.find().toArray();
      res.send(result);
    });


    // Post Incomes
    app.post('/incomes', async(req, res) =>{
      const incomeList = req.body;
      const result = await incomeCollection.insertOne(incomeList);
      res.send(result);
    });


    app.get('/incomes/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await incomeCollection.findOne(query);
      res.send(result);
    });

    
    // Get Incomes
    app.get('/incomes', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await incomeCollection.find(query).toArray();
      res.send(result);
    });

    app.patch('/incomes/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          incomeSource: item.incomeSource,
          amount: item.amount,
          date: item.date,
          description: item.description
        }
      }

      const result = await incomeCollection.updateOne(filter, updatedDoc)
      res.send(result);
    })


    app.delete('/incomes/:id',  async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await incomeCollection.deleteOne(query);
      res.send(result);
    });

    
    // Post Expenses
    app.post('/expenses', async(req, res) =>{
      const incomeList = req.body;
      const result = await expenseCollection.insertOne(incomeList);
      res.send(result);
    });
    
    app.get('/expenses/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await expenseCollection.findOne(query);
      res.send(result);
    });

    
    // Get Incomes
    app.get('/expenses', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await expenseCollection.find(query).toArray();
      res.send(result);
    });

    // Update Expenses
    
    app.patch('/expenses/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          expenseCategory: item.expenseCategory,
          expnseAmount: item.expnseAmount,
          date: item.date,
          paymentMethod: item.paymentMethod,
          description: item.description
        }
      }

      const result = await expenseCollection.updateOne(filter, updatedDoc)
      res.send(result);
    })


    app.delete('/expenses/:id',  async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await expenseCollection.deleteOne(query);
      res.send(result);
    });







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get('/', (req, res) =>{
    res.send('Expense Mastery Server is running...........');
})

app.listen(port, () =>{
    console.log(`Expense Mastery Server is running on port: ${port}`);
})
