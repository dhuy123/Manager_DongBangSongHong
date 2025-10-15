const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const userRoutes = require('./routers/userRouter');
const tinhRoutes = require('./routers/tinhRouters');
const accountRoutes = require('./routers/accountRouters');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/tinh', tinhRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/login', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
