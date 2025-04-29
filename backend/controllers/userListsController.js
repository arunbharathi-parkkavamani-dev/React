import UsersList from '../models/userList.js'

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

export const Login = async (req, res) => {
    try {
        const { username, password, branchPermission } = req.body;
        const user = await UsersList.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User Not Found' })
        if (password !== user.password) return res.status(404).json({ error: 'Invalid Passord' });
        if (user.branchPermission !== 'All' && branchPermission !== user.branchPermission) return res.status(403).json({ error: 'Invalid Branch' });
        req.session.userId = user._id;
        req.session.name = user.firstName;
        res.json({ message: 'Logged In', firstName: user.firstName });
        console.log('firstName:', user.firstName);
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

export const getCurrentUser = async (req, res) => {
    if (!req.session.name || !req.session.userId) {
        return res.status(401).json({ error: 'Login first' });
    }

    try {
        const user = await UsersList.findById(req.session.userId).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error('Error in getCurrentUser:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

