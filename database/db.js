
// import mongoose from 'mongoose';
// import dotenv from "dotenv";
//  const Connection=async(username,password)=>{

// try{
//     const URL=`mongodb://${username}:${password}@ac-auquctu-shard-00-00.x0e2xlm.mongodb.net:27017,ac-auquctu-shard-00-01.x0e2xlm.mongodb.net:27017,ac-auquctu-shard-00-02.x0e2xlm.mongodb.net:27017/?ssl=true&replicaSet=atlas-onc8ba-shard-0&authSource=admin&retryWrites=true&w=majority`;
// await mongoose.connect(URL,{useNewUrlParser:true})
// console.log('database connected succesfully');
// }
// catch(error){
// console.log('error while connecting with the database',error);
// }
//  }
// export default Connection;
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
 const Connection=async(username,password)=>{

try{
    const URL=`mongodb://${username}:${password}@ac-auquctu-shard-00-00.x0e2xlm.mongodb.net:27017,ac-auquctu-shard-00-01.x0e2xlm.mongodb.net:27017,ac-auquctu-shard-00-02.x0e2xlm.mongodb.net:27017/?ssl=true&replicaSet=atlas-onc8ba-shard-0&authSource=admin&retryWrites=true&w=majority`;
await mongoose.connect(URL,{useNewUrlParser:true})
console.log('database connected succesfully');
}
catch(error){
console.log('error while connecting with the database',error);
}
 }
export default Connection;

