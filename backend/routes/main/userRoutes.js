const express = require('express');
const router = express.Router();
const { register, login, verifyCode, checkFriend, inviteFriend, getUserDetails, updateUserDetails, searchUsers, addContact, resendVerificationCode, forgotPassword, resetPassword, contact } = require('../../controllers/userController');

const auth = require('../../middlewares/requireAuth');

router.put('/users/:id', auth, updateUserDetails); 

//[S/19/146]
router.get('/users/:id', auth, getUserDetails); 
router.post('/users/register', register);
router.post('/users/login', login);
router.post('/users/verify-email', verifyCode);
router.post('/users/resend-code', resendVerificationCode);
router.post('/users/forgot-password', forgotPassword);
router.post('/users/reset-password/:token', resetPassword);
router.post('/friends/check', auth, checkFriend);
router.post('/friends/invite', auth, inviteFriend);
router.post('/users/search', auth, searchUsers);
router.post('/contacts/add', auth, addContact);
router.post("/contact", contact);


module.exports = router;
