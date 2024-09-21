const bcrypt = require('bcrypt');

// Hashes the provided password using bcrypt
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(password, salt);
    } catch (e) {
        throw new Error('Password hashing failed!');
    }
};

// Validates password against the criteria: minimum 8 characters, at least one lowercase letter, one uppercase letter, and one digit
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

// Validates customer password with additional special character requirement
const validatePasswordCustomer = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    return passwordRegex.test(password);
};

module.exports = { hashPassword, validatePassword, validatePasswordCustomer };
