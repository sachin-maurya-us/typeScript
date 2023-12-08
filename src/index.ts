require('dotenv').config();

import http from 'http';
import compression from 'compression';
import cors from 'cors';
import express from 'express';

import  db from './models'
import startApolloServer from './start-apollo-server'

const app = express();
const port = process.env.PORT

// COMPRESSION
app.use(compression());
const corsOptions = { credentials: true, origin: true };

// CORS AND PARSERS
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const initServer = async() => {
db.sequelize.sync().then(async()=> {
  startApolloServer(app);
  const httpServer = http.createServer(app);
  httpServer.listen(4000, () => {
    console.info(`🚀 Server ready at http://localhost:${port}/api/graphql`);
  });
})
}

initServer()