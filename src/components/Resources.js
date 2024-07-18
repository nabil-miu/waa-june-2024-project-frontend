import { useEffect, useState } from "react";
import resourceService from "../services/ResourceService";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState("");
  const [newResource, setNewResource] = useState({
    name: "",
    description: "",
  });
  const [updateResource, setUpdateResource] = useState({
    id: "",
    name: "",
    description: "",
  });
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
      await resourceService.deleteResource(id);
      setResources(resources.filter((resource) => resource.id !== id));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleCreateResource = async (e) => {
    e.prResourceDefault();
    setLoading(true);
    try {
      const response = await resourceService.createResource(newResource);
      setResources([...resources, response.data]);
      setNewResource({
        name: "",
        description: "",
      });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleUpdateResource = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await resourceService.updateResource(
        updateResource.id,
        updateResource
      );
      setResources(
        Resources.map((resource) =>
          resource.id === updateResource.id ? response.data : resource
        )
      );
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

      <h2>Create new Resource</h2>
      <form onSubmit={handleCreateResource}>
        <input
          type="text"
          placeholder="Resource name"
          value={newResource.name}
          onChange={(e) =>
            setNewResource({ ...newResource, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newResource.description}
          onChange={(e) =>
            setNewResource({ ...newResource, description: e.target.value })
          }
        />
        {/* <input
          type="file"
          placeholder="Upload file"
          value={newResource.url}
          onChange={(e) =>
            setNewResource({ ...newResource, url: e.target.value })
          }
        /> */}
        <button type="submit">Create</button>
      </form>

      {selectedResource && (
        <>
          <h2>Update Resource</h2>
          <form onSubmit={handleUpdateResource}>
            <input
              type="text"
              placeholder="Resource name"
              value={updateResource.name}
              onChange={(e) =>
                setUpdateResource({ ...updateResource, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Description"
              value={updateResource.description}
              onChange={(e) =>
                setUpdateResource({
                  ...updateResource,
                  description: e.target.value,
                })
              }
            />
            <button type="submit">Update</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Resources;
