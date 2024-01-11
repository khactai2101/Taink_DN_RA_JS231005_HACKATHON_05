import express from 'express';
import Router from './controllers';

const server = express();
const PORT = 8000;

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

Router(server);

server.listen(PORT, () => {
  console.log(`Server listening on port 8000, http://localhost:${PORT}`);
});
