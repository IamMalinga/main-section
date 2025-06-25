const Profile = require('../../../models/services/chat/Profile');
const User = require('../../../models/User');


exports.getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.params.userId });

    if (!profile) {
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(404).json({ error: 'User not found' });

      profile = await Profile.create({
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: '', 
        gender: user.gender,
        address: user.address,
        profilePic: user.profilePic,
        banner: '', 
        socialLinks: { facebook: '', twitter: '', linkedin: '' }, 
      });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error fetching/creating profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProfile) return res.status(404).json({ error: 'Profile not found' });

    res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
