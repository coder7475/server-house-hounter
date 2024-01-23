const { Schema, model } = require('mongoose');   

const UserSchema = new Schema({
    fullName: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
}, { collection: "users" });

const userModel = model("UserSchema", UserSchema);

module.exports = userModel;