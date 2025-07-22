
import { Category, SubCategory } from "../../models/admin/catalog/category.model";

export const getAllCategoriesWithSubcategoriesClient = async () => {
    try {
      const categories = await Category.findAll({
        include: [{ model: SubCategory, as: "subcategories" }],
      });
  
      if (!categories || categories.length === 0) {
        throw new Error("No categories found in the database.");
      }
  
      return categories;
    } catch (error:any) {
      console.error("❌ Error fetching categories with subcategories:", error);
      throw new Error(`Database Error: ${error.message}`);
    }
  };
