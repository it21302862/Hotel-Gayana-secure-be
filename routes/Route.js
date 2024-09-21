const { Router } = require("express")
const router = Router()

const path = require('path');
const { Shield } = require('../middleware/auth/shield');
const { SETTINGS } = require('../constants/commons.settings');

const {
    changeUserPasswordController,
    createUserController,
    findAllUsersController,
    findOneAndUpdateUserController,
    findOneUserByIdController,
    getPagedUsersController,
    logoutUserController,
    requestUserPWResetController,
    resetUserPasswordController,
    updateUserPasswordController,
    userLoginController,
    userRefreshTokenController,
    validateUserPWResetTokenController,
} = require('../controllers/admin.auth.controller');

const publicKey = path.join(__dirname, '../config/public.pem');
const shield = new Shield(publicKey);

const userAuthRouter = Router();
//Ushan 
const { getCategory, saveCategory, deleteCategory, updateCategory, getCategoryById } = require("../controllers/CategoryControllers")
const { getitems, additem, updateItem, deleteItem, getItemById, updateItemquick } = require("../controllers/ItemControllers")
const { getOrder, updateOrder, deleteOrder, getOrderById, saveOrder, getLastOrderNumber } = require("../controllers/OrderControllers")
const { getSupplier, addSupplier, deleteSupplier, getSupplierById } = require("../controllers/SupplierConntrollers")
const { getAdmins, saveAdmin, getAdminByID, updateAdmin, deleteAdmin } = require('../controllers/AdminControllers')
const { sendEmail } = require("../controllers/mail");
//send mail
router.post("/send-email", sendEmail);
//admin router
router.post('/admin/save', createUserController);
router.get('/admin/get', findAllUsersController);
router.get('/admin/get/:id', getAdminByID);
router.put('/admin/update/:id', updateAdmin);
router.delete('/admin/delete/:id', deleteAdmin);
//category router
router.get("/category/get", getCategory);
router.post("/category/save", saveCategory)
router.get("/category/get/:id", getCategoryById)
router.put("/category/update/:id", updateCategory)
router.delete("/category/delete/:id", deleteCategory)
//item router
router.get("/item/get", getitems)
router.get("/item/get/:id", getItemById)
router.post("/item/save", additem)
router.put("/item/updatequick/:id", updateItemquick)
router.put("/item/update/:id", updateItem)
router.delete("/item/delete/:id", deleteItem)
//order router
router.get("/order/get", getOrder)
router.get("/order/get/:id", getOrderById)
router.post("/order/save", saveOrder)
router.put("/order/update/:id", updateOrder)
router.delete("/order/delete/:id", deleteOrder)
router.get("/order/lastNumber", getLastOrderNumber);
//supplier router
router.get("/supplier/get", getSupplier)
router.get("/supplier/get:id", getSupplierById)
router.delete("/supplier/delete/:id", deleteSupplier)
router.post("/supplier/save", addSupplier)

//Thamindu
const { getReservations, getReservationById, addReservation, updateReservation, deleteReservation } = require("../controllers/ReservationCtrl")
const { getRooms, addRoom, updateRoom, deleteRoom, getRoomById } = require("../controllers/RoomControllers")
//Room router
router.get("/Room/get", getRooms)
router.get("/Room/get/:id", getRoomById)
router.post("/Room/save", addRoom)
router.put("/Room/update/:id", updateRoom)
router.delete("/Room/delete/:id", deleteRoom)
//Reservation router
router.get("/Reservation/get", getReservations)
router.get("/Reservation/get/:id", getReservationById)
router.post("/Reservation/save", addReservation)
router.put("/Reservation/update/:id", updateReservation)
router.delete("/Reservation/delete/:id", deleteReservation)

