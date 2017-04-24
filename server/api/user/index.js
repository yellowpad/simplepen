var express = require('express'),
	userAPI = require('./user.controller'),
	authService = require('../../auth/auth.service'),
  	router = express.Router();


router.route('/me').post(authService.ensureAuthenticated, userAPI.me);
router.route('/edit').post(userAPI.editUserProfile);

module.exports = router;