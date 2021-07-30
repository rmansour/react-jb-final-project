import React, {Component} from 'react';
import {connect} from "react-redux";
import UserService from '../../services/user.service';
import {Bar} from "react-chartjs-2";

class VacationFollowersChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: this.props.user.user,
            chartData: {
                type: 'bar',
                data: {
                    labels: ['a', 'v', 'c', 'd', 'e', 'f'],
                    datasets: [{
                        label: '# of Followers',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        },
                        xAxis: {
                            type: 'Vacation'
                        }
                    }
                }
            }
        }
    }

    componentDidMount() {
        this.getVacations();
    }

    getVacations = async () => {
        let vacations = await UserService.getFavouriteVacationsByUserIDsorted(this.state.currentUser.id);
        let chartDataLocal = {...this.state.chartData};
        let vacationDestination = vacations.data.map(vacation => {
            return vacation.destination;
        });
        chartDataLocal.data.labels = vacationDestination;
        this.setState({chartData: chartDataLocal}, () => {
            console.log(this.state.chartData);
        });
    }

    render() {
        console.log('rendered');
        // console.log(this.state.chartData.data.labels);
        return (
            <div className={"chart container"}>
                <Bar data={this.state.chartData.data}
                     options={{
                         maintainAspectRatio: true
                     }}/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        vacations: state.vacations,
        user: state.auth
    };
}


export default connect(mapStateToProps)(VacationFollowersChart);
