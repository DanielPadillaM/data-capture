import Customer from '../models/customer.model.js'

export const getCustomers = async(req,res) => {

    //solucion evitar cache
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
    res.set("Pragma", "no-cache")
    res.set("Expires","0")

    const customers = await Customer.find({user:req.user.id}).populate('user')
    return res.json(customers)
}

export const getCustomer = async(req,res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        if(!customer) return res.status(404).json("Customer not found");
        return res.json(customer)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const createCustomer = async(req,res) => {
    const {name,email,number} = req.body
    const newCustomer = new Customer({
        name,
        email,
        number,
        user: req.user.id
    })
    const savedCustomer = await newCustomer.save()
    return res.json(savedCustomer)
}
export const updateCustomer = async(req,res) => {
      const customer = await Customer.findByIdAndUpdate(req.params.id,req.body,{
        new:true
      })
      if(!customer) return res.status(404).json("Customer not found");
    return res.json(customer)
}
//Revisar el delete para que envie codigo 204
export const deleteCustomer = async(req,res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id)
    if(!customer) return res.status(404).json("Customer not found");
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json(error)
    }
}