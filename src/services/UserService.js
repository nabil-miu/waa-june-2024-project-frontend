import axiosInstance from '../AxiosConfig';

const surveyService = {
    createSurvey: (survey) => axiosInstance.post(`/surveys`, survey),
    getAllSurveys: () => axiosInstance.get('/surveys/all'),
    getSurveyById: (id) => axiosInstance.get(`/surveys/${id}`),
    updateSurvey: (id, survey) => axiosInstance.put(`/surveys/${id}`, survey),
    deleteSurvey: (id) => axiosInstance.delete(`/surveys/${id}`),
    getActiveSurveys: () => axiosInstance.get('/surveys/active'),
};

export default surveyService;
