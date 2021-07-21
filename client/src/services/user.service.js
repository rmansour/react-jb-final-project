import authHeader from './auth-header';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/test/';
const API_URL_VACATIONS = 'http://localhost:8080/vacations';
const API_URL_FAVORITE_VACATIONS = 'http://localhost:8080/favouriteVacation';


class UserService {

    getUserBoard() {
        return axios.get(API_URL + 'user', {headers: authHeader()});
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', {headers: authHeader()});
    }

    getVacations() {
        return axios.get(API_URL_VACATIONS + '/getVacations');
    }

    getVacationByVacationID(vacationId) {
        console.log(vacationId);
        return axios.get(API_URL_VACATIONS + '/getVacationByVacationID?vacationId=' + vacationId);
    }

    updateVacationFollowers(obj) {
        console.log(obj);
        return axios.post(API_URL_VACATIONS + '/updateVacationFollowers', obj);
    }

    addVacationToUsersFavorites(obj) {
        console.log(obj)
        return axios.post(API_URL_FAVORITE_VACATIONS + '/addVacationToFavorites', obj);
    }

    getFavouriteVacationsByUserID(userID) {
        return axios.get(API_URL_FAVORITE_VACATIONS + '/getFavouriteVacationsByUserID?userID=' + userID);
    }

}

export default new UserService();
