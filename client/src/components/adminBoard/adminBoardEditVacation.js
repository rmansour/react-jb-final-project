import React, {useState} from 'react';
import {Button, Form, FormLabel, Modal} from "react-bootstrap";
import FloatingLabel from "react-bootstrap/Form";
import '../../styles/adminBoardModalVacation.css';

function AdminBoardEditVacation(props) {

    const [textAreaDescription, setTextAreaDescription] = useState(props.vacation.description);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState('');

    const updatedValue = {
        start_date: startDate,
        end_date: endDate,
        price: price
    };

    const submit = (e) => {
        e.preventDefault();
        setObjToSubmit(updatedValue);
    }
    const [objToSubmit, setObjToSubmit] = useState({});
    console.log(objToSubmit);


    /**
     *
     * @param event
     *
     * Handle the description's textarea text changes
     */
    const handleChange = (event) => {
        setTextAreaDescription(event.target.value);
    };
    // console.log(textAreaDescription);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal__component--form-vacation"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.vacation.destination}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Edit vacation info</h4>
                <div>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder={props.vacation.destination} disabled={true}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Vacation's Description:</Form.Label>
                        <FloatingLabel label="Description">
                            <Form.Control
                                as="textarea"
                                style={{height: '180px', textAlign: 'justify', padding: '.8rem'}}
                                value={textAreaDescription} onChange={handleChange}/>
                        </FloatingLabel>
                    </Form.Group>

                    <div className="modal__component--form-vacation--dates">
                        <Form.Group className="mb-3">
                            <FormLabel>Start date:</FormLabel>
                            <Form.Control type="date" defaultValue={props.vacation.start_date}
                                          onChange={(e) => {
                                              setStartDate(e.target.value)
                                          }}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FormLabel>End date:</FormLabel>
                            <Form.Control type="date" placeholder={props.vacation.end_date}
                                          onChange={(e) => {
                                              setEndDate(e.target.value)
                                          }}/>
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-3">
                        <FormLabel>Update price:</FormLabel>
                        <Form.Control type="text" defaultValue={props.vacation.price}
                                      onChange={(e) => {
                                          setPrice(e.target.value)
                                      }}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FormLabel>Followers:</FormLabel>
                        <Form.Control type="text" placeholder={props.vacation.followers} disabled={true}/>
                    </Form.Group>

                    <Button type={"submit"} onClick={submit}>Submit</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AdminBoardEditVacation;
