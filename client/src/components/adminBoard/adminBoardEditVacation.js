import React, {Component} from 'react';
import {Button, Form, FormLabel, Modal} from "react-bootstrap";
import UserService from '../../services/user.service';
import FloatingLabel from "react-bootstrap/Form";
import '../../styles/adminBoardModalVacation.css';

class AdminBoardEditVacation extends Component {
    constructor(props) {
        super(props);

        this.updateVacations = this.updateVacations.bind(this);
        this.setStates = this.setStates.bind(this);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeVacationsOnUpdate = this.changeVacationsOnUpdate.bind(this);

        this.state = {
            textAreaDescription: this.props.vacation.description,
            vacationID: this.props.vacation.id,
            startDate: this.props.vacation.start_date,
            endDate: this.props.vacation.end_date,
            price: this.props.vacation.price,
            objToSubmit: {},
            content: ""
        }
    }

    setStates(action, values) {
        switch (action) {
            case 'start_date':
                this.setState({startDate: values});
                break;
            case 'end_date':
                this.setState({endDate: values});
                break;
            case 'price':
                this.setState({price: values});
                break;
        }
        this.setState((prevState) => ({
            objToSubmit: {
                ...prevState.objToSubmit,
                id: this.state.vacationID,
                start_date: this.state.startDate,
                end_date: this.state.endDate,
                price: this.state.price
            }
        }), () => {
            console.log(this.state.objToSubmit);
        });
    }

    changeVacationsOnUpdate(arr) {
        this.props.vacations = arr;
        console.log(this.props.vacations);
    }

    handleChange = (e) => {
        this.setState({textAreaDescription: e.target.value});
    }

    updateVacations = async () => {
        console.log(this.state.objToSubmit);
        await UserService.updateVacationAdmin(this.state.objToSubmit).then(() => {
            alert("updated");
            this.props.onHide();
            this.props.updateVacations();
        });
    }

    submit() {
        console.log(this.state.objToSubmit);
        this.updateVacations();
    }


    render() {
        return (
            <>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal__component--form-vacation"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.props.vacation.destination}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Edit vacation info</h4>
                        <div>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder={this.props.vacation.destination}
                                              value={this.props.vacation.destination}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Vacation's Description:</Form.Label>
                                <FloatingLabel label="Description">
                                    <Form.Control
                                        as="textarea"
                                        style={{height: '180px', textAlign: 'justify', padding: '.8rem'}}
                                        value={this.state.textAreaDescription} onChange={this.handleChange}/>
                                </FloatingLabel>
                            </Form.Group>

                            <div className="modal__component--form-vacation--dates">
                                <Form.Group className="mb-3">
                                    <FormLabel>Start date:</FormLabel>
                                    <Form.Control type="date" defaultValue={this.state.startDate}
                                                  onChange={(e) => this.setStates('start_date', e.target.value)}
                                                  onBlur={(e) => this.setStates('start_date', e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <FormLabel>End date:</FormLabel>
                                    <Form.Control type="date" placeholder={this.state.endDate}
                                                  onChange={(e) => this.setStates('end_date', e.target.value)}
                                                  onBlur={(e) => this.setStates('end_date', e.target.value)}/>
                                </Form.Group>
                            </div>

                            <Form.Group className="mb-3">
                                <FormLabel>Update price:</FormLabel>
                                <Form.Control type="text" defaultValue={this.state.price}
                                              onChange={(e) => this.setStates('price', e.target.value)}
                                              onBlur={(e) => this.setStates('price', e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <FormLabel>Followers:</FormLabel>
                                <Form.Control type="text" placeholder={this.props.vacation.followers} disabled={true}/>
                            </Form.Group>

                            <Button variant="outline-info" type={"submit"} onClick={this.submit}>Submit</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default AdminBoardEditVacation;
