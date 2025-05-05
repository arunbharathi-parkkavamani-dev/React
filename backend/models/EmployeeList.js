import mongoose from "mongoose";

const EmployeesListSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    age: { type: Number },
    employeeID: { type: String },
    department: { type: String },
    designation: { type: String },
    active: { type: Boolean, default: true },
    address1: { type: String },
    address2: { type: String },
    address3: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
    phone: { type: String },
    email: { type: String },
    username: { type: String },
    password: { type: String },
    userType: { type: String },
    branchPermission: { type: String },
    profileImage: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const EmployeesList = mongoose.model("EmployeeList", EmployeesListSchema);

export default EmployeesList;  