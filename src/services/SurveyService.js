import axiosInstance from '../AxiosConfig';

const surveyService = {

    getAllSurveys: ()=> axiosInstance.get('/surveys/all'),
    getSurveyById: (id)=> axiosInstance.get(`/surveys/${id}`),
    createSurvey: (survey) => axiosInstance.post('/surveys', survey, {
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    updateSurvey: (id,survey) => axiosInstance.put(`/surveys/${id}`, survey, {
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    deleteSurvey: (id) => axiosInstance.delete(`/surveys/${id}`),
    activeSurvey: ()=> axiosInstance.get('/surveys/active')
    

}

export default surveyService;