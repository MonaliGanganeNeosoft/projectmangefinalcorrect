const ProjectDetail = require("../models/projectDetailsModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const cloudinary = require("cloudinary");
const ProjectDetailAdmin = require("../models/projectAdminModel");
//create all tab for project
exports.createProjectDetail = catchAsyncErrors(async (req, res, next) => {
  const projectDetail = await ProjectDetail.create(req.body);
  res.status(201).json({
    success: true,
    projectDetail,
  });
});
//get all project details for all tab
exports.getAllProjectDetails = catchAsyncErrors(async (req, res) => {
  const projectDetails = await ProjectDetail.find();
  res.status(200).json({
    success: true,
    projectDetails,
  });
});

//get single Project Details=>all tab
exports.getProjectDetails = catchAsyncErrors(async (req, res, next) => {
  const projectDetail = await ProjectDetail.findById(req.params.id);

  if (!projectDetail) {
    return next(new ErrorHander("Project not found", 404));
  }
  res.status(200).json({
    success: true,
    projectDetail,
  });
});
//GET ALL PRODJECT (ADMIN) ===>for creating
exports.creategetAdminAllProjectDetails = catchAsyncErrors(async (req, res) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  const projectAdminDetailsAll = await ProjectDetailAdmin.create(req.body);
  res.status(200).json({
    success: true,
    projectAdminDetailsAll,
  });
});
exports.getAdminAllprojectDetailsall = catchAsyncErrors(async (req, res) => {
  const projectAdminDetailsAll = await ProjectDetailAdmin.find();
  res.status(200).json({
    success: true,
    projectAdminDetailsAll,
  });
});


//UpdateAdmin Project Details
exports.updateAdminProjectDetail = catchAsyncErrors(async (req, res, next) => {
  let projectAdminDetailsAll = await ProjectDetailAdmin.findById(req.params.id);

  if (!projectAdminDetailsAll) {
    return next(new ErrorHander("Project not found", 404));
  }

  projectAdminDetailsAll = await ProjectDetailAdmin.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    projectAdminDetailsAll,
  });
});

//delete Admin project
exports.deleteAdminProject = catchAsyncErrors(async (req, res, next) => {
  const projectAdminDetailsAll = await ProjectDetailAdmin.findById(
    req.params.id
  );
  if (!projectAdminDetailsAll) {
    return next(new ErrorHander("Project not found", 404));
  }

  await projectAdminDetailsAll.remove();
  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});
