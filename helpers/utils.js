const mongoose = require("mongoose");

const checkIfIdIsValid = (id) => {
    const objectId = mongoose.Types.ObjectId;
    return objectId.isValid(id);
};

module.exports = checkIfIdIsValid;
