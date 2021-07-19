import React, {Component} from "react";
import '../styles/homeComponent.css';
import UserService from "../services/user.service";
import VacationCard from "./vacationCard/vacationCard";
// import VacationsService from "../services/vacations.service";
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vacations: [],
            filteredVacations: [],
            content: "",
            searchInput: ''
        };
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
    }

    onSearch = (e) => {
        this.setState({searchInput: (e.target.value).toLowerCase()});
        let tmpArr = this.state.vacations.filter(vacation => vacation.destination.toLowerCase().includes((e.target.value).toLowerCase()));
        // console.log(tmpArr);
        this.setState({filteredVacations: tmpArr});
    }

    render() {
        return (
            <div className="home__component">
                <div className="home__component--search-div ">
                    <form className="home__component--search-div--form form my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                               onChange={(e) => this.onSearch(e)}/>
                    </form>
                </div>
                <div className="row home__component--cards-div">
                    {
                        this.state.filteredVacations.length === 0 ?
                            this.state.vacations.map((vacation, index) => {
                                return <VacationCard index={index} vacation={vacation} onSearchInput={this.onSearch}/>
                            })
                            :
                            this.state.filteredVacations.map(vacation => {
                                return <VacationCard index={vacation.id} vacation={vacation}
                                                     onSearchInput={this.onSearch}/>
                            })
                    }
                </div>
            </div>
        );
    }
}
