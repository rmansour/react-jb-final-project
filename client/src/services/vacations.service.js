import axios from 'axios';
// import authHeader from "./auth-header";

const API_URL_VACATIONS = 'http://localhost:8080/vacations';

class VacationsService {
    getVacations() {
        return axios.get(API_URL_VACATIONS + '/getVacations');
    }
}

export default new VacationsService();
