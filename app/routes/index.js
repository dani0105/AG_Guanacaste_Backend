// routes
const touristicAreasRoute = require("./touristicAreas.route");
const authRoute = require("./auth.route");
const usersRoute = require("./users.route");

// <iddlewares
const authMiddleware = require("../middlewares/auth.middleware");
const resourceMiddleware = require("../middlewares/resource.middleware");

// Imports
let express = require('express');
let router = express();

router.use('/auth', authRoute);
router.use('/touristic-areas', resourceMiddleware("Touristic Areas"), touristicAreasRoute);
router.use('/users', resourceMiddleware("Users"), authMiddleware, usersRoute);

module.exports = router;