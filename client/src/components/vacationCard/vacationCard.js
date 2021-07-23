import React, {useEffect, useRef, useState} from "react";
import '../../styles/vacationCard.scss';
import dateFormat from 'dateformat';

function VacationCard({vacation}) {
    const [MAX_LENGTH] = useState(200);
    const [readMore, setReadMore] = useState(false);

    const iconRef = useRef();

    const expanded = (text) => {
        if (readMore === true)
            return <div className="overflow-description-div">{text}</div>;
        else
            return <div>{text.substring(0, MAX_LENGTH)}...</div>;
    }

    useEffect(() => {
        checkLiked();
    }, []);

    const checkLiked = () => {
        if (vacation.sortOrder === 0)
            iconRef.current.className = 'fas fa-heart vacation__card--wrapper--body-header--icon-wrapper--heart-icon';
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
                        <h2 className="vacation__card--wrapper--body-header-text">{vacation.destination}</h2>
                        <div className="vacation__card--wrapper--body-header--icon-wrapper">
                            <p className="vacation__card--wrapper--body-header--icon-wrapper--followers-count">{vacation.followers}</p>
                            {/*fal fa-heart vacation__card--wrapper--body-header--icon-wrapper--heart-icon*/}
                            <i className="fal fa-heart vacation__card--wrapper--body-header--icon-wrapper--heart-icon"
                               ref={iconRef}/>
                        </div>
                        <section className="vacation__card--wrapper--body-dates">
                            <p>
                                <i className="vacation__card--wrapper--body-dates-border">{(dateFormat(vacation.start_date, "dd.mm.yyyy"))} - {dateFormat(vacation.end_date, "dd.mm.yyyy")}</i>
                            </p>
                        </section>
                    </header>

                    <div className="vacation__card--wrapper--body-description">
                        {expanded(vacation.description)}
                    </div>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="read-more-link" onClick={() => {
                        setReadMore(!readMore)
                    }}>
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
