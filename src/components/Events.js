import React, { useState, useEffect } from "react";
import eventService from "./eventService";

const EventComponent = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});
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

  const handleCreateEvent = async (newEvent) => {
    setLoading(true);
    try {
      const response = await eventService.createEvent(newEvent);
      setEvents([...events, response.data]);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleUpdateEvent = async (id, updatedEvent) => {
    setLoading(true);
    try {
      const response = await eventService.updateEvent(id, updatedEvent);
      setEvents(
        events.map((event) => (event.id === id ? response.data : event))
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
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {/* Render events */}
      {/* Form to create a new event */}
      {/* Form to update an existing event */}
      {/* Button to delete an event */}
    </div>
  );
};

export default EventComponent;
