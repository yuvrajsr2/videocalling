import mongoose from "mongoose";


// function to connect to mongo db
export const connectDB = async () =>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected : ${con.connection.host}`)
    } catch (error) {
        console.log(error, "Mongo db connection error");
        process.exit(1); //failure
    }
}

