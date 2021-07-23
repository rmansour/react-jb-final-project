import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import FloatingLabel from "react-bootstrap/Form";
import UserService from '../../services/user.service';

import '../../styles/adminBoardAddVacation.css';

class AdminAddVacation extends Component {
    constructor(props) {
        super(props);

        this.setStates = this.setStates.bind(this);
        this.state = {
            destination: '',
            src: 'a',
            description: '',
            startDate: '',
            endDate: '',
            followers: 0,
            price: 0,
            objToSubmit: {}
        }
    }

    setStates = (action, values) => {
        switch (action) {
            case 'destination':
                this.setState({destination: values});
                break;
            case 'description' :
                this.setState({description: values});
                break;
            case 'start_date':
                this.setState({startDate: values});
                break;
            case 'end_date':
                this.setState({endDate: values});
                break;
            case 'price':
                this.setState({price: values});
                break;
            default:
                break;
        }

        this.setState((prevState) => ({
            objToSubmit: {
                ...prevState.objToSubmit,
                destination: this.state.destination,
                src: this.state.src,
                description: this.state.description,
                start_date: this.state.startDate,
                end_date: this.state.endDate,
                followers: this.state.followers,
                price: this.state.price
            }
        }), () => {
            console.log(this.state.objToSubmit);
        });
    };

    addVacation = () => {
        // e.preventDefault();
        console.log(this.state.objToSubmit);
        UserService.addVacation(this.state.objToSubmit).then(() => {
            alert("added");
            this.props.onHide();
            this.props.updateVacations();
        });
    }

    render() {
        return (
            <>
                <Modal
                    size="lg"
                    show={this.props.show}
                    onHide={() => this.props.onHide(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Add vacation
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="contact-page">
                            <div className="contact-form">
                                {/*<div className="contact-form--header">*/}
                                {/*</div>*/}
                                <p type="Destination:">
                                    <input placeholder="Destination..."
                                           onChange={(e) => this.setStates('destination', e.target.value)}
                                           onBlur={(e) => this.setStates('destination', e.target.value)}/>
                                </p>
                                {/*<p type="Destination image:">*/}
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Default file input example</Form.Label>
                                    <Form.Control type="file" onClick={(e) => this.setStates('src', e.target.value)}/>
                                </Form.Group>
                                {/*<input placeholder="Upload image..." />*/}
                                {/*</p>*/}
                                <p type="Description:">
                                    <FloatingLabel controlId="floatingTextarea2" label="Description"
                                                   style={{marginTop: "1rem"}}>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Description"
                                            style={{height: '100px'}}
                                            onChange={(e) => this.setStates('description', e.target.value)}
                                            onBlur={(e) => this.setStates('description', e.target.value)}/>
                                    </FloatingLabel>
                                </p>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                }}>
                                    <p type="Start Date:">
                                        <input type={"date"} placeholder="Enter Start Date.."
                                               onChange={(e) => this.setStates('start_date', e.target.value)}
                                               onBlur={(e) => this.setStates('start_date', e.target.value)}/>
                                    </p>
                                    <p type="End Date:">
                                        <input type={"date"} placeholder="Enter End Date.."
                                               onChange={(e) => this.setStates('end_date', e.target.value)}
                                               onBlur={(e) => this.setStates('end_date', e.target.value)}/>
                                    </p>
                                </div>
                                <p type="Price:">
                                    <input placeholder="Enter Price.."
                                           onChange={(e) => this.setStates('price', e.target.value)}
                                           onBlur={(e) => this.setStates('price', e.target.value)}/>
                                </p>
                                <Button variant="outline-info" type={"submit"} onClick={this.addVacation}>Add
                                    Vacation</Button>
                            </div>
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

export default AdminAddVacation;
