const Admin = require('../models/adminModel');

// CREATE ADMIN
module.exports.saveAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL ADMINS
module.exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE ADMIN BY ID
module.exports.getAdminByID = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE ADMIN
module.exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = req.body;

    await Admin.findByIdAndUpdate(id, updatedAdmin);
    res.send("Admin updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

// DELETE ADMIN
module.exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndRemove(id);
    if (deletedAdmin) {
      res.send("Admin deleted successfully");
    } else {
      res.status(404).send({ msg: "Admin not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};
