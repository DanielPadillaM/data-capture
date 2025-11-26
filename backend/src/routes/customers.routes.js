import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { createCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from "../controllers/customers.controller.js";
import { createCustomerSchema } from "../schemas/customer.Schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router()

router.use(validateToken)

router.get('/customers', getCustomers)
router.post('/customers', validateSchema(createCustomerSchema), createCustomer)
router.get('/customers/:id', getCustomer)
router.put('/customers/:id', updateCustomer)
router.delete('/customers/:id', deleteCustomer)


export default router