import axios from "axios";
import { useEffect, useState } from "react";

export default function Events() {
    const eventList = [];
    const [eventState, setEventState] = useState(eventList);

    const getAllEvents = async () => {
        const result = await axios.get("http://localhost:8080/events");
        setEventState(result.data);
    };

    useEffect(() => {
        getAllEvents();
    }, []);

    return (
        <div>
            {eventState.map((event) => {
                return (
                    
                );
            })}
        </div>
    );
}