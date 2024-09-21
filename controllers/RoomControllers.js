const RoomModel = require("../models/RoomModel");

//get all data
module.exports.getRooms = async (req, res) => {
  try {
    const rooms = await RoomModel.find();
    res.send(rooms);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

//save data
module.exports.addRoom = async (req, res) => {
  try {
    const room = new RoomModel(req.body);
    await room.save();
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
module.exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoom = {
     roomType,
     price,
     description,
    }=req.body

    await RoomModel.findByIdAndUpdate(id, updatedRoom);
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

// delete data
module.exports.deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    await RoomModel.findByIdAndDelete(id);
    //console.log("Room deleted successfully");
    res.send("Room deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

//get one data
module.exports.getRoomById = async (req, res) => {
  try {
    const RoomId = req.params.id;

    const Room = await RoomModel.findById(RoomId);
    if (!Room) {
      return res.status(404).send("Room not found");
    }
    res.send(Room);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
