import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conencted to Mongo DB");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
