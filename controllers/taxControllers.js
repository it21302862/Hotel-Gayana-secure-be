const tax_Model = require("../models/tax_Model");

//crud_get all data
module.exports.getTax = async (req, res) => {
  try {
    const tax = await tax_Model.find();
    res.send(tax);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};


//crud_save data
module.exports.addTax = async (req, res) => {
  try {
    const tax = new tax_Model(req.body);
    await tax.save();
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
module.exports.updateTax = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoom = {
      Name,
      Tax_code, 
      Tax_Rate_Type,
      Rate_Amount,
      Available_for_Invoicing
    }=req.body

    await tax_Model.findByIdAndUpdate(id, updatedRoom);
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};


// crud_delete data
module.exports.deleteTax = async (req, res) => {
  try {
    const { id } = req.params;

    await tax_Model.findByIdAndDelete(id);
    //console.log("Tax deleted successfully");
    res.send("Tax deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};
//crud_get one data
module.exports.getTaxById = async (req, res) => {
  try {
    const id = req.params.id;

    const tax = await tax_Model.findById(id);
    if (!tax) {
      return res.status(404).send("Tax not found");
    }
    res.send(tax);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

