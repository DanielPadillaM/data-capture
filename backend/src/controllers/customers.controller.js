import Customer from '../models/customer.model.js'

export const getCustomers = async(req,res) => {

    // //solucion evitar cache
    // res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
    // res.set("Pragma", "no-cache")
    // res.set("Expires","0")
    try {
        const customers = await Customer.find({user:req.user.id})
        return res.json(customers)
    } catch (error) {
        console.error(error)
        return res.status(500).json(["Server Error"])
    }

}

export const getCustomer = async(req,res) => {
    try {
        const customer = await Customer.findOne({
            _id: req.params.id,
            user: req.user.id
        })

        if(!customer) return res.status(404).json(["Customer not found"]);

        return res.json(customer)

    } catch (error) {
        return res.status(500).json(['Server error'])
    }
}
export const createCustomer = async(req,res) => {

    try {
        const {name,email,number} = req.body
        const newCustomer = new Customer({
        name,
        email,
        number,
        user: req.user.id
    })

        const savedCustomer = await newCustomer.save()
        return res.json(savedCustomer)

    } catch (error) {
        return res.status(500).json(["Server error"])
    }
}

export const updateCustomer = async(req,res) => {
      try {
        const customer = await Customer.findByIdAndUpdate({
            _id: req.params.id, user: req.user.id
        },req.body,{
        new:true
      })
      if(!customer) return res.status(404).json(["Customer not found"]);
        return res.json(customer)

      } catch (error) {
        return res.status(500).json("Server error")
      }
}

//Revisar el delete para que envie codigo 204
export const deleteCustomer = async(req,res) => {
    try {
        const customer = await Customer.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        })
    if(!customer) return res.status(404).json(["Customer not found"]);
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json(["Server error"])
    }
}