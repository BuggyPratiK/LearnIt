const { Router } = require("express");
const adminRouter = Router();

const { adminModel, courseModel } = require("../db")
const { adminMiddleware } = require("../middleware/admin")

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const z = require("zod");
const { JWT_ADMIN_PASSWORD } = require("../config")

adminRouter.post("/signup", async function(req, res) {

    // Input validation using zod
    const requireBody = z.object({
        email: z.string().email().min(3),
        password: z.string().min(8),
        firstName: z.string().min(3),
        lastName: z.string().min(3),
    });

    const parsedDataSuccess = requireBody.safeParse(req.body);

    if (!parsedDataSuccess.success) {
        return res.json({
            message: "Incorrect Format",
            error: parsedDataSuccess.error
        })
    }

    //Extract validated email, password, firstName, lastName from the request body
    const { email, password, firstName, lastName } = req.body;

    //Hash the user's password using bcrypt with a salt rounds of 12
    const hashedPassword = await bcrypt.hash(password, 12)

    // Creating a new user in the database 
    try {
        // Create a new user entry with the provided email, hashed password, firstName,lastName
        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });
    } catch (e) {
        return res.status(400).json({
            message: "You are already signed-up!",
        });
    }

    res.json({
        message: "Sign-up Successful"
    });
});

adminRouter.post("/signin", async function(req, res) {

    const requireBody = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    });

    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
        return res.json({
            message: "Incorrect data format",
            error: parseDataWithSuccess.error,
        });
    };

    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email: email,
    });

    if (!admin) {
        return res.status(403).json({
            message: "Invalid credentials!",
        });
    }

    const passwordMatched = await bcrypt.compare(password, admin.password);

    if (passwordMatched) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

        res.json({
            token: token,
        });
    } else {
        res.status(403).json({
            message: "Invalid Credentials!"
        });
    }
});

// Define the admin routes for creating a course
adminRouter.post("/course", adminMiddleware, async function(req, res) {
    // Get the adminId from the request object
    const adminId = req.adminId;

    // Validate the request body data using zod schema
    const requireBody = z.object({
        title: z.string().min(3),
        description: z.string().min(10),
        imageUrl: z.string().url(),
        price: z.number().positive(),
    });

    // Parse and validate the request body data
    const parseDataWithSuccess = requireBody.safeParse(req.body);

    // If the data format is incorrect, send an error message to the client
    if (!parseDataWithSuccess) {
        return res.json({
            message: "Incorrect data format",
            error: parseDataWithSuccess.error,
        });
    }

    // Get title, description, imageUrl, price from the request body
    const course = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId,
    });

    // Respond with a success message if the course is created Successful
    res.status(201).json({
        message: "Course created",
        courseId: course._id,
    });
})

adminRouter.put("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    // Define a schema using zod to validate the request body for updating a course
    const requireBody = z.object({
        courseId: z.string().min(5),
        title: z.string().min(3).optional(),
        description: z.string().min(5).optional(),
        imageUrl: z.string().url().min(5).optional(),
        price: z.number().positive().optional(),
    });

    // Parse and validate the incoming request body against the schema
    const parseDataWithSuccess = requireBody.safeParse(req.body);

    // If validation fails, respond with an error message and the details of the error
    if (!parseDataWithSuccess) {
        return rse.json({
            message: "Incorrect data format",
            error: parseDataWithSuccess.error,
        });
    }

    // Destructure the validated fields from the request body 
    const { title, description, imageUrl, price, courseId } = req.body;

    // Attempt to find the course in the database using the provided courseId and adminId
    const course = await courseModel.findOne({
        _id: courseId,  // Match the course by ID 
        creatorId: adminId, // Ensure the admin is the creator
    });

    // If the course is not found, respond with an error message
    if (!course) {
        return res.status(404).json({
            message: "Course not found!",
        });
    }

    // Update the course details in the database using the updates object 
    await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId,
    },
        {
            // It uses the provided courseId and adminId to identify the course. 
            // For each field (title, description, imageUrl, price), if a new value is provided, it is used to update the course.
            // If a field isn't provided, the existing value from the database is kept.
            title: title || course.title,
            description: description || course.description,
            imageUrl: imageUrl || course.imageUrl,
            price: price || course.price,
        });

    // Respond with a success message upon successful course update
    res.status(200).json({
        message: "Course updated!",
    });
});

adminRouter.get("/course/bulk", adminMiddleware, async function(req, res) {
    // Get the adminId from the request object
    const adminId = req.adminId;

    // Find all the courses with given creatorId
    const courses = await courseModel.find({
        creatorId: adminId,
    });

    // Respond with the courses if they are found successfully
    res.json({
        message: "Course updated",
        courses: courses,
    });
});

module.exports = {
    adminRouter: adminRouter,
    adminModel: adminModel
}
