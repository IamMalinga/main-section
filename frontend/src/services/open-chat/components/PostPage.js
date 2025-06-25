// src/components/PostPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post';
import { fetchPostById } from '../api';

const PostPage = () => {
  const { postId } = useParams(); // Get postId from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await fetchPostById(postId);
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {post && <Post post={post} onCommentClick={() => {}} />}
    </div>
  );
};

export default PostPage;
