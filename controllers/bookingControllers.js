const booking_Model = require("../models/booking_Model");

//get all data
module.exports.getBooking = async (req, res) => {
  try {
    const Booking = await booking_Model.find();
    res.send(Booking);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

//save data
module.exports.addBooking = async (req, res) => {
  try {
    const Booking = new booking_Model(req.body);
    await Booking.save();
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
module.exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBooking = {
     date,
     CusName,
     cus_id,
     vehicleType,
     NoDays,
     Status

    }=req.body

    await booking_Model.findByIdAndUpdate(id, updateBooking);
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

// delete data
module.exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    await booking_Model.findByIdAndDelete(id);
    //console.log("Booking deleted successfully");
    res.send({msg:"Booking deleted successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
};

//get one data
module.exports.getBookingById = async (req, res) => {
  try {
    const BookingId = req.params.id;

    const Booking = await booking_Model.findById(BookingId);
    if (!Booking) {
      return res.status(404).send("Booking not found");
    }
    res.send(Booking);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