//Nethmi
const { getCustomer, addCustomer, updateCustomer, deleteCustomer, getCustomerById } = require("../controllers/customerControllers")
const { getFeedback, addFeedback, deleteFeedback, getFeedbackById } = require("../controllers/feedbackControllers")
const { getSupport, addSupport, deleteSupport, getSupportById } = require("../controllers/supportControllers")
//customer 
router.get("/customer/get", getCustomer);
router.post("/customer/save", addCustomer)
router.get("/customer/get/:id", getCustomerById)
router.put("/customer/update/:id", updateCustomer)
router.delete("/customer/delete/:id", deleteCustomer)
//feedback
router.get("/feedback/get", getFeedback);
router.post("/feedback/save", addFeedback)
router.get("/feedback/get/:id", getFeedbackById)
router.delete("/feedback/delete/:id", deleteFeedback)
// support 
router.get("/support/get", getSupport);
router.post("/support/save", addSupport)
router.get("/support/get/:id", getSupportById)
router.delete("/support/delete/:id", deleteSupport)

//Lakshima
const { getVehicle, addVehicle, updateVehicle, deleteVehicle, getVehicleById } = require("../controllers/vehicleControllers")
const { getBooking, getBookingById, addBooking, updateBooking, deleteBooking } = require("../controllers/bookingControllers")
//vehicle router
router.get("/vehicle/get", getVehicle);
router.post("/vehicle/save", addVehicle)
router.get("/vehicle/get/:id", getVehicleById)
router.put("/vehicle/update/:id", updateVehicle)
router.delete("/vehicle/delete/:id", deleteVehicle)
//Booking router
router.get("/Booking/get", getBooking)
router.get("/Booking/get/:id", getBookingById)
router.post("/Booking/save", addBooking)
router.put("/Booking/update/:id", updateBooking)
router.delete("/Booking/delete/:id", deleteBooking)


//nipuna
const { getmenu, addmenu, updatemenu, deletemenu, getmenuById } = require("../controllers/addnewmenu")
//menu
router.get("/menu/get", getmenu);
router.post("/menu/save", addmenu)
router.get("/menu/get/:id", getmenuById)
router.put("/menu/update/:id", updatemenu)
router.delete("/menu/delete/:id", deletemenu)

//nishedi
const { getTax, addTax, updateTax, deleteTax, getTaxById } = require("../controllers/taxControllers")
const { getInvoice, getInvoiceById, addInvoice, updateInvoice, deleteInvoice } = require("../controllers/invoiceControllers")
//tax router
router.get("/tax/get", getTax);
router.post("/tax/save", addTax)
router.get("/tax/get/:id", getTaxById)
router.put("/tax/update/:id", updateTax)
router.delete("/tax/delete/:id", deleteTax)

//Invoice router
router.get("/Invoice/get", getInvoice)
router.get("/Invoice/get/:id", getInvoiceById)
router.post("/Invoice/save", addInvoice)
router.put("/Invoice/update/:id", updateInvoice)
router.delete("/Invoice/delete/:id", deleteInvoice)

//Sandali
const {getEmployee,getEmployeeById,addEmployee,updateEmployee, deleteEmployee} = require("../controllers/employeeControllers")
//employee router
router.get("/Employee/get",getEmployee)
router.get("/Employee/get/:id",getEmployeeById)
router.post("/Employee/save",addEmployee)
router.put("/Employee/update/:id",updateEmployee)
router.delete("/Employee/delete/:id",deleteEmployee)

// Login, Logout & Token Refresh Routes
router.post('/login', userLoginController);
router.post('/refresh-token', userRefreshTokenController);
router.post('/logout', shield.auth(null, process.env.ADMIN_ROLE), logoutUserController);

// Password Management Routes
router.get('/admin-reset-password/:id', shield.auth(null, process.env.ADMIN_ROLE), resetUserPasswordController);
router.post('/request-reset-password', requestUserPWResetController);
router.post('/validate-reset-password', validateUserPWResetTokenController);
router.post('/reset-password', updateUserPasswordController);

// Admin Management Routes
router.post('/create', createUserController);
router.put('/update', shield.auth(null, process.env.ADMIN_ROLE), findOneAndUpdateUserController);
router.get('/get-all', shield.auth(null, process.env.ADMIN_ROLE), findAllUsersController);
router.post('/get-paged', shield.auth(null, process.env.ADMIN_ROLE), getPagedUsersController);
router.get('/get-one/:id', shield.auth(null, process.env.ADMIN_ROLE), findOneUserByIdController);
router.post('/change-password', shield.auth(null, process.env.ADMIN_ROLE), changeUserPasswordController);

module.exports = { userAuthRouter };

module.exports = router;
