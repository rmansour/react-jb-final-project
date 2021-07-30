import React, {Component} from "react";
import '../styles/homeComponent.css';
import UserService from "../services/user.service";
import VacationCard from "./vacationCard/vacationCard";
import {connect} from "react-redux";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: this.props.user,
            vacations: [],
            filteredVacations: [],
            searchInput: '',
        };
        this.addVacationToUsersFavorites = this.addVacationToUsersFavorites.bind(this);
        this.getVacations = this.getVacations.bind(this);
        this.handleFollowedVacation = this.handleFollowedVacation.bind(this);
    }

    getVacations = async () => {
        await UserService.getFavouriteVacationsByUserIDsorted(this.props.user.id).then(
            response => {
                this.setState({
                    vacations: response.data
                }, () => {
                    this.props.updateVacations(response.data);
                });
            }
        );
    }

    componentDidMount() {
        this.getVacations();
    }

    onSearch = (e) => {
        this.setState({searchInput: (e.target.value).toLowerCase()});
        let tmpArr = this.state.vacations.filter(vacation => vacation.destination.toLowerCase().includes((e.target.value).toLowerCase()));
        this.setState({filteredVacations: tmpArr});
    }

    async addVacationToUsersFavorites(obj) {
        await UserService.addVacationToUsersFavorites(obj);
    }


    handleFollowedVacation = async (e, vacation, iconRef, likedBool) => {
        let followersObj = {
            followers: vacation.followers,
            id: vacation.id
        }
        if (likedBool === 0) {
            await UserService.addVacationToUsersFavorites({vacationId: vacation.id, userId: this.state.currentUser.id});
            followersObj.followers += 1;
            await UserService.updateVacationFollowers(followersObj);
            await this.getVacations();
        }

        if (likedBool === 1) {
            await UserService.deleteVacationFromFavourites({
                vacationId: vacation.id,
                userId: this.state.currentUser.id
            });
            followersObj.followers -= 1;
            await UserService.updateVacationFollowers(followersObj);
            await this.getVacations();
        }
    }

    render() {
        return (
            <div className="home__component">
                <div className="search-bar p-2 rounded rounded-pill shadow-sm">
                    <div className="input-group">
                        <input type="search" placeholder="What're you searching for?"
                               aria-describedby="button-addon1"
                               className="form-control border-0"
                               onChange={(e) => this.onSearch(e)}/>
                        <div className="input-group-append">
                            <button id="button-addon1" type="submit"
                                    className="btn btn-link text-primary"><i
                                className="fa fa-search"/></button>
                        </div>
                    </div>
                </div>
                <div className="row home__component--cards-div">
                    {
                        this.state.filteredVacations.length === 0 ?
                            this.state.vacations.map((vacation, index) => {
                                return <VacationCard
                                    handleFollowedVacation={this.handleFollowedVacation}
                                    vacation={vacation}
                                    key={index}/>
                            })
                            :
                            this.state.filteredVacations.map((vacation, index) => {
                                return <VacationCard
                                    handleFollowedVacation={this.handleFollowedVacation}
                                    vacation={vacation}
                                    onSearchInput={this.onSearch} key={index}/>
                            })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {user} = state.auth;
    return {
        user,
    };
}

const dispatchStateToProps = (dispatch) => {
    return {

        updateVacations(value) {
            dispatch({
                type: "updateVacations",
                payload: value
            })
        }
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(Home);
