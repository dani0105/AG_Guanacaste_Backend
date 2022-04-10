// routes
const touristicAreasRoute = require("./touristicAreas.route");
const authRoute = require("./auth.route");
const usersRoute = require("./users.route");
const rolesRoute = require("./roles.routes");
const typesTouristAreaRoute = require("./typesTouristArea.route");
const activitiesRoute = require("./activities.route");
const difficultiesRoute = require("./difficulties.route");
const accessibilitiesRoute = require("./accessibilities.route");
const activityTypesRoute = require("./activityTypes.route");
const educationProgramRoute = require("./education_program.route");
const educationProgramTypesRoute = require("./education_program_type.route");

// controllers
const uploadController = require("../controllers/upload.controller");

// <iddlewares
const authMiddleware = require("../middlewares/auth.middleware");
const resourceMiddleware = require("../middlewares/resource.middleware");
const paramMiddleware = require("../middlewares/param.middleware");

// Imports
let express = require('express');
let router = express();

router.use(paramMiddleware);

router.use('/auth', authRoute);
router.use('/upload', uploadController.upload);

router.use('/touristic-areas', touristicAreasRoute);
router.use('/types-tourist-area', resourceMiddleware("Type Tourist Area"), authMiddleware, typesTouristAreaRoute);

router.use('/activities', activitiesRoute);
router.use('/difficulties', resourceMiddleware("Difficulties"), authMiddleware, difficultiesRoute);
router.use('/accessibilities', resourceMiddleware("Accessibilities"), authMiddleware, accessibilitiesRoute);
router.use('/activity-types', resourceMiddleware("Activity Types"), authMiddleware, activityTypesRoute);

router.use('/education-programs', educationProgramRoute);
router.use('/education-program-types', resourceMiddleware("Education Program Types"), authMiddleware, educationProgramTypesRoute);

router.use('/users', resourceMiddleware("Users"), authMiddleware, usersRoute);
router.use('/roles', resourceMiddleware("Roles"), authMiddleware, rolesRoute);


module.exports = router;