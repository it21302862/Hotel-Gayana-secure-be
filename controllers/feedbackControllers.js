const FeedbackModel = require("../models/FeedbackModel");

//crud_get all feedback
module.exports.getFeedback = async (req, res) => {
  try {
    const feedback = await FeedbackModel.find();
    res.send(feedback);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};


//crud_save feedback data
module.exports.addFeedback = async (req, res) => {
  try {
    const feedback = new FeedbackModel(req.body);
    await feedback.save();
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


//crud_update feedback data
module.exports.updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFeedback = {
      customerName,
      NIC,
      hearAboutHotel,
      reservationMethod,
      visitPurpose,
      serviceQuality,
      cleanliness,
      food,
      staff,
      overallExperience,
      suggestions
    }=req.body

    await FeedbackModel.findByIdAndUpdate(id, updateFeedback);
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};


// crud_delete feedback data
module.exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    await FeedbackModel.findByIdAndDelete(id);
    res.send("Item deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};
//crud_get one feedback data
module.exports.getFeedbackById = async (req, res) => {
  try {
    const id = req.params.id;

    const feedback = await FeedbackModel.findById(id);
    if (!feedback) {
      return res.status(404).send("feedback not found");
    }
    res.send(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

