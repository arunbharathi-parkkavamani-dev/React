import mongoose from "mongoose";

const usersListSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date },
    age: { type: Number },
    employeeID: { type: String },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    active: { type: Boolean, default: true },
    address1: { type: String, required: true },
    address2: { type: String },
    address3: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String },
    phone: { type: String, required: true },
    email: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    branchPermission: { type: String, required: true },
    profileImage: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const UsersList = mongoose.model("UsersList", usersListSchema);

export default UsersList;