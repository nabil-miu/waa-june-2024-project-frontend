import { useEffect, useState } from "react";
import resourceService from "../services/ResourceService";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const response = await resourceService.getAllResources();
        setResources(response.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchResources();
  }, []);

  const handleResourceSelect = async (id) => {
    setLoading(true);
    resourceService
      .getResourceById(id)
      .then((response) => {
        setSelectedResource(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleDeleteResource = async (id) => {
    setLoading(true);
    try {
      await resourceService.deleteresource(id);
      setResources(resources.filter((resource) => resource.id !== id));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Resources</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <ul>
        {resources.map((resource) => (
          <li
            key={resource.id}
            onClick={() => handleResourceSelect(resource.id)}
          >
            {resource.name} <br />
            <br />
          </li>
        ))}
      </ul>
      {selectedResource && (
        <div>
          <h2>{selectedResource.name}</h2>
          <p>Description: {selectedResource.description}</p>
          <button onClick={() => handleDeleteResource(selectedResource.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Resources;
