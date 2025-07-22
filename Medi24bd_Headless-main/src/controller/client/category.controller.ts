import {getAllCategoriesWithSubcategoriesClient} from "../../service/client/category.service"
export const getAllCategoriesForClient = async (req: Request, res: any) => {
    try {
      const categories = await getAllCategoriesWithSubcategoriesClient();
  
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