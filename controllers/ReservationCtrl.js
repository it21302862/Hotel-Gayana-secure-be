const ReservationModel = require("../models/ReservationModel");

//get all data
module.exports.getReservations = async (req, res) => {
  try {
    const Reservations = await ReservationModel.find();
    res.send(Reservations);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

//save data
module.exports.addReservation = async (req, res) => {
  try {
    const Reservation = new ReservationModel(req.body);
    await Reservation.save();
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
module.exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      date,
      CusName,
      NoPeople,
      RoomType,
      NoDays,
      Status,
      Email,
      Total
    } = req.body;

    const updatedReservation = {
      date,
      CusName,
      NoPeople,
      RoomType,
      NoDays,
      Status,
      Email,
      Total
    };

    await ReservationModel.findByIdAndUpdate(id, updatedReservation);
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};




// delete data
module.exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    await ReservationModel.findByIdAndDelete(id);
    //console.log("Reservation deleted successfully");
    res.send({msg:"Reservation deleted successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
};

//get one data
module.exports.getReservationById = async (req, res) => {
  try {
    const ReservationId = req.params.id;

    const Reservation = await ReservationModel.findById(ReservationId);
    if (!Reservation) {
      return res.status(404).send("Reservation not found");
    }
    res.send(Reservation);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
