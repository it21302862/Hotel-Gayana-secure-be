const employeeModel = require("../models/employeeModel");

//get all data
module.exports.getEmployee = async (req, res) => {
  try {
    const employee = await employeeModel.find();
    res.send(employee);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

//save data
module.exports.addEmployee = async (req, res) => {
  try {
    const employee = new employeeModel(req.body);
    await employee.save();
    res.status(201).json({
      status: 201,
      message: "Created Successfully",
      
    });
    console.log(res.status)
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Not successful",
      error: err
    });
  }
};


//update data
module.exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateEmployee = {
     firstName,
     lastName,
     DOB,
     address,
     telephone,
     email

    }=req.body
    await employeeModel.findByIdAndUpdate(id, updateEmployee);
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

// delete data
module.exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await employeeModel.findByIdAndDelete(id);
    //console.log("Employee deleted successfully");
    res.send({msg:"Employee deleted successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
};

//get one data
module.exports.getEmployeeById = async (req, res) => {
  try {
    const EmployeeId = req.params.id;

    const Employee = await employeeModel.findById(EmployeeId);
    if (!Employee) {
      return res.status(404).send("Employee not found");
    }
    res.send(Employee);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
