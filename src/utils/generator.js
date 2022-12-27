const {customAlphabet} = require("nanoid");

exports.generateVerificationCode = () => customAlphabet("0123456789", 6)();
