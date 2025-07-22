import { Request, Response } from 'express';
import { getFilteredProducts,getProductBySlug,getRelatedProducts} from '../../service/client/product.service';

export const getAllProducts = async (req: Request, res: any) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const categories = req.query.categories as string || '';
    const subcategories = req.query.subcategories as string || '';

    const products = await getFilteredProducts({ page, limit, categories, subcategories });
    return res.status(200).json({ success: true, data: products });
  } catch (error: any) {
    console.error('❌ Error fetching products:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductDetailsBySlug = async (req: Request, res: any) => {
    try {
      const { slug } = req.params;
      const product = await getProductBySlug(slug);
      return res.status(200).json({ success: true, data: product });
    } catch (error: any) {
      console.error('❌ Error fetching product by slug:', error);
      return res.status(404).json({ success: false, message: error.message });
    }
  };

  export const getRelatedProductsBySlug = async (req: Request, res: any) => {
    try {
      const { slug } = req.params;
      const relatedProducts = await getRelatedProducts(slug);
      return res.status(200).json({ success: true, data: relatedProducts });
    } catch (error: any) {
      console.error('❌ Error fetching related products:', error);
      return res.status(404).json({ success: false, message: error.message });
    }
  };