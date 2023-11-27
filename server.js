const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const server = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3300;
const postsRouter = require('./routers/postsRouter');
const authRouter = require('./routers/authRouter');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

server.use(cors());
server.use(bodyParser.json());
server.use(postsRouter);
server.use('/auth', authRouter);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
