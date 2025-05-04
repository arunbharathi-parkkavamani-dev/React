import UsersList from "../models/UsersList.js";


//Get All Users List
export const GetAllUsersList = async (req, res) => {
    try {
        const usersList = await UsersList.find();
        res.json(usersList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

export const GetUsersById = async (req, res) => {
    try {
        const userList = await UsersList.findById(req.params.id);
        res.json(userList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const CreateUserList = async (req, res) => {
    try {
        const newUser = new UsersList(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User Added Successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const UpdateUserList = async (req, res) => {
    try {
        const updateUserList = await UsersList.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updateUserList) return res.status(404).json({ error: "User List not Found" });
        res.json({ message: 'Updated Successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const DeleteUserList = async (req, res) => {
    try {
        const deleteUser = await UsersList.findByIdAndDelete(req.params.id);
        if (!deleteUser) return res.status(404).json({ error: 'User List Not Found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

