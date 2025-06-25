const express = require('express');
const { getPostsByLatLng, createPost, editPost, deletePost, getMyPost, toggleLike, getPostById } = require('../../../controllers/services/chat/postController');
const { createShort, getShorts, deleteShort } = require('../../../controllers/services/chat/shortController');
const { getChats, startChat, getMessages, sendMessage } = require('../../../controllers/services/chat/chatController');
const { getProfile, updateProfile } =require('../../../controllers/services/chat/profileController');
const auth = require('../../../middlewares/requireAuth');
const router = express.Router();

router.post('/posts/by-location', getPostsByLatLng);
router.post('/posts', auth, createPost);
router.put('/posts/:postId', auth, editPost);
router.delete('/posts/:postId', auth, deletePost);


router.get('/shorts', getShorts);
router.post('/shorts', createShort);
router.delete('/shorts/:shortId', deleteShort);

router.get('/chats/', auth, getChats);
router.post('/chats/', auth, startChat);
router.get('/chats/:chatId/messages', auth, getMessages);
router.post('/chats/:chatId/send', auth, sendMessage);

router.get('/profile/:userId', getProfile);
router.put('/profile/:userId',  updateProfile);

router.post("/profile/getMyPosts", auth, getMyPost);


router.post('/posts/like', auth, toggleLike);

router.get('/posts/:postId', getPostById);


  
  module.exports = router;  


module.exports = router;
