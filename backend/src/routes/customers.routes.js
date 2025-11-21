import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { createCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from "../controllers/customers.controller.js";
import { createCustomerSchema } from "../schemas/customer.Schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router()

router.get('/customers',validateToken,getCustomers)
router.post('/customers',validateToken,validateSchema(createCustomerSchema),createCustomer)
router.get('/customers/:id',validateToken,getCustomer)
router.delete('/customers/:id',validateToken,deleteCustomer)
router.put('/customers/:id',validateToken,updateCustomer)

export default router