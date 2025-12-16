import axiosIns from './axios'

export const getCustomersRequest = () => axiosIns.get('/customers')

export const getCustomerRequest = (id) => axiosIns.get(`/customers/${id}`)

export const createCustomersRequest = (customer) => axiosIns.post('/customers',customer)

export const updateCustomerRequest = (id,customer) => axiosIns.put(`/customers/${id}`,customer)

export const deleteCustomerRequest = (id) => axiosIns.delete(`/customers/${id}`)