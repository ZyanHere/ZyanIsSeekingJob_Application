import { asyncHandler } from "../middleswares/asyncHandler.js";
import ErrorHandler from "../middleswares/error.js";
import { Job } from "../models/jobSchema.js";

export const getAllJobs = asyncHandler(async(req, res, next) => {
    const jobs = await job.find({expired: false})
    res.status(200)
    .json({
        success:true,
        jobs
    })
})

export const postJob = asyncHandler(async(req, res, next) => {
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(
            new ErrorHandler("Job Seeker is not allowed to access this resource!, 400")
        )
    }
    const {title, description, catagory, country, city, locaton, fixedSalary, salaryFrom, salaryTo} = req.body;

    if(!title || !description || !catagory || !country || !city || !locaton){
        return next(new ErrorHandler("Please provide all data", 400))
    }
    if(!salaryFrom || !salaryTo || !fixedSalary){
        return next(
            new ErrorHandler("please either provide fixed salary or ranged salary")
        )
    }

    if(salaryFrom && salaryTo && fixedSalary){
        return next(
            new ErrorHandler("please either provide fixed salary or ranged salary")
        )
    }

    const postedBy = req.user._id;
    const job = await Job.create({
        title, description, catagory, country, city, locaton, fixedSalary, salaryFrom, salaryTo, postedBy
    })

    res.status(200)
    .json({
        success: true,
        message: "job posted successfully",
        job
    })
})

export const getmyJobs  = asyncHandler(async(req, res, next) => {
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(
            new ErrorHandler("Job Seeker is not allowed to access this resource!, 400")
        )
    }

    const myjobs = await Job.find({postedBy: req.user._id});
    res.status(200)
    .json({
        success:true,
        myjobs
    })
})

export const updateJobs  = asyncHandler(async(req, res, next) => {
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(
            new ErrorHandler("Job Seeker is not allowed to access this resource!, 400")
        )
    }
    const {id} = req.params;
    let job = await Job.findById(id);
    if (!jobs) {
        return next(
            new ErrorHandler(
                "oops, job not found",
                404
            )
        )
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new : true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200)
    .json({
        success: true,
        job,
        message: "job updated successfully!"

    })
})

export const deletejobs  = asyncHandler(async(req, res, next) => {
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(
            new ErrorHandler("Job Seeker is not allowed to access this resource!, 400")
        )
    }
    const {id} = req.params;
    let job = await Job.findById(id);
    if (!jobs) {
        return next(
            new ErrorHandler(
                "oops, job not found",
                404
            )
        )
    }
    await job.deleteOne()
    res.status(200)
    .json({
        success: true,
        job,
        message: "job deleted successfully!"

    })
})

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
      const job = await Job.findById(id);
      if (!job) {
        return next(new ErrorHandler("Job not found.", 404));
      }
      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
  });