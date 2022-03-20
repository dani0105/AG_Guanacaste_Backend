// routes
const authRoute = require("./auth");
const touristicAreasRoute = require("./touristicAreas");
const usersRoute = require("./users");

const authMiddleware = require("../middlewares/authMiddleware");
const resourceMiddleware = require("../middlewares/resourceMiddleware");

//imports
let express = require('express');
let router = express();

router.use('/auth', authRoute);
router.use('/touristic-areas', resourceMiddleware("Touristic Areas"), touristicAreasRoute);
router.use('/users', resourceMiddleware("Users"), authMiddleware, usersRoute);

module.exports = router;