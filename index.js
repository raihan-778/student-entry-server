const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

//mongodb pass: FQBt9hUa5Th8Qf39
//mongodb database:studentEntry

// MongoDB crud operation start
const uri = `mongodb+srv://studentEntry:FQBt9hUa5Th8Qf39@cluster0.jz1qjld.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const studentCollection = client
      .db("studentEntry")
      .collection("students-info");

    //post method for add student info
    app.post("/student-info", async (req, res) => {
      const query = req.body;
      const result = await studentCollection.insertOne(query);

      res.send(result);
      console.log("add student info", result);
    });

    // get method for find student info

    app.get("/student-info", async (req, res) => {
      const query = {};
      const result = await studentCollection.find(query).toArray();
      res.send(result);
    });

    //get method for delete studeint info from db
    app.get("/student-info/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      result = await studentCollection.findOne(filter);
      res.send(result);
      console.log(result);
    });
    app.delete("/student-info/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      result = await studentCollection.deleteOne(filter);
      res.send(result);
      console.log(result);
    });
    //patch api for edit & update student info
    app.put("/student-info/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const about = req.body;
      const options = { upsert: true };
      const updatedDoc = {
        $set: { title: about.title },
      };
      const result = await studentCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
  } finally {
  }
}
run();
// mongodb crud operation end
app.get("/", (req, res) => {
  res.send("Student entery database is running");
});

app.listen(port, () => {
  console.log(`student entry server is running on port ${port}`);
});
