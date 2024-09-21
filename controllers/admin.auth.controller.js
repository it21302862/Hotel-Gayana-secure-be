const { log } = require("../util/logger");
const {
    changeUserPasswordService,
    createUserService,
    findAllUsersService,
    findOneAndUpdateUserService,
    findOneUserByIdService,
    getPagedUsersService,
    logoutUserService,
    requestUserPasswordResetService,
    resetUserPasswordService,
    signInUserService,
    validateAndUpdateUserPwService,
    validateUserPWResetTokenService,
} = require("../services/admin.auth.service");
const { validateRefreshTokenReq } = require("../services/token.service");
const { SETTINGS } = require("../constants/commons.settings");

const userLoginController = async (req, res) => {
    log.info("User login started");
    if (!req.body.email) {
        log.error("Email not found");
        return res.status(404).send({ message: "Email not found" });
    }
    const email = req.body.email.toLowerCase();
    try {
        const result = await signInUserService(req.body.password, email, process.env.ADMIN_ROLE);
        res.send(result);
    } catch (e) {
        log.error(e);
        res.status(403).send(e);
    }
};

const userRefreshTokenController = async (req, res) => {
    log.info("User token refresh started");
    const rToken = req.body.refreshToken;
    if (!rToken) {
        log.error("Refresh token not found");
        return res.status(402).send({ code: 1000, message: "Refresh token not found" });
    } else {
        try {
            const result = await validateRefreshTokenReq(true, rToken, process.env.ADMIN_ROLE);
            res.send(result);
        } catch (e) {
            log.error(e);
            res.status(400).send(e);
        }
    }
};

const logoutUserController = async (req, res) => {
    log.info("User logout started");
    try {
        await logoutUserService({ user: req.user.userId });
        log.info("Logout successful");
        return res.status(200).send({ message: "Logout successful" });
    } catch (e) {
        log.error("Logout unsuccessful");
        return res.status(403).send({ error: "Logout unsuccessful" });
    }
};

const changeUserPasswordController = async (req, res) => {
    try {
        const result = await changeUserPasswordService({
            id: req.user.userId,
            ...req.body,
        });
        res.send(result);
        log.info("Password changed successfully");
    } catch (e) {
        log.error(JSON.stringify(e));
        return res.status(400).send(e);
    }
};

const resetUserPasswordController = async (req, res) => {
    log.info("Resetting password");
    try {
        const data = await resetUserPasswordService(req.params.id);
        res.send(data);
        log.info("Reset password email sent");
    } catch (e) {
        return res.status(400).send(e);
    }
};

const createUserController = async (req, res) => {
    log.info("Creating user");
    try {
        const data = await createUserService(req.body);
        res.send(data);
        log.info("User created successfully");
    } catch (e) {
        log.error(JSON.stringify(e));
        log.info("User Create failed");
        return res.status(400).send(e);
    }
};

const findOneAndUpdateUserController = async (req, res) => {
    log.info("Updating user started");
    try {
        const result = await findOneAndUpdateUserService({ _id: req.body._id }, { ...req.body });
        res.send(result);
        log.info("User updated successfully");
    } catch (e) {
        log.error(JSON.stringify(e));
        res.status(400).send(e);
    }
};

const requestUserPWResetController = async (req, res) => {
    log.info("Requesting password reset");
    log.info(req.body.email);
    try {
        const data = await requestUserPasswordResetService(req.body.email, SETTINGS.USERS.ADMIN);
        res.send(data);
        log.info("Password reset request completed");
    } catch (e) {
        log.error(JSON.stringify(e));
        return res.status(400).send(e);
    }
};

const validateUserPWResetTokenController = async (req, res) => {
    log.info("Validating password reset token");
    try {
        const data = await validateUserPWResetTokenService(req.body.token);
        res.send(data);
        log.info("Password reset token validated");
    } catch (e) {
        return res.status(400).send(e);
    }
};

const updateUserPasswordController = async (req, res) => {
    log.info("Updating password");
    try {
        const { token, password } = req.body;
        const data = await validateAndUpdateUserPwService(token, password);
        res.send(data);
        log.info("Password updated successfully");
    } catch (e) {
        log.error("Password update failed", e);
        return res.status(400).json({
            done: false,
            message: "An error occurred during the password reset process.",
        });
    }
};

const findAllUsersController = async (req, res) => {
    log.info("Getting all users");
    try {
        const result = await findAllUsersService(req.body);
        res.send(result);
        log.info("Retrieved all users successfully");
    } catch (e) {
        log.error(JSON.stringify(e));
        res.status(400).send(e);
    }
};

const getPagedUsersController = async (req, res) => {
    log.info("Getting paged users");
    try {
        const data = await getPagedUsersService(req.body);
        res.send(data);
        log.info("Retrieved paged users successfully");
    } catch (e) {
        log.error(JSON.stringify(e));
        res.status(400).send(e);
    }
};

const findOneUserByIdController = async (req, res) => {
    log.info("Finding user by ID");
    try {
        const result = await findOneUserByIdService(req.params.id);
        res.send(result);
        log.info("User found by ID successfully");
    } catch (e) {
        log.error(JSON.stringify(e));
        res.status(400).send(e);
    }
};

module.exports = {
    userLoginController,
    userRefreshTokenController,
    logoutUserController,
    changeUserPasswordController,
    resetUserPasswordController,
    createUserController,
    findOneAndUpdateUserController,
    requestUserPWResetController,
    validateUserPWResetTokenController,
    updateUserPasswordController,
    findAllUsersController,
    getPagedUsersController,
    findOneUserByIdController
};
