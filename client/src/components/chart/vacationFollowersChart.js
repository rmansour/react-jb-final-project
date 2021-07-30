import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {connect} from "react-redux";
import {Bar} from "react-chartjs-2";
import UserService from "../../services/user.service";

function VacationFollowersChart(props) {
    const [vacations, setVacations] = useState([]);
    const [user] = useState(props.user.user);
    console.log(user);
    const [chartData, setChartData] = useState();

    useEffect(() => {
        UserService.getFavouriteVacationsByUserIDsorted(user.id).then(response => {
            setVacations(response.data);
        });
    }, [user.id]);

    const vacationsForChart = useMemo(() => vacations.filter(v => v.followers > 0).map(vacation => `${vacation.destination}(${vacation.id})`), [vacations]);

    const vacationsForChartFollowers = useMemo(() => vacations.filter(v => v.followers > 0).map(vacation => vacation.followers), [vacations]);

    const chart = useCallback(() => {
        console.log(vacations);
        setChartData({
            labels: vacationsForChart,
            datasets: [
                {
                    data: vacationsForChartFollowers,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }
            ]
        })
    }, [vacationsForChart, vacationsForChartFollowers, vacations]);

    useEffect(() => {
        chart()
    }, [chart]);

    return (
        <div>
            <div style={{
                width: '90vw',
                height: '85vh',
                position: 'relative',
                top: '80px',
                left: '50%',
                transform: 'translateX(-50%)'
            }}>
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                suggestedMin: 0,
                                suggestedMax: 20,
                            },
                        },
                    }}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        vacations: state.vacations,
        user: state.auth
    };
}

export default connect(mapStateToProps)(VacationFollowersChart);
