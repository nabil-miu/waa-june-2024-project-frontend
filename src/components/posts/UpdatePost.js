import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostService from '../../services/PostService';
import ResourceCategoryService from '../../services/ResourceCategoryService';

const UpdatePost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [content, setContent] = useState('');
  const [threadPostId, setThreadPostId] = useState(null); // New state to hold threadPost ID
  const [threadPostTitle, setThreadPostTitle] = useState('');
  const [threadPostCategoryId, setThreadPostCategoryId] = useState('');
//   const [threadPostUserId] = useState(1);
//   const [parentPostId] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch resource categories
    ResourceCategoryService.getResourceCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching resource categories:', error);
      });

    // Fetch the post details
    PostService.getPost(id)
      .then((response) => {
        const post = response.data;
        setContent(post.content);
        setThreadPostId(post.threadPost.id);
        setThreadPostTitle(post.threadPost.title);
        setThreadPostCategoryId(post.threadPost.resourceCategory.id);
     //   setThreadPostUserId(post.threadPost.user.id);
      //  setParentPostId(post.parentPost ? post.parentPost.id : '');
      })
      .catch((error) => {
        console.error('Error fetching post details:', error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const post = {
      id,
      content,
      threadPost: {
        id: threadPostId,
        title: threadPostTitle,
        resourceCategory: {
          id: threadPostCategoryId,
        },
        user: {
          id: 1,
        },
      },
      parentPost:{ id: null },
    };

    PostService.updatePost(id,post)
      .then((response) => {
        console.log('Post updated successfully', response.data);
        navigate('/list-posts'); // Navigate to list page
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Post</h2>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <h2>Update Thread Post</h2>
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
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdatePost;