import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { createCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from "../controllers/customers.controller.js";
import { createCustomerSchema } from "../schemas/customer.Schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router()

router.use(validateToken)

router
.route("/customers")
.get(getCustomers)
.post(validateSchema(createCustomerSchema), createCustomer)

router
.route("/customers/:id")
.get(getCustomer)
.put(updateCustomer)
.delete(deleteCustomer)


export default router