// ===========================
// services/product.service.ts
// ===========================
import { Op, Sequelize } from 'sequelize';
import Inventory from '../../models/admin/inventory/inventory.model';
import Product from '../../models/admin/dictionary/product-dictionary.model';
import {Category,SubCategory} from '../../models/admin/catalog/category.model';
import Pricing from '../../models/admin/pricing/pricing.model';

export const getFilteredProducts = async ({ page, limit, categories, subcategories }: {
    page: number;
    limit: number;
    categories: string;
    subcategories: string;
  }) => {
    const offset = (page - 1) * limit;
    const whereClause: any = {};
  
    if (categories) whereClause['$product.category_id$'] = { [Op.in]: categories.split(',') };
    if (subcategories) whereClause['$product.subcategory_id$'] = { [Op.in]: subcategories.split(',') };
  
    if (!categories && !subcategories) {
      const topProducts = await Inventory.findAll({
        include: [
          {
            model: Product,
            as: 'product',
            include: [
              { model: Category, as: 'category' },
              { model: SubCategory, as: 'subcategory' },
            ]
          },
          {
            model: Pricing,
            as: 'pricing'
          }
        ],
        where: { is_available: true },
        attributes: ['product_id', 'id', 'is_available', 'labels', 'tags', [Sequelize.literal('quantity'), 'quantity']],
        order: [[Sequelize.literal('quantity'), 'DESC']],
        group: ['Inventory.id', 'product.id', 'product->category.id', 'product->subcategory.id', 'pricing.id'],
        limit: 100
      });
  
      return topProducts.slice(0, limit).map((inv: any) => formatProduct(inv));
    }
  
    const products = await Inventory.findAll({
      where: {
        is_available: true,
        ...whereClause
      },
      include: [
        {
          model: Product,
          as: 'product',
          include: [
            { model: Category, as: 'category' },
            { model: SubCategory, as: 'subcategory' },
          ]
        },
        {
          model: Pricing,
          as: 'pricing'
        }
      ],
      order: [['stock_date', 'DESC']],
      limit,
      offset
    });
  
    return products.map((inv: any) => formatProduct(inv));
  };
  
  const formatProduct = (inv: any) => {
    return {
      product_id: inv.product_id,
      product_slug: inv.product.product_slug,
      product_name: inv.product.product_name,
      product_manufacturer: inv.product.manufacturer_name,
      product_strength: inv.product.strength,
      product_category_id: inv.product.category_id,
      product_category_name: inv.product.category?.category_name,
      product_subcategory_id: inv.product.subcategory_id,
      product_subcategory_name: inv.product.subcategory?.name,
      product_generic_name: inv.product.product_generic_name,
      is_available: inv.is_available,
      labels: inv.labels,
      tags: inv.tags,
      discount_percentage_client: inv.pricing?.b2b_discount_percentage,
      total_savings: inv.pricing?.total_savings_b2b,
      price: inv.pricing?.selling_price_b2b,
      stock_id: inv.id
    };
  };
  


  export const getProductBySlug = async (slug: string) => {
    const inventory = await Inventory.findOne({
      include: [
        {
          model: Product,
          as: 'product',
          where: { product_slug: slug },
          include: [
            { model: Category, as: 'category' },
            { model: SubCategory, as: 'subcategory' },
          ]
        },
        {
          model: Pricing,
          as: 'pricing'
        }
      ],
      where: {
        is_available: true
      }
    }) as Inventory & {
      product: Product & {
        category: Category;
        subcategory: SubCategory;
      };
      pricing: Pricing;
    };
  
    if (!inventory) {
      throw new Error('Product not found');
    }
  
    return {
      product_id: inventory.product_id,
      product_slug: inventory.product.product_slug,
      product_name: inventory.product.product_name,
      product_manufacturer: inventory.product.manufacturer_name,
      product_description: inventory.product.product_description,
      product_strength: inventory.product.strength,
      product_category_id: inventory.product.category?.id,
      product_category_name: inventory.product.category?.category_name,
      product_subcategory_id: inventory.product.subcategory?.id,
      product_subcategory_name: inventory.product.subcategory?.name,
      product_generic_name: inventory.product.product_generic_name,
      product_image: inventory.product.product_image,
      is_available: inventory.is_available,
      labels: inventory.labels,
      tags: inventory.tags,
      discount_percentage_client: inventory.pricing?.b2b_discount_percentage,
      total_savings: inventory.pricing?.total_savings_b2b,
      price: inventory.pricing?.selling_price_b2b,
      stock_id: inventory.id
    };
  };
  

  export const getRelatedProducts = async (slug: string) => {
    const current = await Inventory.findOne({
      include: [
        {
          model: Product,
          as: 'product',
          where: { product_slug: slug },
          attributes: ['id', 'product_slug'],
          include: [
            { model: Category, as: 'category', attributes: ['id'] },
            { model: SubCategory, as: 'subcategory', attributes: ['id'] }
          ]
        }
      ],
      where: { is_available: true }
    });
  
    const currentData = current?.toJSON() as Inventory & {
      product: Product & {
        category?: Category;
        subcategory?: SubCategory;
      };
    };
  
    const categoryId = currentData?.product?.category?.id;
    const subcategoryId = currentData?.product?.subcategory?.id;
  
    if (!categoryId || !subcategoryId) {
      throw new Error('Missing category or subcategory information');
    }
  
    const related = await Inventory.findAll({
      where: {
        is_available: true,
        id: { [Op.ne]: currentData.id }
      },
      include: [
        {
          model: Product,
          as: 'product',
          where: {
            product_slug: { [Op.ne]: slug }
          },
          include: [
            { model: Category, as: 'category', where: { id: categoryId } },
            { model: SubCategory, as: 'subcategory', where: { id: subcategoryId } }
          ]
        },
        { model: Pricing, as: 'pricing' }
      ],
      order: [['stock_date', 'DESC']],
      limit: 10
    });
  
    return related.map((inv: any) => ({
      product_id: inv.product_id,
      product_slug: inv.product.product_slug,
      product_name: inv.product.product_name,
      product_manufacturer: inv.product.manufacturer_name,
      product_description: inv.product.product_description,
      product_strength: inv.product.strength,
      product_category_id: inv.product.category_id,
      product_category_name: inv.product.category?.category_name,
      product_subcategory_id: inv.product.subcategory_id,
      product_subcategory_name: inv.product.subcategory?.name,
      product_generic_name: inv.product.product_generic_name,
      product_image: inv.product.product_image,
      is_available: inv.is_available,
      labels: inv.labels,
      tags: inv.tags,
      discount_percentage_client: inv.pricing?.b2b_discount_percentage,
      total_savings: inv.pricing?.total_savings_b2b,
      price: inv.pricing?.selling_price_b2b,
      stock_id: inv.id
    }));
  };
  