import mongoose from "mongoose";
import { db } from "./app.js";
import Product from "./models/Product.js"; // Adjust the path to your Product model

// Connect to MongoDB
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", async () => {
  console.log("Connected to MongoDB");

  try {
    await importProducts();
    console.log("Products imported successfully");
  } catch (error) {
    console.error("Failed to import products:", error);
  } finally {
    mongoose.connection.close();
  }
});

async function importProducts() {
  try {
    // Fetch data from the API
    const data = await fetch(
      "https://64e0caef50713530432cafa1.mockapi.io/api/products"
    );
    const result = await data.json();
    // Transform data to match Product model
    const products = result.map((item) => ({
      name: item.productName,
      price: item.price,
      imageUrl: item.image || "null", // Assuming the image field matches your schema
      description: item.productDescription,
      department: item.department,
    }));
    console.log(products);

    // Insert products into the database
    await Product.insertMany(products);
  } catch (error) {
    throw new Error(`Error fetching or saving products: ${error.message}`);
  }
}
