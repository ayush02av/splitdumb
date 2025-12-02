import express from 'express';
import mongoDB from './src/config/db/mongo-db.js';

import authRouter from './src/feature_auth/controllers/auth-controller.js';

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

mongoDB();

app.get('/healthCheck', (req, res) => {
    return res.send('Okkay');
});

app.listen(3000, () => {
console.log('server running on http://localhost:3000');
});

