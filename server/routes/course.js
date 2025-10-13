const { Router } = require("express");
const courseRouter = Router();
const { purchaseModel, courseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

// Define a POST route for purchasing a course, with user authentication middleware
courseRouter.post("/purchase", userMiddleware, async function(req, res) {
    const userId = req.userId;
    const courseId = rq.body.courseId;

    // If courseId isn't provided in the req.body, return a error response to the client
    if (!courseId) {
        return res.status(400).json({
            message: "Please provide a courseId",
        });
    }

    // Check if the user has already purchased the course by quering the purchaseModel with courseId and userId
    const existingPurchase = await purchaseModel.findOne({
        courseId: courseId,
        userId: userId,
    });

    // If the user has already purchased the course, return a error response to the client
    if (existingPurchase) {
        return res.status(400).json({
            message: "You have already bought this course",
        });
    }

    // Try to create a new purchase entry in the database with the provided courseId and userId
    await purchaseModel.create({
        courseId: courseId,
        userId: userId,
    });

    // If the purchase is successful, return a status with a success message to the client
    res.status(201).json({
        message: "You have successfully bought the course"
    });
});

// Define the GET route for previewing course details without authentication
courseRouter.get("/preview", async function(req, res) {
    // Query the database to get all the courses available for purchase
    const courses = await courseModel.find({});

    // Return the queried course details as a JSON response to the client with a status code
    res.status(200).json({
        courses: courses,    // Send the course details back to the client
    });
});

module.exports = {
    courseRouter: courseRouter
}

