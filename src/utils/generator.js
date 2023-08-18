const { customAlphabet } = require("nanoid");

exports.generateVerificationCode = () => customAlphabet("0123456789", 6)();


exports.calculatePercentageDecrease = (initialValue, finalValue) => {
    if (initialValue === 0) {
        return 0; // Avoid division by zero
    }

    return ((parseInt(initialValue) - parseInt(finalValue)) / parseInt(initialValue)) * 100;
}