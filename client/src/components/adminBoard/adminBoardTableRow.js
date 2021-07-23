import React, {useState} from 'react';
import '../../styles/adminPage.css';
import UserService from '../../services/user.service';
import AdminBoardEditVacation from "./adminBoardEditVacation";
import {OverlayTrigger, Tooltip} from "react-bootstrap";


const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Click me to expand!
    </Tooltip>
);

export default function AdminBoardTableRow({vacation, index, vacations, updateVacations}) {
    const [MAX_LENGTH] = useState(100);
    const [readMore, setReadMore] = useState(false);

    const [modalShow, setModalShow] = useState(false);

    const expanded = (text) => {
        if (readMore === true)
            return <div className="overflow-description-div">{text}</div>;
        else
            return <div>{text.substring(0, MAX_LENGTH)}...</div>;
    }

    const deleteVacation = async (id) => {
        console.log(id);
        await UserService.deleteVacation({id: id});
        await updateVacations();
    }

    return (
        <>
            <tr className="admin__page--content--vacations-table-row" key={index}>
                <th scope="row">{vacation.id}</th>
                <td>{vacation.destination}</td>


                <td className="admin__page--content--vacations-table-row--description">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="read-more-link" onClick={() => {
                        setReadMore(!readMore)
                    }}>
                        {/*<p>{linkName}</p>*/}

                        {/*<ReactTooltip place="top" type="dark" effect="solid" data-for="description"/>*/}
                        <OverlayTrigger placement="top"
                                        delay={{show: 250, hide: 250}}
                                        overlay={renderTooltip} defaultShow={false}>
                            <div data-tip='Click me to expand!' id="description" aria-haspopup='true'
                                 style={{
                                     height: "150px",
                                     overflowY: "auto"
                                 }}>{expanded(vacation.description)}
                            </div>
                        </OverlayTrigger>
                    </a>
                </td>
                <td>{vacation.start_date}</td>
                <td>{vacation.end_date}</td>
                <td>{vacation.price}$</td>
                <td>{vacation.followers}</td>
                <td>{vacation.createdAt}</td>
                <td>{vacation.updatedAt}</td>
                <td>
                    <div className="admin__page--content--vacations-table-row--action-btns">
                        <button
                            className="btn btn-outline-info admin__page--content--vacations-table-row--action-btns--edit-btn"
                            onClick={() => setModalShow(true)}>Edit
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => deleteVacation(vacation.id)}>Delete
                        </button>
                    </div>
                </td>
            </tr>

            <AdminBoardEditVacation
                updateVacations={updateVacations}
                show={modalShow}
                onHide={() => setModalShow(false)}
                vacation={vacation}
                vacations={vacations}
            />
        </>
    );
}
