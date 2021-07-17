import React from "react";
import '../../styles/vacationCard.scss';
import dateFormat from 'dateformat';
import {useState} from 'react';
// import {Link} from "react-router-dom";

function VacationCard({vacation}) {
    const [MAX_LENGTH] = useState(250);
    console.log(vacation);
    return (
        // <Link style={{textDecoration: "none", color: "black", cursor: "pointer"}} to={['/vacation-info/:id', vacation.id]}>
            <div className="vacation__card">
                <div className="vacation__card--destination-pic">
                    <img src={vacation.src} alt="destination-pic"/>
                </div>

                <main className="vacation__card--body">
                    <header className="vacation__card--header">
                        <h2>{vacation.destination}</h2>
                        <section className="vacation__card--body-dates">
                            <p>
                                <i className="vacation__card--body-dates-border">{(dateFormat(vacation.start_date, "dd.mm.yyyy"))} - {dateFormat(vacation.end_date, "dd.mm.yyyy")}</i>
                            </p>
                            {/*<hr style={{width: "35%"}}/>*/}
                        </section>
                    </header>

                    {vacation.description.length > MAX_LENGTH ?
                        (
                            <p>
                                {
                                    `${vacation.description.substring(0, MAX_LENGTH)} ... `
                                }
                            </p>
                        ) :
                        <p>{vacation.description}</p>
                    }

                    <div className="vacation__card--price">
                        <p>{vacation.price}$</p>
                    </div>
                </main>
            </div>
        // </Link>

    );
}

export default VacationCard;
