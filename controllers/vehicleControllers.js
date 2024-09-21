const vehicle_Model = require("../models/vehicle_Model");

//crud_get all data
module.exports.getVehicle = async (req, res) => {
  try {
    const vehicle = await vehicle_Model.find();
    res.send(vehicle);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};


//crud_save data
module.exports.addVehicle = async (req, res) => {
  try {
    const vehicle = new vehicle_Model(req.body);
    await vehicle.save();
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
module.exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoom = {
      vehicleModel,
      category,
      price,
      vehicle_dash_number,
      description
    }=req.body

    await vehicle_Model.findByIdAndUpdate(id, updatedRoom);
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};


// crud_delete data
module.exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    await vehicle_Model.findByIdAndDelete(id);
    //console.log("Item deleted successfully");
    res.send("Item deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};
//crud_get one data
module.exports.getVehicleById = async (req, res) => {
  try {
    const id = req.params.id;

    const vehicle = await vehicle_Model.findById(id);
    if (!vehicle) {
      return res.status(404).send("Vehicle not found");
    }
    res.send(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

