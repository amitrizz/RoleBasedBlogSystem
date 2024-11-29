import mongoose from "mongoose";

// Define the Blog Schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'user', // Name of the User model
        required: true,
    },
    state: {
        type: String,
        enum: ['under review', 'rejected', 'published'], // Valid states
        default: 'under review', // Default state is 'under review'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Blog Model
const BlogModel = mongoose.model("blog", blogSchema);

export default BlogModel;
