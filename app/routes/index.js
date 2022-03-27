// routes
const touristicAreasRoute = require("./touristicAreas.route");
const authRoute = require("./auth.route");
const usersRoute = require("./users.route");
const rolesRoute = require("./roles.routes");
const typesTouristAreaRoute = require("./typesTouristArea.route");
const uploadController = require("../controllers/upload.controller");

// <iddlewares
const authMiddleware = require("../middlewares/auth.middleware");
const resourceMiddleware = require("../middlewares/resource.middleware");
const paramMiddleware = require("../middlewares/param.middleware");

// Imports
let express = require('express');
let router = express();

router.use('/auth', authRoute);
router.use('/upload', uploadController.upload);
router.use('/touristic-areas', resourceMiddleware("Touristic Areas"), paramMiddleware, touristicAreasRoute);
router.use('/types-tourist-area', resourceMiddleware("Type Tourist Area"), paramMiddleware, typesTouristAreaRoute);
router.use('/users', resourceMiddleware("Users"), paramMiddleware, authMiddleware, usersRoute);
router.use('/roles', resourceMiddleware("Roles"), paramMiddleware, authMiddleware, rolesRoute);


module.exports = router;