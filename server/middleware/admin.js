const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

// Define the adminMiddleware function to verify the admin token
function adminMiddleware(req, res, next) {
    const token = req.headers.token;

    // Use a try-catch block to handle errors that may occur during token verification
    try {
        const verified = jwt.verify(token, JWT_ADMIN_PASSWORD);

        // Set the adminId in the request object from the decoded token for later use
        req.adminId = verified.id;
        next();
    } catch (e) {
        return res.status(403).json({
            message: "You are not signed in!",
        });
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}
