import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const product = new Product({ name, description, price, imageUrl });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    // console.log("cookies", req);
    const limit = req.query.limit ?? 4;
    const page = req.query.page ?? 0;
    const products = await Product.find(
      {},
      {},
      { limit: parseInt(limit), skip: parseInt(page) * parseInt(limit) }
    );
    const length = products.length;
    res.json({
      length,
      products,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId, product } = req.body;
    const filter = {
      _id: productId,
    };
    const productUpdated = await Product.findByIdAndUpdate(filter, product, {
      new: true,
    });
    res.json({
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.json({
      product,
    });
  } catch (error) {}
};
