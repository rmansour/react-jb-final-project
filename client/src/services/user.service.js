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

    async getFavouriteVacationsByUserIDsorted(userId) {
        // console.log('getFavouriteVacationsByUserIDsorted');
        return await axios.get(API_URL_FAVORITE_VACATIONS + '/getFavouriteVacationsByUserIDsorted?userId=' + userId);
    }

    async getVacations() {
        return await axios.get(API_URL_VACATIONS + '/getVacations');
    }

    async addVacation(newVacation) {
        // console.log(newVacation);
        return await axios.post(API_URL_VACATIONS + '/addVacation', newVacation);
    }

    async updateVacationFollowers(obj) {
        // console.log(obj);
        return await axios.post(API_URL_VACATIONS + '/updateVacationFollowers', obj);
    }

    async updateVacationAdmin(obj) {
        return await axios.post(API_URL_VACATIONS + '/updateVacationAdmin', obj);
    }

    async addVacationToUsersFavorites(obj) {
        console.log('added: ', obj);
        return await axios.post(API_URL_FAVORITE_VACATIONS + '/addVacationToFavorites', obj);
    }

    async getFavouriteVacationsByUserID(userID) {
        return await axios.get(API_URL_FAVORITE_VACATIONS + '/getFavouriteVacationsByUserID?userId=' + userID);
    }

    async deleteVacation(id) {
        return await axios.post(API_URL_VACATIONS + '/deleteVacation', id);
    }

    async deleteVacationFromFavourites(vacationId) {
        console.log('removed', vacationId);
        return await axios.post(API_URL_FAVORITE_VACATIONS + '/deleteVacationFromFavourites', vacationId);
    }

    async upsertVacation(fd) {
        return await axios.post(API_URL_VACATIONS + '/upsertVacation', fd);
    }

    async getImage(id) {
        return await axios.get(API_URL_VACATIONS + '/getImage?id=' + id);
    }
}

export default new UserService();
