let Database = {
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
  ],
  sessions: []
};

module.exports = Database;
