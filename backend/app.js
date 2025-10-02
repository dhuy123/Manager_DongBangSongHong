const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const tinhRoutes = require('./routers/tinhRouters');

app.use(cors());
app.use(express.json());

app.use('/api/tinh', tinhRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});