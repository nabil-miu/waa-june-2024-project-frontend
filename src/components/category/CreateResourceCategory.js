import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResourceCategoryService from "../../services/ResourceCategoryService";


const CreateResourceCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parent] = useState(1);
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const resourceCategory = { name, description, parent: parent ? { id: parent } : null };
      ResourceCategoryService.createResourceCategory(resourceCategory)
        .then((response) => {
          console.log('ResourceCategory created successfully', response.data);
          navigate('/list-resource-category'); // Navigate to list page
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Create Resource Category</h2>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    );
  };
  
  export default CreateResourceCategory;