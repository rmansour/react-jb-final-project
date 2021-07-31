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
        return await axios.get(API_URL_FAVORITE_VACATIONS + '/getFavouriteVacationsByUserIDsorted?userId=' + userId);
    }

    async getVacations() {
        return await axios.get(API_URL_VACATIONS + '/getVacations');
    }

    async updateVacationFollowers(obj) {
        return await axios.post(API_URL_VACATIONS + '/updateVacationFollowers', obj);
    }

    async addVacationToUsersFavorites(obj) {
        return await axios.post(API_URL_FAVORITE_VACATIONS + '/addVacationToFavorites', obj);
    }

    async deleteVacation(id) {
        return await axios.post(API_URL_VACATIONS + '/deleteVacation', id);
    }

    async deleteVacationFromFavourites(obj) {
        return await axios.post(API_URL_FAVORITE_VACATIONS + '/deleteVacationFromFavourites', obj);
    }

    async upsertVacation(fd) {
        return await axios.post(API_URL_VACATIONS + '/upsertVacation', fd);
    }
}

export default new UserService();
