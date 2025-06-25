const Post = require('../../../models/services/chat/Post');

exports.getMyPost = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error." });
  }
}



exports.getPostsByLatLng = async (req, res) => {
  const { lat, lng, maxDistance = 50 } = req.body;

  try {
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const posts = await Post.find({
      'location.lat': { $gte: lat - 0.5, $lte: lat + 0.5 },
      'location.lng': { $gte: lng - 0.5, $lte: lng + 0.5 },
    }).populate('userId', 'firstName lastName profilePic').sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts by lat/lng:', error);
    res.status(500).json({ error: 'Failed to fetch posts by location' });
  }
};




exports.createPost = async (req, res) => {
  const { userId, content, image, location } = req.body;

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  if (!content || !location || !location.name || !location.lat || !location.lng) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const post = await Post.create({
      userId: userId,
      content,
      image,
      location,
    });

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ error: "Failed to create post" });
  }
};



exports.editPost = async (req, res) => {
  const { postId } = req.params;
  const { content, image } = req.body;

  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You are not authorized to edit this post" });
    }

    post.content = content || post.content;
    post.image = image || post.image;
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error editing post:", error.message);
    res.status(500).json({ error: "Failed to edit post" });
  }
};


exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};


exports.toggleLike = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ likes: post.likes, isLiked: !isLiked });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
}


exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('userId');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Server error' });
  }
}