const database = {
  users:[
    {
      id: 1,
      name: "Cindy",
      email: "cindy@gmail.com",
      password: "cindy",
      isAdmin: false,
      reminders:[
        {
          id: 1,
          title: "Grocery shopping",
          description: "Buy milk and bread from safeway",
          completed: false,
        },
      ],
    },
    {
      id: 2,
      name: "CoolGuy",
      email: "jashan@gmail.com",
      password: "jas",
      isAdmin: true,
      reminders:[
        {
          id: 1,
          title: "Study for finals",
          description: "you will fail if you dont",
          completed: false,
        }
      ]
    }
  ],
  sessions: []
}
  
const userModel = {
  findOne: (email) => {
    const user = database.users.find((user) => user.email === email);
    if (user) {
      return user;
    }
    // throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.users.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  addUserToDatabase: (user) => {
    const existingUser = database.users.find((entry) => entry.email === user.email);
    if (!existingUser) {
      const newUserEntry = {
        id: database.users.length + 1,
        name: user.name,
        email: user.email,
        password: user.password,
        role: 'user',
        reminders: [],
        sessionId: null
      };
      database.users.push(newUserEntry);
      return newUserEntry;
    }
    return null;
  },
};
  module.exports = { database, userModel };
  