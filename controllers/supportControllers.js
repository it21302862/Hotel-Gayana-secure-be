const SupportModel = require("../models/SupportModel");

//crud_get all support 
module.exports.getSupport = async (req, res) => {
  try {
    const support = await SupportModel.find();
    res.send(support);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};


//crud_save support data
module.exports.addSupport = async (req, res) => {
  try {
    const support = new SupportModel(req.body);
    await support.save();
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


//crud_update support data
module.exports.updateSupport = async (req, res) => {
  try {
    const { id } = req.params;
    const updateSupport = {
      customerName,
      NIC,
      email,
      category,
      subject,
      description
    }=req.body

    await SupportModel.findByIdAndUpdate(id, updateSupport);
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};


// crud_delete support data
module.exports.deleteSupport = async (req, res) => {
  try {
    const { id } = req.params;

    await SupportModel.findByIdAndDelete(id);
    res.send("Item deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};
//crud_get one support data
module.exports.getSupportById = async (req, res) => {
  try {
    const id = req.params.id;

    const support = await SupportModel.findById(id);
    if (!support) {
      return res.status(404).send("support not found");
    }
    res.send(support);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

