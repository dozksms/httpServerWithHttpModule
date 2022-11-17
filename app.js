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
    username: 'kevin',
    title: 'test1',
    content: 'askdladalkjfaklfjasja',
    userId: 1,
  },
  {
    id: 2,
    username: 'kevin',
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

    if (url.startsWith('/')) {
      const id = Number(url.split('/')[1]); // 이때 id는 userId
      const user = users.find((ele) => {
        return ele.id === id;
      });
      if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify('Not Found'));
      }
      const post = posts.filter((ele) => {
        return ele.userId === id;
      });
      const data = {
        userID: user.id,
        userName: user.name,
        postings: post,
      };
      console.log(data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(data));
    }
  }
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
        return res.end(JSON.stringify({ message: 'userCreated' }));
      });
    }

    if (url.startsWith('/')) {
      const id = Number(url.split('/')[1]);
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
          userId: id,
        });
        console.log(posts);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'postCreated' }));
      });
    }
  }

  if (method === 'PATCH') {
    if (url.startsWith('/posts/')) {
      const id = Number(url.split('/')[2]); // 여기서 id는 게시물 id
      let body = '';
      req.on('data', (data) => {
        body += data;
      });

      req.on('end', () => {
        const edit = JSON.parse(body);
        const index = posts.find((ele) => {
          return ele.id === id;
        });
        if (!index) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify('Not Found'));
        } else {
          index.content = edit.content;
        }
        console.log(index);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(index));
      });
    }
  }

  if (method === 'DELETE') {
    if (url.startsWith('/posts/')) {
      const id = Number(url.split('/')[2]);
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === id) {
          posts.splice(i, 1);
          i--;
        }
      }
      console.log(posts);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'postingDeleted' }));
    }
  }
};

server.on('request', httpRequestListener);

server.listen(8000, () => {
  console.log('server started');
});
