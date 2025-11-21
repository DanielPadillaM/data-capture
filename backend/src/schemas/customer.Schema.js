import {z} from 'zod'

export const createCustomerSchema = z.object({
    name : z.string('Username is required'),
    email: z.email('Email is required'),
    number: z.string('Number is required').min(6,'Password must be at least 6 characters')
})