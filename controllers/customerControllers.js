const CustomerModel = require("../models/CustomerModel");

//crud_get all data
module.exports.getCustomer = async (req, res) => {
  try {
    const customer = await CustomerModel.find();
    res.send(customer);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};


//crud_save data
module.exports.addCustomer = async (req, res) => {
  try {
    const customer = new CustomerModel(req.body);
    await customer.save();
    res.status(201).json({
      status: 201,
      message: "Created Successfully",
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Not successful",
      error: err
    });
  }
};


//crud_update data
module.exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateCustomer = {
      bookingRef,
      customerName,
      NIC,
      DOB,
      telephoneNumber,
      email,
      address,
      country
    }=req.body

    await CustomerModel.findByIdAndUpdate(id, updateCustomer);
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};


// crud_delete data
module.exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    await CustomerModel.findByIdAndDelete(id);
    //console.log("Item deleted successfully");
    res.send("Item deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};
//crud_get one data
module.exports.getCustomerById = async (req, res) => {
  try {
    const id = req.params.id;

    const customer = await CustomerModel.findById(id);
    if (!customer) {
      return res.status(404).send("customer not found");
    }
    res.send(customer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

