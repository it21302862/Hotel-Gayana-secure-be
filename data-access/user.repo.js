const { User } = require("../models/user.model");
const { UserPWReset } = require("../models/user.password.reset.model");
const { hashPassword, validatePassword } = require("../util/hash");
const { Types } = require("mongoose");
const ObjectId = Types.ObjectId;

const createUserRepo = (data) => {
    return new User(data).save();
};

const findOneUserRepo = async (filters) => {
    return User.findOne(filters).exec();
};

const findLatestUserRepo = async (filters) => {
    return User.find(filters).sort({ createdAt: -1 }).limit(1).exec();
};

const aggregateUserRepo = (filters) => {
    return User.aggregate([
        {
            $match: { ...filters },
        }
    ]).exec();
};

const findOneAndUpdateUserRepo = async (filters, data) => {
    if (data.password) {
        data.password = await hashPassword(data.password);
        // if (validatePassword(data.password)) {
        //     data.password = await hashPassword(data.password);
        // } else {
        //     throw {
        //         pwdValid: false,
        //         message:
        //             "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one digit.",
        //     };
        // }
    }
    return User.findOneAndUpdate(filters, { $set: { ...data } }, { new: true }).exec();
};

const findAllUsersRepo = () => {
    return User.aggregate([
        {
            $project: {
                _id: 1,
                role: 1,
                email: 1,
                firstname: 1,
                lastname: 1,
                mobilenumber: 1,
                active: 1,
                archived: 1,
                createdAt: 1,
                updatedAt: 1,
            },
        },
    ]).exec();
};

const getPagedUsersRepo = async (data) => {
    const { pageIndex, pageSize, sortField, sortOrder, filters } = data;
    let statusFilter = {};
    let roleFilter = {};
    let textFilter = {};
    let departmentFilter = {};
    let archivedFilter = {};

    if (filters?.department) {
        departmentFilter = { department: new ObjectId(filters.department) };
    }

    if (filters?.searchText) {
        textFilter = {
            $or: [
                { refNo: { $regex: filters.searchText, $options: "i" } },
                { email: { $regex: filters.searchText, $options: "i" } },
                { mobilenumber: { $regex: filters.searchText, $options: "i" } },
                { firstname: { $regex: filters.searchText, $options: "i" } },
                { lastname: { $regex: filters.searchText, $options: "i" } },
            ],
        };
    }

    if (filters?.status === true || filters?.status === false) {
        statusFilter = { active: filters.status };
    }

    if (filters?.role) {
        roleFilter = { role: new ObjectId(filters.role) };
    }

    if (typeof filters?.archived === "boolean") {
        archivedFilter = { archived: filters.archived };
    }

    return User.aggregate([
        { $match: { ...archivedFilter, ...departmentFilter, ...roleFilter, ...statusFilter } },
        {
            $lookup: {
                from: "roles",
                localField: "role",
                foreignField: "_id",
                as: "role",
            },
        },
        {
            $unwind: {
                path: "$role",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                _id: 1,
                role: 1,
                refNo: 1,
                email: 1,
                active: 1,
                createdAt: 1,
                firstname: 1,
                lastname: 1,
                mobilenumber: 1,
                archived: 1,
                text: {
                    $concat: ["$firstname", " ", "$lastname", " ", "$email", " ", "$role.name"],
                },
                filterRole: "$role.name",
            },
        },
        { $match: { ...textFilter } },
        {
            $facet: {
                metadata: [{ $count: "total" }, { $addFields: { page: pageIndex } }],
                data: [
                    { $sort: { [sortField]: sortOrder } },
                    { $skip: pageSize * (pageIndex - 1) || 0 },
                    { $limit: pageSize },
                ],
            },
        },
    ]).exec();
};

const createUserPwReset = (data, session) => {
    return new UserPWReset(data).save({ session });
};

const findUserPwResetToken = (filters) => {
    return UserPWReset.findOne(filters).exec();
};

const findUserPwResetTokenAndDelete = (filters) => {
    return UserPWReset.findOneAndDelete(filters).exec();
};

module.exports = {
    createUserRepo,
    findOneUserRepo,
    findLatestUserRepo,
    aggregateUserRepo,
    findOneAndUpdateUserRepo,
    findAllUsersRepo,
    getPagedUsersRepo,
    createUserPwReset,
    findUserPwResetToken,
    findUserPwResetTokenAndDelete,
};
