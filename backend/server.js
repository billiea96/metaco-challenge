import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import seedingRouter from './routers/seedingRouter.js';
import tournamentRouter from './routers/tournamentRouter.js';
import tournamentResultRouter from './routers/tournamentResultRouter.js';
import userRouter from './routers/userRouter.js';
import teamRouter from './routers/teamRouter.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/metaco-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API Route
app.use('/api/seeding', seedingRouter);
app.use('/api/tournaments', tournamentRouter);
app.use('/api/tournament-results', tournamentResultRouter);
app.use('/api/users', userRouter);
app.use('/api/teams', teamRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
