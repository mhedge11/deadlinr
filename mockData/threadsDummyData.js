const THREADDATA = [
    {
        id: 0,
        title: 'HW 0',
        body: 'How difficult is HW 1?',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [1, 2],
    },
    {
        id: 1,
        title: 'Reply to ID:1',
        body: 'HW1 is not bad at all',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [3],
    },
    {
        id: 2,
        title: 'Reply to ID: 1',
        body: 'HW 1 is difficult',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [],
    },
    {
        id: 3,
        title: 'HW 3',
        body: 'How difficult is HW 4?',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [],
    },
];

const REPLYDATA = [
    {
        id: 100,
        body: 'This homework assignment was really difficult',
        author: 1,
        timestamp: Date.now,
        replies: [],
    },
    {
        id: 101,
        body: 'Easy Easy Easy',
        author: 2,
        timestamp: Date.now,
        replies: [],
    },
];
