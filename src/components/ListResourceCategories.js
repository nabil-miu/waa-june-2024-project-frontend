import React, {useEffect, useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import ResourceCategoryService from '../services/ResourceCategoryService';

const ListResourceCategories = () => {
    const [resourceCategories, setResourceCategories] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetchResourceCategories();
    }, []);
  
    const fetchResourceCategories = () => {
      ResourceCategoryService.getResourceCategories()
        .then((response) => {
          setResourceCategories(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    const handleDelete = (id) => {
      ResourceCategoryService.deleteResourceCategory(id)
        .then((response) => {
          console.log('ResourceCategory deleted successfully', response.data);
          fetchResourceCategories(); // Refresh the list
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    return (
      <div>
        <h2>Resource Categories</h2>
        <ul>
          {resourceCategories.map((category) => (
            <li key={category.id}>
              {category.name}
              <button onClick={() => navigate(`/update-resource-category/${category.id}`)}>Update</button>
              <button onClick={() => handleDelete(category.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <Link to="/create-resource-category">
          <button>Create New Resource Category</button>
        </Link>
      </div>
    );
  };

  export default ListResourceCategories;