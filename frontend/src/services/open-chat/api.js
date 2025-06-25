import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const uploadImage = async (file, userId) => {
    const imageRef = ref(getStorage(), `posts/${userId}/${Date.now()}_${file.name}`);
    await uploadBytes(imageRef, file);
    return getDownloadURL(imageRef);
  };


// Upload an image to Firebase Storage
export const uploadProfileImage = async (file, userId) => {
  const imageRef = ref(getStorage(), `profiles/${userId}/${Date.now()}_${file.name}`);
  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef);
};
  

export const fetchPostsByLocation = async (lat, lng) => {
  const response = await fetch("/api/posts/by-location", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat, lng }),
  });
  return response.json();
};



export const createPost = async (postData, token) => {
  try {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error response:", errorData);
      throw new Error(errorData.error || "Failed to create post");
    }

    return await response.json();
  } catch (error) {
    console.error("Client error creating post:", error.message || error);
    throw error; 
  }
};

export const editPost = async (postId, updatedData, token) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to edit post: ${errorText}`);
  }

  return response.json();
};



export const deletePost = async (postId, token) => {
  await fetch(`/api/posts/${postId}`, { 
    method: "DELETE" ,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Include the user's token for authentication
    },
  });
};

export const fetchShorts = async () => {
  const response = await fetch(`/api/shorts`);
  return response.json();
};

export const createShort = async (shortData) => {
  const response = await fetch(`/api/shorts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shortData),
  });
  return response.json();
};

export const deleteShort = async (shortId) => {
  await fetch(`/api/shorts/${shortId}`, { method: "DELETE" });
};


export const fetchUsersByLocation = async (lat, lng) => {
  const response = await fetch(`/api/users/by-location`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat, lng }),
  });
  return response.json();
};


// Fetch profile
export const fetchProfile = async (userId) => {
  const response = await fetch(`/api/profile/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json();
};


// Update profile
export const updateProfile = async (userId, profileData) => {
  const response = await fetch(`/api/profile/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error('Failed to update profile');
  return response.json();
};

export const fetchMyPosts = async (userId, token) => {
  const response = await fetch(`/api/profile/getMyPosts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user's posts");
  }

  return response.json();
};


export const fetchChats = async (token) => {
  const response = await fetch('/api/chats', {
      headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const startChat = async (participantId, token) => {
  const response = await fetch('/api/chats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ participantId }),
  });
  return response.json();
};

export const fetchMessages = async (chatId, token) => {
  const response = await fetch(`/api/chats/${chatId}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};


// Send a message
export const sendMessage = async (chatId, content, token) => {
  const response = await fetch(`/api/chats/${chatId}/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ content }),
  });
  return response.json();
};


export const toggleLike = async (postId, token) => {
  const response = await fetch('/api/posts/like', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ postId }),
  });

  if (!response.ok) {
    throw new Error('Failed to toggle like');
  }

  return response.json();
};


export const fetchPostById = async (postId) => {
  const response = await fetch(`/api/posts/${postId}`);
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
};