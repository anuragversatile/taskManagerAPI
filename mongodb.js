// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
const { MongoClient, ObjectID } = require("mongodb");
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-mangaer";
// const ObjectID=mongodb.ObjectID
// const id=new ObjectID()
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlPasrser: true },
  (error, client) => {
    if (error) {
      return console.log("unable to connect");
    }
    const db = client.db(databaseName);

    // db.collection('users').insertOne({

    //   name:'Vikram',
    //   age:23
    // },(error, result)=>{
    //   if(error){
    //     return console.log("unable to insert user")
    //   }
    //   console.log(result.ops)
    // })

    //     db.collection('users').insertMany([
    //       {
    //       name:'Joe',
    //       age:28
    //     },{
    //         name:'John',
    //         age:35
    //       }

    //     ],(error,result)=>{
    //       if(error){
    //         return console.log("unable to insert documents")
    //       }
    // console.log(result.ops)
    //     })
    // db.collection('tasks').insertMany([{
    // description:"New Task",
    // completed:true
    // },
    // {
    //   description:"New Task 2",
    //   completed:false
    //   },
    //   {
    //     description:"New Task 3",
    //     completed:false
    //     }
    // ],(error,result)=>{
    //   if(error){
    //     return console.log("Unable to insert document")
    //   }
    //   console.log(result.ops)
    // })

    db.collection("users").findOne(
      {
        name: "Anurag"
      },
      (error, user) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(user);
      }
    );
    db.collection("users")
      .find({ age: 24 })
      .toArray((error, user) => {
        console.log(user);
      });
    db.collection("tasks").findOne(
      { _id: new ObjectID("5c7b6df2d9e9c00c4f7f40e6") },
      (error, result) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(result);
      }
    );
    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, result) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(result);
      });
    db.collection("users")
      .updateOne(
        {
          _id: new ObjectID("5c7b6b531987480c44552477")
        },
        {
          $set: {
            name: "Mike"
          }
        }
      )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
    db.collection("tasks").updateMany(
      {
        completed: false
      },
      {
        $set: {
          completed: true
        }
      }).then((result)=>{
        console.log(result)
      }).catch((error)=>{
        console.log(error)
      })
      db.collection('users').deleteMany({
        age:24
      }).then((result)=>{
        console.log(result)
      }).catch((error)=>{
        console.log(error)
      })
      db.collection('tasks').deleteOne({
        description:'New Task'
      }).then((result)=>{
        console.log(result)
      }).catch((error)=>{
        console.log(error)
      })
  });
