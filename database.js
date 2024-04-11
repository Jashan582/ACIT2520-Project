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
};

module.exports = Database;
