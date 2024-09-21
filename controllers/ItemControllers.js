const ItemModel = require("../models/ItemModel");

//get all data
module.exports.getitems = async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.send(items);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

//save data
module.exports.additem = async (req, res) => {
  try {
    const item = new ItemModel(req.body);
    await item.save();
    res.status(201).json({
      status: 201,
      message: "Create Successfully",
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      err
    });
  }
};

//update data
module.exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = {
      itemName,
      category,
      quantitiy,
      price,
      supplier,
      description,
    } = req.body


    await ItemModel.findByIdAndUpdate(id, updatedItem);
    console.log(updatedItem + id)
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

//update quick stock
module.exports.updateItemquick = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = {
      quantitiy
    } = req.body

    await ItemModel.findByIdAndUpdate(id, updatedItem);
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

// delete data
module.exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    await ItemModel.findByIdAndDelete(id);
    //console.log("Item deleted successfully");
    res.send("Item deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

//get one data
module.exports.getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;

    const item = await ItemModel.findById(itemId);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.send(item);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
