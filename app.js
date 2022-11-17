const http = require('http');

const server = http.createServer();

const users = [
  {
    id: 1,
    name: 'kevin',
    email: 'adssas@asdad.com',
    password: '123qweqw',
  },
  {
    id: 2,
    name: 'pppppp',
    email: 'ppp@asdad.com',
    password: 'ppppppw',
  },
];

const posts = [
  {
    id: 1,
    username: 'aaa',
    title: 'test1',
    content: 'askdladalkjfaklfjasja',
    userId: 1,
  },
  {
    id: 2,
    username: 'aaa',
    title: 'test2',
    content: 'askdladalkjfaklfjasja',
    userId: 1,
  },
  {
    id: 3,
    username: 'bbb',
    title: 'test2',
    content: 'askdladalkjfaklfjasja',
    userId: 2,
  },
];

const httpRequestListener = function (req, res) {
  const { url, method } = req;

  if (method === 'GET') {
    if (url === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(posts));
    }
  }
};

server.on('request', httpRequestListener);

server.listen(8000, () => {
  console.log('server started');
});
