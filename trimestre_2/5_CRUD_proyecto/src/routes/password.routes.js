const { Router } = require('express');
const router = Router();
// Import the password controller
const { setPassword, updatePassword } = require('../controllers/password.controller');

// Define the routes for the password controller
router.post('/set/:id', setPassword);

router.put('/update/:id', updatePassword);


// Export the router
module.exports = router;
