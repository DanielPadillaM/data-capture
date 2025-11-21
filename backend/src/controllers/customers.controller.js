import Customer from '../models/customer.model.js'

export const getCustomers = async(req,res) => {
    const customers = await Customer.find({user:req.user.id}).populate('user')
    res.json(customers)
}

export const getCustomer = async(req,res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        if(!customer) return res.status(404).json("Customer not found");
        res.json(customer)
    } catch (error) {
        res.json(error)
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
    res.json(savedCustomer)
}
export const updateCustomer = async(req,res) => {
      const customer = await Customer.findByIdAndUpdate(req.params.id,req.body,{
        new:true
      })
      if(!customer) return res.status(404).json("Customer not found");
    res.json(customer)
}
//Revisar el delete para que envie codigo 204
export const deleteCustomer = async(req,res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id)
    if(!customer) return res.status(404).json("Customer not found");
        res.json('borrado')
    } catch (error) {
        console.log(error)
    }
}