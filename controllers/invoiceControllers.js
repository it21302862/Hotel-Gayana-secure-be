const invoice_Model = require("../models/invoice_Model");

//get all data
module.exports.getInvoice = async (req, res) => {
  try {
    const Invoice = await invoice_Model.find();
    res.send(Invoice);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

//save data
module.exports.addInvoice = async (req, res) => {
  try {
    const Invoice = new invoice_Model(req.body);
    await Invoice.save();
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


//update data
module.exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updateInvoice = {
      Name,
      Invoice_No,
      Due_Date,
      Running_Total,
      Tax_code,
      Sub_Total,
      Status

    }=req.body

    await invoice_Model.findByIdAndUpdate(id, updateInvoice);
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

// delete data
module.exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    await invoice_Model.findByIdAndDelete(id);
    //console.log("Invoice deleted successfully");
    res.send({msg:"Invoice deleted successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
};

//get one data
module.exports.getInvoiceById = async (req, res) => {
  try {
    const InvoiceId = req.params.id;

    const Invoice = await invoice_Model.findById(InvoiceId);
    if (!Invoice) {
      return res.status(404).send("Invoice not found");
    }
    res.send(Invoice);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};