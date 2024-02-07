import mongoose, { model } from "mongoose"

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a job title!"],
        minLength: [3, "Title must contain at least 3 Characters!"],
        maxLength: [30, "Title cannot exceed 30 Characters!"],
    },
    description: {
        type: String,
        required: [true, "Please eprovide job description!"],
        minLength: [30, "description must contain at least 30 Characters!"],
        maxLength: [350, "description cannot exceed 350 Characters!"],
    },
    catagory: {
        type: String,
        required: [true, "jobcatagory is required!"],
    },
    country: {
        type: String,
        required: [true, "job country is required!"],
    },
    city: {
        type: String,
        required: [true, "job city is required!"],
    },
    location: {
        type: String,
        required: [true, "please provide exact location!"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "fixed salary must contain atleast 4 digits!"],
        maxLength: [8, "fixed salary cannot exceed 8 digits"]
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "salary must contain atleast 4 digits!"],
        maxLength: [8, "salary cannot exceed 8 digits"]
    },
    salaryTo: {
        type: Number,
        minLength: [4, "salaryTo must contain atleast 4 digits!"],
        maxLength: [8, "salaryTo cannot exceed 8 digits"]
    },
    expired: {
        type: Boolean,
        dafault: false
    },
    jobPostedOn: {
        type: Date,
        dafault: Date.now()
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

})

export const Job = mongoose.model("Job", jobSchema)