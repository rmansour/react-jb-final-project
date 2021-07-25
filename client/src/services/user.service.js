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

    getFavouriteVacationsByUserIDsorted(userId) {
        // console.log('getFavouriteVacationsByUserIDsorted');
        return axios.get(API_URL_FAVORITE_VACATIONS + '/getFavouriteVacationsByUserIDsorted?userId=' + userId);
    }

    getVacations() {
        return axios.get(API_URL_VACATIONS + '/getVacations');
    }

    addVacation(newVacation) {
        // console.log(newVacation);
        return axios.post(API_URL_VACATIONS + '/addVacation', newVacation);
    }

    updateVacationFollowers(obj) {
        // console.log(obj);
        return axios.post(API_URL_VACATIONS + '/updateVacationFollowers', obj);
    }

    updateVacationAdmin(obj) {
        return axios.post(API_URL_VACATIONS + '/updateVacationAdmin', obj);
    }

    addVacationToUsersFavorites(obj) {
        console.log('added: ', obj);
        return axios.post(API_URL_FAVORITE_VACATIONS + '/addVacationToFavorites', obj);
    }

    getFavouriteVacationsByUserID(userID) {
        return axios.get(API_URL_FAVORITE_VACATIONS + '/getFavouriteVacationsByUserID?userId=' + userID);
    }

    deleteVacation(id) {
        return axios.post(API_URL_VACATIONS + '/deleteVacation', id);
    }

    deleteVacationFromFavourites(vacationId) {
        console.log('removed', vacationId);
        return axios.post(API_URL_FAVORITE_VACATIONS + '/deleteVacationFromFavourites', vacationId);
    }

}

export default new UserService();
