const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
require('dotenv').config();
const { connectDB } = require('./db');

const app = express();
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