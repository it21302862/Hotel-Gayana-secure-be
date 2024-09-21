const fs = require("fs");
const jwt = require("jsonwebtoken");
const { Types } = require("mongoose");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const {
  createUserRefreshTokenRepo,
  findOneAndDeleteUserRefreshTokenRepo,
  findOneUserRefreshTokenRepo,
} = require("../data-access/token.repo");
const { log } = require("../util/logger");
const { aggregateUserRepo } = require("../data-access/user.repo");

const ObjectId = Types.ObjectId;

const generateJWT = async (user, isRefresh, userType) => {
  try {
    if (!user._id || !user.email) {
      log.error("User details have not been found");
      throw { message: "User details have not been found" };
    }
    let payload = null;

    payload = {
      userId: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      userType,
    };
    delete payload?.role?.permissions;

    const signOptions = {
      issuer: process.env.ACCESS_TOKEN_ISSUER,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      algorithm: "RS256",
    };

    const filePath = path.join(__dirname, "../config/private.pem");
    const key = fs.readFileSync(filePath, "utf8");
    const passphrase = process.env.ACCESS_TOKEN_PASSPHRASE;

    const token = await jwt.sign(payload, { key, passphrase }, signOptions);
    if (!isRefresh) {
      const rtPayload = {
        refreshToken: uuidv4(),
      };

      const rtSignOptions = {
        issuer: process.env.REFRESH_TOKEN_ISSUER,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      };

      await createUserRefreshTokenRepo({
        user: user._id,
        refreshToken: rtPayload.refreshToken,
      });

      const generatedRToken = await jwt.sign(
        rtPayload,
        process.env.REFRESH_TOKEN_SECRET,
        rtSignOptions
      );

      log.info("Token generated & Login successful");

      return {
        access_token: token,
        refresh_token: generatedRToken,
        user: payload,
      };
    } else {
      log.info("Token refreshed!");
      return {
        access_token: token,
      };
    }
  } catch (error) {
    log.error("Token not generated");
    throw error;
  }
};

const validateRefreshTokenReq = async (isRefresh, token, userType) => {
  if (!token) {
    log.error("Token not found");
    throw { message: "Token not found" };
  }
  try {
    const data = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const refreshTokenData = await findOneUserRefreshTokenRepo({
      refreshToken: data.refreshToken,
    });
    if (!refreshTokenData) {
      throw {
        message:
          "Refresh token not found in system. Unable to issue access token",
      };
    }

    const user = (
      await aggregateUserRepo({ _id: new ObjectId(refreshTokenData.user) })
    )[0];
    return await generateJWT(user, isRefresh, userType);
  } catch (error) {
    const decoded = jwt.decode(token, { complete: true });
    if (error.message === cprocess.env.REFRESH_TOKEN_ERROR_MESSAGE) {
      await findOneAndDeleteUserRefreshTokenRepo({
        refreshToken: decoded.payload.refreshToken,
      });
      log.error("Expired refresh token");
      throw { message: "Expired refresh token" };
    } else {
      log.error("Invalid refresh token");
      throw { message: "Invalid refresh token" };
    }
  }
};

module.exports = {
  generateJWT,
  validateRefreshTokenReq,
};
