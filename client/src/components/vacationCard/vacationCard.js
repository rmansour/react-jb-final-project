import React, {useState} from "react";
import '../../styles/vacationCard.scss';
import dateFormat from 'dateformat';


function VacationCard({vacation, index}) {
    const [MAX_LENGTH] = useState(200);
    const [readMore, setReadMore] = useState(false);
    console.log(vacation, index);

    const expanded = (text) => {
        if (readMore === true)
            return <div className="overflow-description-div" >{text}</div>;
        else
            return <div>{text.substring(0, MAX_LENGTH)}...</div>;
    }

    const linkName = readMore ? 'Read Less << ' : 'Read More >> ';

    return (
        <div className="vacation__card" key={vacation.id}>
            <div className="vacation__card--wrapper">
                <div className="vacation__card--wrapper--destination-pic">
                    <img src={vacation.src} alt="destination-pic"/>
                </div>
                <div className="vacation__card--wrapper--body">
                    <header className="vacation__card--wrapper--body-header">
                        <h2>{vacation.destination}</h2>
                        <section className="vacation__card--wrapper--body-dates">
                            <p>
                                <i className="vacation__card--wrapper--body-dates-border">{(dateFormat(vacation.start_date, "dd.mm.yyyy"))} - {dateFormat(vacation.end_date, "dd.mm.yyyy")}</i>
                            </p>
                        </section>
                    </header>

                    <div className="vacation__card--wrapper--body-description">
                        {expanded(vacation.description)}
                    </div>
                    <a className="read-more-link" onClick={() => {setReadMore(!readMore)}}>
                        <p>{linkName}</p>
                    </a>
                    <div className="vacation__card--wrapper--body--price">
                        <p>{vacation.price}$</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VacationCard;
