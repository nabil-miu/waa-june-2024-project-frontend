import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostService from '../../services/PostService';
import ResourceCategoryService from '../../services/ResourceCategoryService';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [threadPostTitle, setThreadPostTitle] = useState('');
  const [threadPostCategoryId, setThreadPostCategoryId] = useState('');
//   const [threadPostUserId, setThreadPostUserId] = useState('');
//   const [parentPostId, setParentPostId] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ResourceCategoryService.getResourceCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching resource categories:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const post = {
      content,
      threadPost: {
        title: threadPostTitle,
        resourceCategory: {
          id: threadPostCategoryId,
        },
        user: {
          id: 1,
        },
      },
      parentPost: { id: null },
    };

    PostService.createPost(post)
      .then((response) => {
        console.log('Post created successfully', response.data);
        navigate('/list-posts'); // Navigate to list page
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <h2>Create Thread Post</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={threadPostTitle}
          onChange={(e) => setThreadPostTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Resource Category</label>
        <select
          value={threadPostCategoryId}
          onChange={(e) => setThreadPostCategoryId(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreatePost;