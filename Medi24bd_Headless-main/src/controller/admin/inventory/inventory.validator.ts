import * as yup from 'yup';

export const inventorySchema = yup.object({
  product_id: yup.string().uuid().required(),
  quantity: yup.number().min(1).required(),
  seller_info: yup.string().required(),
  store: yup.string().required(),
  stock_date: yup.date().required(),
  is_available: yup.boolean().required(),
  med_type: yup.mixed<'counter' | 'prescribed'>().oneOf(['counter', 'prescribed']).required(),
  category_id: yup.string().uuid().required(),
  subcategory_id: yup.string().uuid().required(),
  expiry_date: yup.date().required(),
  modified_at: yup.date().required(),
  manufacturer: yup.string().required(),
  notes: yup.string().optional(),
  labels: yup.array().of(yup.string()).optional(),
  tags: yup.array().of(yup.string()).optional(),
  pricing: yup.object({
    b2b_discount_percentage: yup.number().required(),
    b2c_discount_percentage: yup.number().required(),
    mrp_price: yup.number().required(),
    total_savings_b2b: yup.number().required(),
    total_savings_b2c: yup.number().required(),
    total_commission_b2c: yup.number().required(),
    max_discount_b2b: yup.number().required(),
    max_discount_b2c: yup.number().required(),
    selling_price_b2b: yup.number().required(),
    selling_price_b2c: yup.number().required(),
  }).required()
});
