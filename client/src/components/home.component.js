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
            content: ""
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

    render() {
        // console.log('homeComp', this.state.vacations);
        return (
            <div className="home__component">
                    <div className="home__component--left-div">
                        {
                            this.state.vacations.map(vacation => {
                                console.log(vacation)
                                return <VacationCard vacation={vacation}/>
                            })
                        }
                </div>

                <div className="home__component--right-div">
                </div>
            </div>
        );
    }
}
