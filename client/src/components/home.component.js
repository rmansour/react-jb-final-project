import React, {Component} from "react";
import '../styles/homeComponent.css';
import UserService from "../services/user.service";
import VacationCard from "./vacationCard/vacationCard";
import {connect} from "react-redux";

class Home extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.user);

        this.state = {
            currentUser: this.props.user,
            vacations: [],
            filteredVacations: [],
            searchInput: '',
            followersObj: {},
            favoriteVacationsByUserId: []
        };
        this.handleFollowers = this.handleFollowers.bind(this);
        this.updateVacationFollowers = this.updateVacationFollowers.bind(this);
        this.addVacationToUsersFavorites = this.addVacationToUsersFavorites.bind(this);
        this.changeLikeIcon = this.changeLikeIcon.bind(this);
    }

    componentDidMount() {
        UserService.getVacations().then(
            response => {
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

        UserService.getFavouriteVacationsByUserID(this.state.currentUser.id).then(response => {
            this.setState({favoriteVacationsByUserId: response.data}, () => {
                // let tmp = this.state.favoriteVacationsByUserId.filter(favoriteVacation => this.state.vacations.filter(vacation => {
                //     if (favoriteVacation.vacationId === vacation.id) {
                //
                //     }
                // }));
                // console.log(tmp);
            });
        })
    }

    onSearch = (e) => {
        this.setState({searchInput: (e.target.value).toLowerCase()});
        let tmpArr = this.state.vacations.filter(vacation => vacation.destination.toLowerCase().includes((e.target.value).toLowerCase()));
        this.setState({filteredVacations: tmpArr});
    }

    handleFollowers = (e, vacation) => {
        // <i class="fal fa-heart"></i> - regular
        // <i class="fas fa-heart"></i> - solid
        this.setState({
            followersObj: {
                id: vacation.id,
                followers: vacation.followers + 1,
            }
        }, () => {
            let stateCopy = ({
                vacationId: vacation.id,
                userID: this.props.user.id,
                followedVacation: 1
            })
            console.log(stateCopy);

            console.log('vacation.id', vacation.id);
            let tmp = this.state.favoriteVacationsByUserId.filter(favoriteVacation => {
                if (favoriteVacation.vacationId === vacation.vacationId)
                    console.log('abc');
                return favoriteVacation.vacationId === vacation.id
            });
            console.log(tmp)
            let boolStmt = false;
            // if (tmp.length !== 0) {
            //     console.log('update followers in vacations table');
            //     // await this.updateVacationFollowers();
            //
            //     console.log('change icon to full');
            //     // e.target.className = this.changeLikeIcon(, !boolStmt);
            //     boolStmt = !boolStmt;
            // } else {
            //     console.log('change icon to regular')
            //     e.target.className = this.changeLikeIcon(e, boolStmt);
            //     boolStmt = !boolStmt;
            // }

            // await this.addVacationToUsersFavorites(stateCopy);


            // force re-render
            UserService.getVacations().then(response => {
                this.setState({vacations: response.data});
            });
        })
    }

    async addVacationToUsersFavorites(obj) {
        await UserService.addVacationToUsersFavorites(obj);
    }

    async updateVacationFollowers() {
        await UserService.updateVacationFollowers(this.state.objToSubmit);
    }

    changeLikeIcon(vacation) {
        console.log(vacation);
        // if (vacation)
        //     return vacation.target.className = 'fas fa-heart vacation__card--wrapper--body-header--icon-wrapper--heart-icon';
        // else
        //     return vacation.target.className = 'fal fa-heart vacation__card--wrapper--body-header--icon-wrapper--heart-icon';
    }

    render() {
        // console.log(this.props);

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
                                return <VacationCard handleFollowers={this.handleFollowers}
                                                     vacation={vacation} onSearchInput={this.onSearch}
                                                     key={index}/>
                            })
                            :
                            this.state.filteredVacations.map((vacation, index) => {
                                return <VacationCard handleFollowers={this.handleFollowers}
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
