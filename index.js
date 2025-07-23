require('dotenv').config();
require('./dotenv-config');
const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { connectDB } = require('./db');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

main();