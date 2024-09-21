const OrderModel = require("../models/OrderModel")

//get all data

module.exports.getOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find()
    res.send(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Sever Error")
  }
}


// save data
module.exports.saveOrder = async (req, res) => {
  try {
    const order = new OrderModel(req.body)
    await order.save()
    res.status(201).json({
      status: 201,
      message: "Create Successfully"
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      error
    })
  }
}

//update data
module.exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {

      orderStatus,
      orderNote
    } = req.body;

    await OrderModel.findByIdAndUpdate(id, {
      orderStatus,
      orderNote
    });
    res.send("Updated Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error, msg: "Something went wrong!" });
  }
};

//delete data
module.exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params
    await OrderModel.findByIdAndDelete(id)
    res.send("Order deleted successfully")
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error, msg: "somthing went worng!" })
  }
}
//get one data
module.exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).send("Item not found");
    }
    res.send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

//get last order number
module.exports.getLastOrderNumber = async (req, res) => {
  try {
    const lastOrder = await OrderModel.findOne().sort({ orderNumber: -1 });
    if (!lastOrder) {
      return res.status(404).send("No orders found");
    }
    const lastOrderNumber = lastOrder.orderNumber;
    res.send({ lastOrderNumber });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

