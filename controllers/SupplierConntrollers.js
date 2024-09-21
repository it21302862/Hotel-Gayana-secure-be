const SupplierModel = require("../models/SupplierModel");

// get all data
module.exports.getSupplier = async (req, res) => {
  try {
    const suppliers = await SupplierModel.find();
    res.send(suppliers);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// save data
module.exports.addSupplier = async (req, res) => {
  try {
    const supplier = new SupplierModel(req.body);
    await supplier.save();
    res.status(201).json({
      status: 201,
      message: "Create Successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      error: error,
    });
  }
};

// delete data
module.exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    await SupplierModel.findByIdAndDelete(id);
    res.send("Item deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, msg: "Something went wrong!" });
  }
};

// get one data
module.exports.getSupplierById = async (req, res) => {
  try {
    const supplierId = req.params.id;

    const supplier = await SupplierModel.findById(supplierId);
    if (!supplier) {
      return res.status(404).send("Supplier Not found");
    }
    res.send(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
