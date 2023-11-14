import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
// import products from "./data/products.js";
import User from "./models/userModel.js";
import connectToMongoDB from "./db/mongoDB.js";
// import Product from "./models/productModel.js";
// import Order from "./models/orderModel.js";

dotenv.config();

connectToMongoDB();

const importData = async () => {
  try {
    // await Order.deleteMany();
    // await Product.deleteMany();
    await User.deleteMany();

    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0]._id;
    // const sampleProducts = products.map((product) => {
    //   return { ...product, user: adminUser };
    // });
    // await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // await Order.deleteMany();
    // await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

process.argv[2] === "-d" ? destroyData() : importData();
