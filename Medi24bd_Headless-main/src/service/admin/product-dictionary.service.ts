import ProductDictionary from "../../models/admin/dictionary/product-dictionary.model";
import { Category, SubCategory } from "../../models/admin/catalog/category.model";

export const addProductDictionary = async (productData: any) => {
  try {
    // ✅ Check if category exists
    const category = await Category.findByPk(productData.product_category_id);
    if (!category) {
      throw new Error("Invalid product_category: Category not found.");
    }

    // ✅ Check if subcategory exists
    const subcategory = await SubCategory.findByPk(productData.product_subcategory_id);
    if (!subcategory) {
      throw new Error("Invalid product_subcategory: Subcategory not found.");
    }

    // ✅ Create Product
    const newProduct = await ProductDictionary.create(productData);
    return newProduct;
  } catch (error:any) {
    console.error("❌ Error adding product:", error);
    throw new Error(`Database Error: ${error.message}`);
  }
};

export const getAllProductsDictionary = async (page: number, limit: number) => {
    try {
      const offset = (page - 1) * limit;
  
      const { count, rows } = await ProductDictionary.findAndCountAll({
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "category_name"], // ✅ Get category name
          },
          {
            model: SubCategory,
            as: "subcategory",
            attributes: ["id", "name"], // ✅ Get subcategory name
          },
        ],
        limit,
        offset,
      });
  
      return {
        totalProducts: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        products: rows,
      };
    } catch (error:any) {
      console.error("❌ Error fetching products:", error);
      throw new Error(`Database Error: ${error.message}`);
    }
  };
  
  export const updateProductDictionary = async (productId: string, updateData: any) => {
    try {
      const product = await ProductDictionary.findByPk(productId);
      if (!product) {
        throw new Error("Product not found.");
      }
  
      // ✅ If updating category, check if it exists
      if (updateData.product_category) {
        const category = await Category.findByPk(updateData.product_category);
        if (!category) {
          throw new Error("Invalid product_category: Category not found.");
        }
      }
  
      // ✅ If updating subcategory, check if it exists
      if (updateData.product_subcategory) {
        const subcategory = await SubCategory.findByPk(updateData.product_subcategory);
        if (!subcategory) {
          throw new Error("Invalid product_subcategory: Subcategory not found.");
        }
      }
  
      // ✅ Update the product
      await product.update(updateData);
  
      return product;
    } catch (error:any) {
      console.error("❌ Error updating product:", error);
      throw new Error(`Database Error: ${error.message}`);
    }
  };

  export const deleteProductDictionary = async (productId: string) => {
    try {
      const product = await ProductDictionary.findByPk(productId);
      if (!product) {
        throw new Error("Product not found.");
      }
  
      await product.destroy();
      return { message: "Product deleted successfully." };
    } catch (error:any) {
      console.error("❌ Error deleting product:", error);
      throw new Error(`Database Error: ${error.message}`);
    }
  };

  export const getProductDictionaryById = async (productId: string) => {
    try {
      // ✅ Fetch product along with category & subcategory names
      const product = await ProductDictionary.findOne({
        where: { id: productId },
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "category_name"], // ✅ Fetch category details
          },
          {
            model: SubCategory,
            as: "subcategory",
            attributes: ["id", "name"], // ✅ Fetch subcategory details
          },
        ],
      });
  
      if (!product) {
        throw new Error("Product not found.");
      }
  
      return product;
    } catch (error:any) {
      console.error("❌ Error fetching product by ID:", error);
      throw new Error(`Database Error: ${error.message}`);
    }
  };



  


  