import EmployeesList from "../models/EmployeeList.js";

//Get All Employees List
export const GetAllEmployeesList = async (req, res) => {
    try {
        const employees = await EmployeesList.find();  // Use 'employees' instead of 'EmployeesList'
        res.json(employees);
    } catch (err) {
        res.status(500).json({ "This is from get All Employee": err.message });
    }
};

export const GetEmployeesById = async (req, res) => {
    try {
        const employee = await EmployeesList.findById(req.params.id);
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const CreateEmployeeList = async (req, res) => {

    try {
        const employeeData = {
            ...req.body,
            profileImage: req.file ? `/uploads/${req.file.filename}` : '', // Set profileImage path if a file was uploaded
        };

        const newEmployee = new EmployeesList(employeeData);
        await newEmployee.save();

        res.status(201).json({ message: 'Employee Added Successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const UpdateEmployeeList = async (req, res) => {
    const updatedData = { ...req.body };

    if (req.file) {
        updatedData.profileImage = `/uploads/${req.file.filename}`;
    }

    try {
        const updateEmployeeList = await EmployeesList.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {
                new: true,
                runValidators: true
            }
        );
        if (!updateEmployeeList)
            return res.status(404).json({ error: "Employee List not Found" });

        res.json({ message: 'Updated Successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const DeleteEmployeeList = async (req, res) => {
    try {
        const deleteEmployee = await EmployeesList.findByIdAndDelete(req.params.id);
        if (!deleteEmployee) return res.status(404).json({ error: 'Employee List Not Found' });
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const Login = async (req, res) => {
    try {
        const { Employeename, password, branchPermission } = req.body;
        const Employee = await EmployeesList.findOne({ Employeename });
        if (!Employee) return res.status(404).json({ error: 'Employee Not Found' })
        if (password !== Employee.password) return res.status(404).json({ error: 'Invalid Passord' });
        if (Employee.branchPermission !== 'All' && branchPermission !== Employee.branchPermission) return res.status(403).json({ error: 'Invalid Branch' });
        req.session.EmployeeId = Employee._id;
        req.session.name = Employee.firstName;
        res.json({ message: 'Logged In', firstName: Employee.firstName });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const Logout = async (req, res) => {
    try {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.json({ message: 'Logged Out' });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCurrentEmployee = async (req, res) => {
    if (!req.session.name || !req.session.EmployeeId) {
        return res.status(401).json({ error: 'Login first' });
    }

    try {
        const Employee = await EmployeesList.findById(req.session.EmployeeId).select('-password');
        if (!Employee) return res.status(404).json({ error: 'Employee not found' });

        res.json(Employee);
    } catch (err) {
        console.error('Error in getCurrentEmployee:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

