const { Document, model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");
const { IRole } = require("./role.model");

const UserSchema = new Schema(
    {
        refNo: {
            type: String,
        },
        firstname: {
            type: String,
            required: [true, "First name is required"],
        },
        lastname: {
            type: String,
            required: [true, "Last name is required"],
        },
        phoneNumberPrefix: {
            type: String,
            required: [true, "Mobile number prefix is required"],
        },
        mobilenumber: {
            type: String,
            required: [true, "Mobile number is required"],
        },
        role: {
            type: String
        },
        email: {
            type: String,
            unique: true,
            uniqueCaseInsensitive: true,
            required: [true, "Email is required"],
            validate: [isEmail, "Invalid Email"],
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        active: {
            type: Boolean,
            default: true,
        },
        archived: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", function (next) {
    const admin = this;
    if (!admin.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(12, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(admin.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            admin.password = hash;
            next();
        });
    });
});

UserSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

const User = model("User", UserSchema);

module.exports = { User };
