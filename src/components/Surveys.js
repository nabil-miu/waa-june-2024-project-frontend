import React, { useEffect, useState } from 'react';
import surveyService from '../services/SurveyService';

const Surveys = () => {
    const [surveys, setSurveys] = useState([]);
    const [activeSurveys, setActiveSurveys] = useState([]);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newSurvey, setNewSurvey] = useState({
        title: '',
        description: '',
        createdAt: '',
        expiredAt: '',
        isActive: false,
        surveyQuestions: [],
        surveyResponses: []
    });
    const [updateSurvey, setUpdateSurvey] = useState({
        id: '',
        title: '',
        description: '',
        createdAt: '',
        expiredAt: '',
        isActive: false,
        surveyQuestions: [],
        surveyResponses: []
    });
    const [showActiveSurveys, setShowActiveSurveys] = useState(false);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const response = await surveyService.getAllSurveys();
                setSurveys(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchActiveSurveys = async () => {
            try {
                const response = await surveyService.getActiveSurveys();
                setActiveSurveys(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchSurveys();
        fetchActiveSurveys();
    }, []);

    const handleSurveySelect = async (id) => {
        setLoading(true);
        try {
            const response = await surveyService.getSurveyById(id);
            setSelectedSurvey(response.data);
            setUpdateSurvey(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSurveyCreate = async (event) => {
        event.preventDefault();
        try {
            const response = await surveyService.createSurvey(newSurvey);
            console.log(response.data);
            setSurveys([...surveys, response.data]);
            if (response.data.isActive) {
                setActiveSurveys([...activeSurveys, response.data]);
            }
            setNewSurvey({
                title: '',
                description: '',
                createdAt: '',
                expiredAt: '',
                isActive: false,
                surveyQuestions: [],
                surveyResponses: []
            });
        } catch (error) {
            setError(error);
            console.error("Error creating survey:", error.response.data);
        }
    };

    const handleSurveyUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await surveyService.updateSurvey(updateSurvey.id, updateSurvey);
            setSurveys(surveys.map(s => (s.id === updateSurvey.id ? response.data : s)));
            if (updateSurvey.isActive) {
                setActiveSurveys(activeSurveys.map(s => (s.id === updateSurvey.id ? response.data : s)));
            }
            setSelectedSurvey(response.data);
        } catch (error) {
            setError(error);
        }
    };

    const handleSurveyDelete = async (id) => {
        try {
            await surveyService.deleteSurvey(id);
            setSurveys(surveys.filter(s => s.id !== id));
            setActiveSurveys(activeSurveys.filter(s => s.id !== id));
        } catch (error) {
            setError(error);
        }
    };

    const toggleActiveSurveys = () => {
        setShowActiveSurveys(!showActiveSurveys);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Surveys</h1>
            <button onClick={toggleActiveSurveys}>
                {showActiveSurveys ? 'Show All Surveys' : 'Show Active Surveys'}
            </button>
            <ul>
                {(showActiveSurveys ? activeSurveys : surveys).map(survey => (
                    <li key={survey.id} onClick={() => handleSurveySelect(survey.id)}>
                        {survey.title}
                    </li>
                ))}
            </ul>
            {selectedSurvey && (
                <div>
                    <h2>{selectedSurvey.title}</h2>
                    <p>Description: {selectedSurvey.description}</p>
                    <p>Created At: {selectedSurvey.createdAt}</p>
                    <p>Expired At: {selectedSurvey.expiredAt}</p>
                    <p>Active: {selectedSurvey.isActive ? 'Yes' : 'No'}</p>
                    <button onClick={() => handleSurveyDelete(selectedSurvey.id)}>Delete</button>
                </div>
            )}
            <h2>Create New Survey</h2>
            <form onSubmit={handleSurveyCreate}>
                <input
                    type="text"
                    placeholder="Title"
                    value={newSurvey.title}
                    onChange={(e) => setNewSurvey({ ...newSurvey, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newSurvey.description}
                    onChange={(e) => setNewSurvey({ ...newSurvey, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Created At"
                    value={newSurvey.createdAt}
                    onChange={(e) => setNewSurvey({ ...newSurvey, createdAt: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Expired At"
                    value={newSurvey.expiredAt}
                    onChange={(e) => setNewSurvey({ ...newSurvey, expiredAt: e.target.value })}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={newSurvey.isActive}
                        onChange={(e) => setNewSurvey({ ...newSurvey, isActive: e.target.checked })}
                    />
                    Active
                </label>
                <button type="submit">Create Survey</button>
            </form>
            {selectedSurvey && (
                <>
                    <h2>Update Survey</h2>
                    <form onSubmit={handleSurveyUpdate}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={updateSurvey.title}
                            onChange={(e) => setUpdateSurvey({ ...updateSurvey, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={updateSurvey.description}
                            onChange={(e) => setUpdateSurvey({ ...updateSurvey, description: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Created At"
                            value={updateSurvey.createdAt}
                            onChange={(e) => setUpdateSurvey({ ...updateSurvey, createdAt: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Expired At"
                            value={updateSurvey.expiredAt}
                            onChange={(e) => setUpdateSurvey({ ...updateSurvey, expiredAt: e.target.value })}
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={updateSurvey.isActive}
                                onChange={(e) => setUpdateSurvey({ ...updateSurvey, isActive: e.target.checked })}
                            />
                            Active
                        </label>
                        <button type="submit">Update Survey</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Surveys;
