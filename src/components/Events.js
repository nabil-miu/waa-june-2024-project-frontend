import React, { useState, useEffect } from "react";
import eventService from "../services/EventService";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    location: "",
    localDateTime: "",
  });
  const [updateEvent, setUpdateEvent] = useState({
    id: "",
    name: "",
    description: "",
    location: "",
    localDateTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await eventService.getAllEvents();
        setEvents(response.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const handleEventSelect = async (id) => {
    setLoading(true);
    eventService
      .getEventById(id)
      .then((response) => {
        setSelectedEvent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await eventService.createEvent(newEvent);
      setEvents([...events, response.data]);
      setNewEvent({
        name: "",
        description: "",
        location: "",
        localDateTime: "",
      });
      console.log(newEvent);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await eventService.updateEvent(
        updateEvent.id,
        updateEvent
      );
      setEvents(
        events.map((event) =>
          event.id === updateEvent.id ? response.data : event
        )
      );
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleDeleteEvent = async (id) => {
    setLoading(true);
    try {
      await eventService.deleteEvent(id);
      setEvents(events.filter((event) => event.id !== id));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Render your component with events, loading, error, and event handlers
  return (
    <div>
      <h1>Events</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <ul>
        {events.map((e) => (
          <li key={e.id} onClick={() => handleEventSelect(e.id)}>
            {e.name} <br />
            <br />
          </li>
        ))}
      </ul>
      {selectedEvent && (
        <div>
          <h2>{selectedEvent.name}</h2>
          <p>Description: {selectedEvent.description}</p>
          <p>Location: {selectedEvent.location}</p>
          <p>Date: {selectedEvent.localDateTime}</p>
          <button onClick={() => handleDeleteEvent(selectedEvent.id)}>
            Delete
          </button>
        </div>
      )}

      <h2>Create New Event</h2>
      <form onSubmit={handleCreateEvent}>
        <input
          type="text"
          placeholder="Event name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) =>
            setNewEvent({ ...newEvent, location: e.target.value })
          }
        />
        <input
          type="datetime-local"
          placeholder="Date & Time"
          value={newEvent.localDateTime}
          onChange={(e) =>
            setNewEvent({ ...newEvent, localDateTime: e.target.value })
          }
        />
        <button type="submit">Create</button>
      </form>
      {selectedEvent && (
        <>
          <h2>Update Event</h2>
          <form onSubmit={handleUpdateEvent}>
            <input
              type="text"
              placeholder="Event name"
              value={updateEvent.name}
              onChange={(e) =>
                setUpdateEvent({ ...updateEvent, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Description"
              value={updateEvent.description}
              onChange={(e) =>
                setUpdateEvent({ ...updateEvent, description: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Location"
              value={updateEvent.location}
              onChange={(e) =>
                setUpdateEvent({ ...updateEvent, location: e.target.value })
              }
            />
            <input
              type="datetime-local"
              placeholder="Date & Time"
              value={updateEvent.localDateTime}
              onChange={(e) =>
                setUpdateEvent({
                  ...updateEvent,
                  localDateTime: e.target.value,
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

export default Events;
