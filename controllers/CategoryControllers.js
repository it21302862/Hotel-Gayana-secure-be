const CategoryModel = require("../models/CategoryModel")

//get all data
module.exports.getCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.send(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

//save data
exports.saveCategory = async (req, res) => {
  if (!req.body.categoryname || !req.body.locationStorage || !req.body.locationRack) {
    return res.status(422).json({
      status: 422,
      category: {
        categoryname: "Category Name is required",
        locationStorage: "Loction Storage is required",
        locationRack: "Loction Rack is required",
      },
    });
  }

  const category = new CategoryModel(req.body);
  try {
    await category.save();
    res.status(201).json({
      status: 201,
      message: "Create successfully",
    });
  } catch (error) {

    res.status(500).send({
      status: 500,
      error,
    });

  }
};

//update data
module.exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = {
      categoryname,
      locationStorage,
      locationRack,
      categoryNote,
    } = req.body


    await CategoryModel.findByIdAndUpdate(id, updatedCategory);
    //console.log("Updated successfully")
    res.send("Updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

//delete data

module.exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    await CategoryModel.findByIdAndDelete(id);
    console.log("deleted successfully");
    res.send("deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};
//get one data

module.exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await CategoryModel.findById(categoryId)
    if (!category) {

      return res.status(404).send("Category not found");
    }
    res.send(category);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};



