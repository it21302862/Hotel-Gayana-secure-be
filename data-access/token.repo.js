const { RefreshToken } = require("../models/user.token.model");

const createUserRefreshTokenRepo = (data) => {
    return new RefreshToken(data).save();
};

const findOneUserRefreshTokenRepo = async (filters) => {
    return RefreshToken.findOne(filters).exec();
};

const findOneAndDeleteUserRefreshTokenRepo = (filters) => {
    return RefreshToken.findOneAndDelete(filters).exec();
};

module.exports = {
    createUserRefreshTokenRepo,
    findOneUserRefreshTokenRepo,
    findOneAndDeleteUserRefreshTokenRepo,
};
