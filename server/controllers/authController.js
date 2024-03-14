const authService = require('../services/authService');

exports.registerUser = (req, res) => {
    const { name, surname, email, password, birthday, gender } = req.body;
    const user = authService.registerUser(name, surname, email, password, birthday, gender);
    if(user){
        res.json(user);
    }else{
        res.status(500).json({ error: 'Existing email' });
    }
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    const {id,token} = authService.loginUser(email, password);
    if (!token) {
        res.status(401).json({ message: 'Invalid credentials' });
    } else {
        res.json({ token,id });
    }
};

exports.logoutUser = (req, res) => {
 

    res.status(200).json({ message: 'Logout successful' });
};


exports.getUserData = (req, res) => {
    const userData = authService.getUserData(req.userId);
    res.json(userData);
};

exports.getUsers = (req, res) => {
    const usersData = authService.loadUsers();
    res.json(usersData);
};



exports.updateUserData = (req, res) => {
    console.log(req.body,'req.body');

    const updatedUserData = authService.updateUserData(req.body);
    res.json(updatedUserData);
};

