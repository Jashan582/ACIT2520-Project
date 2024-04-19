let Database = require("../database");

const userController = {
    getUserByEmailIdAndPassword: (email, password) => {
        // Simulate finding a user in a database
        return Database.users.find(user => user.email === email && user.password === password);
    },

    getUserById: (id) => {
        return Database.users.find(user => user.id === id);
    },

    createUser: (userData, callback) => {
        const { name, email, password } = userData;
        const existingUser = Database.users.some(user => user.email === email);
        if (existingUser) {
            callback("User already exists", null);
        } else {
            const newUser = {
                id: Database.users.length + 1,
                name,
                email,
                password,
                isAdmin: false, // Set based on your logic or input
                reminders: []
            };
            Database.users.push(newUser);
            callback(null, newUser);
        }
    }
};

module.exports = userController;
