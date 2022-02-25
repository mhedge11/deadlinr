import moment from "moment";

const courses = [
    {
      id: 0,
      title: "EAPS 106",
      bgColor: "#08c43d",
      tasks: [
        {
          taskTitle: "Movie Worksheet 4",
          dueDate: moment(),
        },
      ],
      members: [],
    },
    {
      id: 1,
      title: "CS 180",
      bgColor: "#414241",
      tasks: [],
      members: [],
    },
    {
      id: 2,
      title: "MA 165",
      bgColor: "#f22c3f",
      tasks: [],
      members: [],
    },
    {
      id: 3,
      title: "ENGL 106",
      bgColor: "#d66718",
      tasks: [],
      members: [],
    },
    {
      id: 4,
      title: "CS 193",
      bgColor: "#2180cf",
      tasks: [],
      members: [],
    },
  ]

export default courses;