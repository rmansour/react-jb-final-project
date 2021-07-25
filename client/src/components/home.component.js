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
            favoriteVacationsByUserId: [],
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
                    UserService.getFavouriteVacationsByUserID(this.state.currentUser.id).then(response => {
                        this.setState({favoriteVacationsByUserId: response.data});
                    })
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
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
                <div className="home__component--search-div bg-light">
                    <form className="home__component--search-div--form form my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search"
                               aria-label="Search"
                               onChange={(e) => this.onSearch(e)}/>
                    </form>
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

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(Home);
