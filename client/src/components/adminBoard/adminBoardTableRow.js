import React, {useState} from 'react';
import '../../styles/adminPage.css';
import AdminBoardEditVacation from "./adminBoardEditVacation";

export default function AdminBoardTableRow({vacation, index}) {
    const [MAX_LENGTH] = useState(100);
    const [readMore, setReadMore] = useState(false);

    const [modalShow, setModalShow] = useState(false);

    const expanded = (text) => {
        if (readMore === true)
            return <div className="overflow-description-div">{text}</div>;
        else
            return <div>{text.substring(0, MAX_LENGTH)}...</div>;
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
                        <div style={{
                            height: "150px",
                            overflowY: "auto"
                        }}>{expanded(vacation.description)}
                        </div>
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
                        <button className="btn btn-outline-danger">Delete</button>
                    </div>
                </td>
            </tr>

            <AdminBoardEditVacation
                show={modalShow}
                onHide={() => setModalShow(false)}
                vacation={vacation}
            />
        </>
    );
}
