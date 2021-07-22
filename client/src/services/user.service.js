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

    getFavouriteVacationsByUserIDsorted(userID) {
        return axios.get(API_URL_FAVORITE_VACATIONS + '/getFavouriteVacationsByUserIDsorted?userID=' + userID);
    }

    getVacations() {
        return axios.get(API_URL_VACATIONS + '/getVacations');
    }

    updateVacationFollowers(obj) {
        console.log(obj);
        return axios.post(API_URL_VACATIONS + '/updateVacationFollowers', obj);
    }

    updateVacationAdmin(obj) {
        return axios.post(API_URL_VACATIONS + '/updateVacationAdmin', obj);
    }

    addVacationToUsersFavorites(obj) {
        console.log(obj)
        return axios.post(API_URL_FAVORITE_VACATIONS + '/addVacationToFavorites', obj);
    }

    getFavouriteVacationsByUserID(userID) {
        return axios.get(API_URL_FAVORITE_VACATIONS + '/getFavouriteVacationsByUserID?userID=' + userID);
    }

    deleteVacation(id) {
        return axios.post(API_URL_VACATIONS + '/deleteVacation', id);
    }

}

export default new UserService();
