import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResourceCategoryService from "../../services/ResourceCategoryService";

const UpdateResourceCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parent, setParent] = useState(1);

    useEffect(() => {
      ResourceCategoryService.getResourceCategory(id)
        .then((response) => {
          setName(response.data.name);
          setDescription(response.data.description);
          setParent(response.data.parent ? response.data.parent.id : null);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [id]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const resourceCategory = { name, description, parent: parent ? { id: parent } : null };
      ResourceCategoryService.updateResourceCategory(id, resourceCategory)
        .then((response) => {
          console.log('ResourceCategory updated successfully', response.data);
          navigate('/list-resource-category'); // Navigate back to the list page
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Update Resource Category</h2>
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
        {/* <div>
          <label>Parent Category ID</label>
          <input
            type="number"
            value={parent}
            onChange={(e) => setParent(e.target.value ? e.target.value : null)}
          />
        </div> */}
        <button type="submit">Update</button>
      </form>
    );
  };
  
  export default UpdateResourceCategory;