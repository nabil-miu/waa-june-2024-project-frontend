import React, { useEffect, useState } from 'react';
import surveyService from '../services/SurveyService';

const Surveys = () => {
    const [surveys, setSurveys] = useState([]);
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
    const [newQuestion, setNewQuestion] = useState('');
    const [newResponse, setNewResponse] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = () => {
        surveyService.getAllSurveys()
            .then(response => {
                setSurveys(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    const handleSurveySelect = (id) => {
        setLoading(true);
        surveyService.getSurveyById(id)
            .then(response => {
                setSelectedSurvey(response.data);
                setUpdateSurvey(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    const handleSurveyCreate = async (event) => {
        event.preventDefault();
        try {
            console.log(newSurvey)
            const response = await surveyService.createSurvey(newSurvey);
           // setSurveys([...surveys, response.data]);
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
            setSelectedSurvey(response.data);
        } catch (error) {
            setError(error);
            console.error("Error updating survey:", error.response.data);
        }
    };

    const handleSurveyDelete = (id) => {
        surveyService.deleteSurvey(id)
            .then(() => {
                setSurveys(surveys.filter(s => s.id !== id));
            })
            .catch(error => setError(error));
    };

    const handleFetchActiveSurveys = () => {
        setLoading(true);
        surveyService.activeSurvey()
            .then(response => {
                setSurveys(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    const addQuestionToSurvey = () => {
        const newQuestionObject = {
            question: newQuestion,
            questionType: 'TEXT', // Assuming a default type for simplicity
            answers: [], // Initialize answers array
            responses: [] // Initialize responses array
        };
        setNewSurvey(prevSurvey => ({
            ...prevSurvey,
            surveyQuestions: [...prevSurvey.surveyQuestions, newQuestionObject]
        }));
        setNewQuestion(''); // Clear input after adding question
    };

    const handleDeleteQuestion = (questionId) => {
        setNewSurvey(prevSurvey => ({
            ...prevSurvey,
            surveyQuestions: prevSurvey.surveyQuestions.filter(q => q.id !== questionId)
        }));
    };

    const addResponseToQuestion = () => {
        const newResponseObject = {
            answer: newResponse,
            response: 'A', // Example response type, adjust as needed
        };
        setSelectedQuestion(prevQuestion => ({
            ...prevQuestion,
            responses: [...prevQuestion.responses, newResponseObject]
        }));
        setNewResponse(''); // Clear input after adding response
    };

    const handleDeleteResponse = (responseId) => {
        setSelectedQuestion(prevQuestion => ({
            ...prevQuestion,
            responses: prevQuestion.responses.filter(r => r.id !== responseId)
        }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Surveys</h1>
            <button onClick={handleFetchActiveSurveys}>Fetch Active Surveys</button>
            <ul>
                {surveys.map(survey => (
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
                    type="date"
                    placeholder="Created At"
                    value={newSurvey.createdAt}
                    onChange={(e) => setNewSurvey({ ...newSurvey, createdAt: e.target.value })}
                />
                <input
                    type="date"
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
                            type="date"
                            placeholder="Created At"
                            value={updateSurvey.createdAt}
                            onChange={(e) => setUpdateSurvey({ ...updateSurvey, createdAt: e.target.value })}
                        />
                        <input
                            type="date"
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
            {selectedSurvey && (
                <>
                    <h2>Add Question to Survey</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Question"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                        />
                        <button onClick={addQuestionToSurvey}>Add Question</button>
                    </form>
                    {selectedSurvey.surveyQuestions.map(question => (
                        <div key={question.id}>
                            <h3>{question.question}</h3>
                            <ul>
                                {question.answers.map(answer => (
                                    <li key={answer.id}>{answer.description}</li>
                                ))}
                            </ul>
                            <button onClick={() => handleDeleteQuestion(question.id)}>Delete Question</button>
                        </div>
                    ))}
                </>
            )}
            {selectedQuestion && (
                <>
                    <h2>Add Response to Question</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Response"
                            value={newResponse}
                            onChange={(e) => setNewResponse(e.target.value)}
                        />
                        <button onClick={addResponseToQuestion}>Add Response</button>
                    </form>
                    {selectedQuestion.responses.map(response => (
                        <div key={response.id}>
                            <p>{response.answer}</p>
                            <button onClick={() => handleDeleteResponse(response.id)}>Delete Response</button>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default Surveys;
