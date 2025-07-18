const { Router } = require("express");
const { adminModel } = require("../db")
const adminRouter = Router();

adminRouter.post("/signup", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.get("/signin", function(req, res) {
    res.json({
        message: " "
    })
})

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