const { ok } = require('assert');
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
    title: 'test1',
    content: 'askdladalkjfaklfjasja',
    userId: 1,
  },
  {
    id: 2,
    title: 'test2',
    content: 'askdladalkjfaklfjasja',
    userId: 1,
  },
];

const httpRequestListener = function (req, res) {
  const { url, method } = req;

  if (method === 'POST') {
    if (url === '/user') {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });

      req.on('end', () => {
        const user = JSON.parse(body);

        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'userCreated' }));
      });
    }

    if (url === '/posting') {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });

      req.on('end', () => {
        const post = JSON.parse(body);
        posts.push({
          id: post.id,
          title: post.title,
          content: post.content,
          userId: post.userId,
        });
        console.log(posts);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'postCreated' }));
      });
    }
  }
};

server.on('request', httpRequestListener);

server.listen(8000, () => {
  console.log('server started');
});
