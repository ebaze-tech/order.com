const ProductModel = require("../../models/product/product");

class ProductController {
  static async createProduct(req, res) {
    const { name, price, stock, description } = req.body;

    const product = await ProductModel.create({
      name,
      price,
      stock,
      description,
    });
    return res.status(201).json({ message: "Product created", product });
  }

  static async updateProduct(req, res) {
    const { productId } = req.params;
    const { name, price, stock, description } = req.body;

    const product = await ProductModel.findByPk(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.name = name || product.name;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.description = description || product.description;

    await product.save();
    return res.status(200).json({ message: "Product updated", product });
  }

  static async deleteProduct(req, res) {
    const { productId } = req.params;

    const product = await ProductModel.findByPk(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.destroy();
    return res.status(200).json({ message: "Product deleted" });
  }
}

class InventoryController {
  static async updateStock(req, res) {
    const { productId, stock } = req.body;

    const product = await ProductModel.findByPk(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.stock = stock;
    await product.save();
    return res.status(200).json({ message: "Stock updated", product });
  }

  static async getLowStockProducts(req, res) {
    const products = await ProductModel.findAll({
      where: { stock: { [Op.lt]: 10 } },
    });
    return res.status(200).json({ products });
  }
}

module.exports = { ProductController, InventoryController };
