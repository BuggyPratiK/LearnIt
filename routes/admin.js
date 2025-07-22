const { Router } = require("express");
const { adminModel } = require("../db")
const adminRouter = Router();
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

    //Hash the user's password using bcrypt with a salt rounds of 5
    const hashedPassword = await bcrypt.hash(password, 5)

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

adminRouter.get("/signin", async function(req, res) {

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

adminRouter.get("/course", function(req, res) {
    res.json({
        message: " "
    })
})

adminRouter.post("/course", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post("/course/bulk", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter,
    adminModel: adminModel
}
