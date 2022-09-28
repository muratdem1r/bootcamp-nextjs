const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Mongo URI: " + process.env.MONGO_URI);
    console.log("Mongo URI String: " + process.env.MONGO_URI.toString());
    const conn = await mongoose.connect(
      "mongodb+srv://muratdem1r:wvtdDcEPHMMQTidj@cluster0.ve9a4dv.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log("connectDB error: " + error);
  }

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
