import { useEffect, useState } from "react";
import resourceService from "../services/ResourceService";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState("");
  const [updateResource, setUpdateResource] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

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

  const handleDownloadResource = async (name) => {
    setLoading(true);
    try {
      await resourceService.getFile(name);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleCreateResource = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setUploadStatus("Uploading...");
      await resourceService.uploadFile(file);
      setUploadStatus("Upload successful!");
    } catch (err) {
      setUploadStatus("Upload failed!");
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
          <br />
          <br />
          <button onClick={() => handleDownloadResource(selectedResource.name)}>
            Download
          </button>
        </div>
      )}

      <h2>Create new Resource</h2>
      <form onSubmit={handleCreateResource}>
        <input
          type="file"
          placeholder="Upload file"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={!file}>
          Upload
        </button>
        <p>{uploadStatus}</p>
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
