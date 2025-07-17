const { Router } = require("express");
const userRouter = Router();


userRouter.post("/signup", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

userRouter.get("/signin", function(req, res) {
    res.json({
        message: " "
    })
})

userRouter.get("/purchases", function(req, res) {
    res.json({
        message: " "
    })
})

module.exports = {
    userRouter: userRouter
}