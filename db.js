const { Schema, default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(" Connected to MongoDB");
    } catch (err) {
        console.error(" MongoDB connection error:", err.message);
        process.exit(1);
    }
};

const userSchema = new Schema({
    userId: ObjectId,
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});

const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});

const courseSchema = new Schema({
    userId: ObjectId,
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
});

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId,
});


const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
    connectDB,
};
