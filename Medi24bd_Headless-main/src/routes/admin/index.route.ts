import express, { Router } from "express";

const router: Router= express.Router();
import { addCategory,getAllCategories,getCategory,updateCategory,deleteCategory} from '../../controller/admin/category/category.controller';
import {addProductToDictionary,getAllProductsFromDictionary,updateProductInDictionary,deleteFromProductDictionary,getProductFromDictionaryById} from '../../controller/admin/product-dictionary/product-dictionary.controller'
import {addInventory,updateInventory,deleteInventory,getAllInventory,getInventoryById} from '../../controller/admin/inventory/inventory.controller'

//categories
router.post("/add-categories", addCategory);
router.get("/get-all-categories",getAllCategories);
router.get("/get-category/:id",getCategory);
router.patch("/edit-category/:id",updateCategory)
router.delete("/delete-category/:id",deleteCategory)

//product-dictionary
router.post("/add-product-dictionary",addProductToDictionary)
router.get("/get-all-product-dictionary",getAllProductsFromDictionary)
router.get("/get-product-dictionary/:id",getProductFromDictionaryById)
router.patch("/edit-product-dictionary/:id",updateProductInDictionary)
router.delete("/delete-product-dictionary/:id",deleteFromProductDictionary)

//inventory
router.post("/add-batch",addInventory)
router.get("/get-all-batches",getAllInventory)
router.get("/get-batch/:id",getInventoryById)
router.patch("/edit-batch/:id",updateInventory)
router.delete("/delete-batch/:id",deleteInventory)

module.exports = router;
