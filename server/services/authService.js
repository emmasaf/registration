const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');


const usersPath = path.resolve(__dirname, '../data/users.json');
const secretKey = 'your-secret-key';

function loadUsers() {
    const usersData = fs.readFileSync(usersPath, 'utf8');
    return JSON.parse(usersData);
}

function saveUsers(users) {
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

function registerUser(name, surname, email, password, birthday, gender) {
    const users = loadUsers();
    let isUnique = !users.some(user => user.email === email)
    if(isUnique){
        const newUser = { id: Date.now().toString(), name, surname, email, password: password, birthday, gender };
        users.push(newUser);
        saveUsers(users);
        return newUser;
    }
    else{
        return null
    }
}

function loginUser(email, password) {
    const users = loadUsers();
    const user = users.find(u => u.email === email);
    if (!user || password !== user.password) {
        return null;
    }
    const token = {id:user.id,token:jwt.sign({ userId: user.id }, secretKey)};
    return token;
}

function getUserData(userId) {
    const users = loadUsers();
    const user = users.find(u => u.id === userId);
    return user;
}

// Function to update user data by ID
function updateUserData(newData) {
    const users = loadUsers();

    const index = users.findIndex(u => u.id === newData.id);
    if (index === -1) {
        return null;
    }
    users[index] = { ...users[index], ...newData };
    saveUsers(users);
    return users[index];
}

module.exports = {
    registerUser,
    loginUser,
    loadUsers,
    getUserData,
    updateUserData
};
