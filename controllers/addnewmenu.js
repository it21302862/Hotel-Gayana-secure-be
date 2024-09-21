const addnewmenumodel = require("../models/addnewmenumodel");
const sanitizeHtml = require('sanitize-html');

//crud_get all data
module.exports.getmenu = async (req, res) => {
  try {
    const menu = await addnewmenumodel.find();
    // Sanitize menu data before sending it to the client
    const sanitizedMenu = menu.map(item => ({
      _id: sanitizeHtml(item.id),
      menu: sanitizeHtml(item.menu),
      menucat: sanitizeHtml(item.menucat),
      price: item.price, 
      menunumber: item.menunumber, 
      description: sanitizeHtml(item.description),
    }));
    res.send(sanitizedMenu);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

//crud_save data
module.exports.addmenu = async (req, res) => {
  try {
    // Sanitize input fields
    const sanitizedData = {
      menu: sanitizeHtml(req.body.menu),
      menucat: sanitizeHtml(req.body.menucat),
      price: req.body.price, 
      menunumber: req.body.menunumber, 
      description: sanitizeHtml(req.body.description)
    };
    
    const menu = new addnewmenumodel(sanitizedData);
    await menu.save();
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
module.exports.updatemenu = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Sanitize the update fields
    const updatedRoom = {
      menu: sanitizeHtml(req.body.menu),
      menucat: sanitizeHtml(req.body.menucat),
      price: req.body.price, 
      menunumber: req.body.menunumber, 
      description: sanitizeHtml(req.body.description)
    };

    await addnewmenumodel.findByIdAndUpdate(id, updatedRoom);
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

// crud_delete data
module.exports.deletemenu = async (req, res) => {
  try {
    const { id } = req.params;

    await addnewmenumodel.findByIdAndDelete(id);
    res.send("Item deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};


//crud_get one data
module.exports.getmenuById = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if id is provided and valid
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid or missing menu ID" });
    }

    const menu = await addnewmenumodel.findById(id);
    if (!menu) {
      return res.status(404).send("Vehicle not found");
    }
    // Sanitize the menu item before sending it
    const sanitizedMenu = {
      menu: sanitizeHtml(menu.menu),
      menucat: sanitizeHtml(menu.menucat),
      price: menu.price,
      menunumber: menu.menunumber,
      description: sanitizeHtml(menu.description),
    };

    res.send(sanitizedMenu);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};