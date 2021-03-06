import React, {Component} from "react";
import '../styles/homeComponent.css';
import UserService from "../services/user.service";
import VacationCard from "./vacationCard/vacationCard";
import {connect} from "react-redux";
import socket from "../SocketClass";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: this.props.user,
            vacations: [],
            originalVacationData: [],
            filteredVacations: [],
        };
        this.getVacations = this.getVacations.bind(this);
        this.handleFollowedVacation = this.handleFollowedVacation.bind(this);
    }

    getVacations = async () => {
        await UserService.getFavouriteVacationsByUserIDsorted(this.state.currentUser.id).then(
            response => {
                this.setState({
                    originalVacationData: response.data
                }, () => {
                    console.log(this.state.originalVacationData);
                    console.log('end set state');
                });
                this.setState({vacations: response.data});
            }
        );
    }

    componentDidMount() {
        if (this.state.currentUser) {

            this.getVacations();
        }

        socket.on('addedVacation', () => {
            console.log('componentDidMount going to server');
            this.getVacations();
        });

        socket.on('deleteVacation', () => {
            console.log('componentDidMount going to server');
            this.getVacations();
        });

        socket.on('updatedVacations', (payload) => {
            console.log('componentDidMount going to server');
            this.getVacations();
        });

        socket.on('updateFollowers', () => {
            console.log('componentDidMount going to server');
            this.getVacations();
            // console.log(this.state.vacations);

        });
    }

    onSearch = (e) => {
        let tmpArr = this.state.originalVacationData;
        if (e.target.value) {
            tmpArr = this.state.originalVacationData.filter(vacation => vacation.destination.toLowerCase().includes((e.target.value).toLowerCase()));
        }

        this.setState({vacations: tmpArr});
    }

    /**
     *
     * @param e
     * @param vacation
     * @param iconRef
     * @param liked
     * @returns {Promise<void>}
     *
     * this method
     */
    handleFollowedVacation = async (e, vacation, iconRef, liked) => {
        console.log('likedBool handleFollowedVacation', liked);
        console.log('handleFollowedVacation vacation', vacation);
        let followersObj = {
            followers: vacation.followers,
            id: vacation.id
        }
        if (liked === 0) {
            await UserService.addVacationToUsersFavorites({vacationId: vacation.id, userId: this.state.currentUser.id});
            followersObj.followers += 1;
            await UserService.updateVacationFollowers(followersObj);
        }

        if (liked === 1) {
            await UserService.deleteVacationFromFavourites({
                vacationId: vacation.id,
                userId: this.state.currentUser.id
            });
            followersObj.followers -= 1;
            await UserService.updateVacationFollowers(followersObj);
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
                        this.state.vacations.map((vacation, index) => {
                            return <VacationCard
                                handleFollowedVacation={this.handleFollowedVacation}
                                vacation={vacation}
                                key={index}/>
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

export default connect(mapStateToProps)(Home);
