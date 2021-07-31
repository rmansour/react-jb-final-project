import React, {useEffect, useRef, useState} from "react";
import '../../styles/vacationCard.scss';
import dateFormat from 'dateformat';
import {connect} from "react-redux";

function VacationCard({vacation, handleFollowedVacation, user}) {

    console.log(vacation)
    const [MAX_LENGTH] = useState(200);
    const [readMore, setReadMore] = useState(false);
    const {
        destination,
        price,
        end_date,
        description,
        id,
        filename,
        start_date,
        followers,
        sortOrder,
        liked
    } = vacation;
    const linkName = readMore ? 'Read Less << ' : 'Read More >> ';
    const [image, setImage] = useState(filename);
    const [admin, setAdmin] = useState();

    const iconRef = useRef();

    const expanded = (text) => {
        if (readMore === true)
            return <div className="overflow-description-div">{text}</div>;
        else
            return <div>{text.substring(0, MAX_LENGTH)}...</div>;
    }

    useEffect(() => {
        if (user) {
            setAdmin(user.roles.includes("ROLE_ADMIN"));
        }
    }, [admin]);

    useEffect(() => {
        if (!admin)
            checkLiked();
    }, [iconRef.current]);

    const checkLiked = () => {
        const {sortOrder} = vacation;
        if (sortOrder === 0)
            iconRef.current.className = "fas fa-heart vacation__card--wrapper--body-header--icon-wrapper--heart-icon";
    }

    const handleFollowedFunc = (e) => {
        let iconCheckedClassName = 'fas fa-heart vacation__card--wrapper--body-header--icon-wrapper--heart-icon';
        let iconNotCheckedClassName = 'fal fa-heart vacation__card--wrapper--body-header--icon-wrapper--heart-icon';

        console.log(liked);
        // const {sortOrder} = vacation;

        // if 0 -> turn to 1 - uncheck
        if (liked === 0) {
            // vacation.sortOrder = 1;
            handleFollowedVacation(e, vacation, iconRef, 0);
            iconRef.current.className = iconCheckedClassName;
        } else {
            // vacation.sortOrder = 0;
            handleFollowedVacation(e, vacation, iconRef, 1);
            iconRef.current.className = iconNotCheckedClassName;
        }
        // console.log('vacationCard', vacation);
    }

    useEffect(() => {
        setImage(filename)
    }, [filename]);

    return (
        <div className="vacation__card" key={id}>
            <div className="vacation__card--wrapper">
                <div className="vacation__card--wrapper--destination-pic">
                    <img src={`http://localhost:8080/${image}`} alt="destination-pic"/>
                </div>
                <div className="vacation__card--wrapper--body">
                    <header className="vacation__card--wrapper--body-header">
                        <h2 className="vacation__card--wrapper--body-header-text">{destination}</h2>
                        {admin ? (
                            <div className="vacation__card--wrapper--body-header--icon-wrapper">
                                <p className="vacation__card--wrapper--body-header--icon-wrapper--followers-count">{followers} likes</p>
                            </div>
                        ) : (
                            <div className="vacation__card--wrapper--body-header--icon-wrapper">
                                <p className="vacation__card--wrapper--body-header--icon-wrapper--followers-count">{followers}</p>
                                <i className="fal fa-heart vacation__card--wrapper--body-header--icon-wrapper--heart-icon"
                                   ref={iconRef}
                                   onClick={(e) => handleFollowedFunc(e)}/>
                            </div>
                        )}
                        <section className="vacation__card--wrapper--body-dates">
                            <p>
                                <i className="vacation__card--wrapper--body-dates-border">
                                    {(dateFormat(start_date, "dd.mm.yyyy"))} - {dateFormat(end_date, "dd.mm.yyyy")}
                                </i>
                            </p>
                        </section>
                    </header>

                    <div className="vacation__card--wrapper--body-description">
                        {expanded(description)}
                    </div>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="read-more-link" onClick={() => {
                        setReadMore(!readMore)
                    }}>
                        <p>{linkName}</p>
                    </a>
                    <div className="vacation__card--wrapper--body--price">
                        <p>{price}$</p>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(VacationCard);
