import { Request, Response ,RequestHandler} from "express";

import { createCategoryWithSubcategories ,getAllCategoriesWithSubcategories,getCategoryById,updateCategoryOrSubcategories,deleteCategoryById} from "../../../service/admin/category.service";
import { categorySchema } from "./category.validator";

export const addCategory= async (req:Request,res:any) => {
  try {
    // ✅ Validate the request payload using Yup
    await categorySchema.validate(req.body, { abortEarly: false });

    const { category_name, subcategories } = req.body;

    // ✅ Call the service function and handle errors from DB
    try {
      const newCategory = await createCategoryWithSubcategories(category_name, subcategories || []);

      console.log(`✅ Category Created - ID: ${newCategory.id}, Name: ${newCategory.category_name}`);

      return res.status(201).json({
        success: true,
        message: "Category added successfully",
        data: newCategory
      });
    } catch (serviceError:any) {
      // ✅ Handle errors from service layer (Database issues)
      console.error(`❌ Database Error while adding category: ${serviceError}`);

      return res.status(500).json({
        success: false,
        message: "Internal Database Error",
        error: serviceError.message
      });
    }

  } catch (validationError:any) {
    if (validationError.name === "ValidationError") {
      console.warn(`⚠️ Validation Error: ${validationError.errors.join(", ")}`);

      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: validationError.errors
      });
    }

    console.error(`❌ Unexpected Error: ${validationError}`);

    return res.status(500).json({
      success: false,
      message: "Unexpected Server Error",
      error: validationError.message
    });
  }
};


export const getAllCategories = async (req: Request, res: any) => {
  try {
    const categories = await getAllCategoriesWithSubcategories();

    return res.status(200).json({ 
      success: true, 
      message: "Categories retrieved successfully", 
      data: categories 
    });
  } catch (error:any) {
    console.error("❌ Error fetching categories:", error);

    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
};

export const getCategory = async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);

    return res.status(200).json({
      success: true,
      message: "Category retrieved successfully.",
      data: category,
    });
  } catch (error:any) {
    console.error("❌ Error fetching category:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateCategory = async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData.category_name && !updateData.subcategories) {
      return res.status(400).json({
        success: false,
        message: "No data provided to update.",
      });
    }

    const updatedCategory = await updateCategoryOrSubcategories(id, updateData);

    return res.status(200).json({
      success: true,
      message: updatedCategory.message,
    });
  } catch (error:any) {
    console.error("❌ Error updating category:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
  
export const deleteCategory = async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const result = await deleteCategoryById(id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error:any) {
    console.error("❌ Error deleting category:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
