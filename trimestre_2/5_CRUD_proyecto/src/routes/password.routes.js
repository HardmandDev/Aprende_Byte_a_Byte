const { Router } = require('express');
const router = Router();
// Import the password controller
const passwordController = require('../controllers/password.controller');

// Define the routes for the password controller
router.post('/reset', passwordController.setPassword);

router.put('/update', passwordController.updatePassword);


// Export the router
module.exports = router;
