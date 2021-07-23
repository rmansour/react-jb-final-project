import React, {Component} from "react";
import '../styles/homeComponent.css';
import UserService from "../services/user.service";
import VacationCard from "./vacationCard/vacationCard";
import {connect} from "react-redux";

class Home extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props.user);

        this.state = {
            currentUser: this.props.user,
            vacations: [],
            filteredVacations: [],
            searchInput: '',
            followersObj: {},
            favoriteVacationsByUserId: [],
        };
        this.updateVacationFollowers = this.updateVacationFollowers.bind(this);
        this.addVacationToUsersFavorites = this.addVacationToUsersFavorites.bind(this);
        this.getVacations = this.getVacations.bind(this);
    }

    getVacations = async () => {
        await UserService.getFavouriteVacationsByUserIDsorted(this.props.user.id).then(
            response => {
                console.log(response.data);
                this.setState({
                    vacations: response.data
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
        this.getVacations().then(() => {
            UserService.getFavouriteVacationsByUserID(this.state.currentUser.id).then(response => {
                console.log('starting to fetch favorites', this.state.currentUser.id);
                this.setState({favoriteVacationsByUserId: response.data});
            });
        })
    }

    onSearch = (e) => {
        this.setState({searchInput: (e.target.value).toLowerCase()});
        let tmpArr = this.state.vacations.filter(vacation => vacation.destination.toLowerCase().includes((e.target.value).toLowerCase()));
        this.setState({filteredVacations: tmpArr});
    }

    async addVacationToUsersFavorites(obj) {
        await UserService.addVacationToUsersFavorites(obj);
    }

    async updateVacationFollowers() {
        await UserService.updateVacationFollowers(this.state.objToSubmit);
    }


    render() {
        console.log(this.state.favoriteVacationsByUserId);
        // console.log(this.props.user.id);
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
                                    vacation={vacation}
                                    onSearchInput={this.onSearch}
                                    key={index}/>
                            })
                            :
                            this.state.filteredVacations.map((vacation, index) => {
                                return <VacationCard
                                    index={vacation.id}
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
