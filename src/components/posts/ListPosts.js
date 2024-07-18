import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostService from '../../services/PostService';

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    PostService.getPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    PostService.deletePost(id)
      .then((response) => {
        console.log('Post deleted successfully', response.data);
        fetchPosts(); // Refresh the list
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
        <Link to="/create-post">
        <button>Create New Post</button>
      </Link>
      <h2>Posts List:</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.content}
            <button onClick={() => navigate(`/update-post/${post.id}`)}>Update</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default ListPosts;