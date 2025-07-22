import { Category, SubCategory } from "../../models/admin/catalog/category.model";
// import SubCategory from "../../models/admin/catalog/subcategory.model";

// ✅ Create a new category with subcategories
export const createCategoryWithSubcategories = async (categoryName: string, subcategories: string[]) => {
    try {
      // ✅ Check if the category already exists
      let category = await Category.findOne({ where: { category_name: categoryName } });
  
      // ✅ If category does not exist, create a new one
      if (category) {
        throw new Error("Category Already Exists");
      }
      category = await Category.create({ category_name: categoryName });

      // ✅ Ensure category is not null before accessing its ID
      if (!category || !category.id) {
        throw new Error("Failed to create or retrieve the category.");
      }
  
      // ✅ If subcategories exist, insert them
      if (subcategories && subcategories.length > 0) {
        const subCategoryData = subcategories.map(sub => ({
          name: sub,
          category_id: category!.id, // ✅ Now category.id is always defined
        }));
  
        await SubCategory.bulkCreate(subCategoryData);
      }
  
      return category;
    } catch (error:any) {
      console.error("Error in createCategoryWithSubcategories:", error);
      throw new Error(`Failed to create category with subcategories: ${error.message}`);
    }
  };

// ✅ Get all categories with subcategories
export const getAllCategoriesWithSubcategories = async () => {
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

  export const getCategoryById = async (categoryId: string) => {
    try {
      const category = await Category.findOne({
        where: { id: categoryId },
        include: [{ model: SubCategory, as: "subcategories" }],
      });
  
      if (!category) {
        throw new Error("Category not found.");
      }
  
      return category;
    } catch (error:any) {
      console.error("❌ Error fetching category:", error);
      throw new Error(`Database Error: ${error.message}`);
    }
  };

  export const updateCategoryOrSubcategories = async (categoryId: string, updateData: any) => {
    try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        throw new Error("Category not found.");
      }
  
      // ✅ If category_name is provided, update Category
      if (updateData.category_name) {
        await category.update({ category_name: updateData.category_name });
      }
  
      // ✅ If subcategories are provided, update Subcategories
      if (updateData.subcategories && Array.isArray(updateData.subcategories)) {
        for (const sub of updateData.subcategories) {
          if (sub.id) {
            // ✅ Update existing subcategory
            await SubCategory.update({ name: sub.name }, { where: { id: sub.id, category_id: categoryId } });
          } else {
            // ✅ Create new subcategory under the same category
            await SubCategory.create({ name: sub.name, category_id: categoryId });
          }
        }
      }
  
      return { message: "Category and subcategories updated successfully." };
    } catch (error:any) {
      console.error("❌ Error updating category/subcategories:", error);
      throw new Error(`Database Error: ${error.message}`);
    }
  };
  
  export const deleteCategoryById = async (categoryId: string) => {
    try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        throw new Error("Category not found.");
      }
  
      await category.destroy(); // ✅ Automatically deletes subcategories due to cascading delete
  
      return { message: "Category and subcategories deleted successfully." };
    } catch (error:any) {
      console.error("❌ Error deleting category:", error);
      throw new Error(`Database Error: ${error.message}`);
    }
  };