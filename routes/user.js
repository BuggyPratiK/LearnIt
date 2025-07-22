const { Router } = require("express");

// Create a new instance of the Router for defining user-related routes
const userRouter = Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const z = require("zod");
const { userModel } = require("../db");

const { JWT_USER_PASSWORD } = require("../config")

userRouter.post("/signup", async function(req, res) {

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

    //Hash the user's password using bcrypt with a salt rounds of 5
    const hashedPassword = await bcrypt.hash(password, 5)

    // Creating a new user in the database 
    try {
        // Create a new user entry with the provided email, hashed password, firstName,lastName
        await userModel.create({
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

userRouter.get("/signin", async function(req, res) {
    const requireBody = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    });

    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if (!parseDataWithSuccess) {
        return res.json({
            message: "Incorrect data format",
            error: parseDataWithSuccess.error,
        });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email,
    });

    if (!user) {
        return res.status(403).json({
            message: "Invalid credentials",
        });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (passwordMatched) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);

        res.json({
            token: token,
        });
    } else {
        res.status(403).json({
            message: "Invalid Credentials!"
        });
    }
})

userRouter.get("/purchases", function(req, res) {
    res.json({
        message: " "
    })
})

module.exports = {
    userRouter: userRouter
}
