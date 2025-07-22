import { Request, Response } from "express";
import { addProductDictionary,getAllProductsDictionary,updateProductDictionary,deleteProductDictionary,getProductDictionaryById } from "../../../service/admin/product-dictionary.service";
import { productDictionarySchema } from "./product-dictionary.validator";

export const addProductToDictionary = async (req: Request, res: any) => {
  try {
    // ✅ Validate the request payload using Yup
    await productDictionarySchema.validate(req.body, { abortEarly: false });

    const newProduct = await addProductDictionary(req.body);

    return res.status(201).json({
      success: true,
      message: "Product added successfully.",
      data: newProduct,
    });
  } catch (error:any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors,
      });
    }

    console.error("❌ Error adding product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllProductsFromDictionary = async (req: Request, res: any) => {
    try {
    //   let { page, limit } = req.query;
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  
      const products = await getAllProductsDictionary(page, limit);
  
      return res.status(200).json({
        success: true,
        message: "Products retrieved successfully.",
        data: products,
      });
    } catch (error:any) {
      console.error("❌ Error fetching products:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  export const updateProductInDictionary = async (req: Request, res: any) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ success: false, message: "Product ID is required." });
      }
  
      const updatedProduct = await updateProductDictionary(id, req.body);
  
      return res.status(200).json({
        success: true,
        message: "Product updated successfully.",
        data: updatedProduct,
      });
    } catch (error:any) {
      console.error("❌ Error updating product:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  
  export const deleteFromProductDictionary = async (req: Request, res: any) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ success: false, message: "Product ID is required." });
      }
  
      const result = await deleteProductDictionary(id);
  
      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error:any) {
      console.error("❌ Error deleting product:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  
  export const getProductFromDictionaryById = async (req: Request, res: any) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ success: false, message: "Product ID is required." });
      }
  
      const product = await getProductDictionaryById(id);
  
      return res.status(200).json({
        success: true,
        message: "Product retrieved successfully.",
        data: product,
      });
    } catch (error:any) {
      console.error("❌ Error fetching product:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };