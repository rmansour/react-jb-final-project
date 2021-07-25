import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import UserService from '../../services/user.service';
import '../../styles/adminBoardModalVacation.css';

class AdminBoardEditVacation extends Component {
    constructor(props) {
        super(props);

        this.updateVacations = this.updateVacations.bind(this);
        this.setStates = this.setStates.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            textAreaDescription: this.props.vacation.description,
            vacationID: this.props.vacation.id,
            destination: this.props.vacation.destination,
            src: this.props.vacation.src,
            startDate: this.props.vacation.start_date,
            endDate: this.props.vacation.end_date,
            price: this.props.vacation.price,
            objToSubmit: {},
            content: ""
        }
    }

    setStates(action, values) {
        switch (action) {
            case 'destination':
                this.setState({destination: values});
                break;
            case 'description':
                this.setState({textAreaDescription: values});
                break;
            case 'src':
                this.setState({src: values});
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
                id: this.state.vacationID,
                destination: this.state.destination,
                src: this.state.src,
                description: this.state.textAreaDescription,
                start_date: this.state.startDate,
                end_date: this.state.endDate,
                price: this.state.price
            }
        }), () => {
            console.log(this.state.objToSubmit);
        });
    }

    updateVacations = async () => {
        console.log(this.state.objToSubmit);
        await UserService.updateVacationAdmin(this.state.objToSubmit).then(() => {
            alert("updated");
            this.props.onHide();
            this.props.updateVacations();
        });
    }

    async submit() {
        console.log(this.state.objToSubmit);
        await this.updateVacations();
    }


    render() {
        // console.log(this.state.objToSubmit);

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modal__component--form-vacation">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.vacation.destination} - Edit vacation info
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="admin__page--modal--edit-vacation-body">
                        <div className="admin__page--modal--edit-vacation-body-div">
                            <div>
                                <p type="Destination:">
                                    <input placeholder={this.props.vacation.destination}
                                           value={this.state.destination}
                                           onChange={(e) => this.setStates('destination', e.target.value)}
                                           onBlur={(e) => this.setStates('destination', e.target.value)}/>
                                </p>

                                <p type="Image Upload:">
                                    <input type="file" onClick={(e) => this.setStates('src', e.target.value)}/>
                                </p>

                                <p type="Description:">
                                    <Form.Control
                                        style={{height: '180px', textAlign: 'justify', padding: '.8rem'}}
                                        as="textarea"
                                        placeholder="Description"
                                        value={this.state.textAreaDescription}
                                        onChange={(e) => this.setStates('description', e.target.value)}
                                        onBlur={(e) => this.setStates('description', e.target.value)}/>
                                </p>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                }}>
                                    <p type="Start Date:">
                                        <input type={"date"} value={this.state.startDate}
                                               onChange={(e) => this.setStates('start_date', e.target.value)}
                                               onBlur={(e) => this.setStates('start_date', e.target.value)}/>
                                    </p>
                                    <p type="End Date:">
                                        <input type={"date"} defaultValue={this.state.endDate}
                                               onChange={(e) => this.setStates('end_date', e.target.value)}
                                               onBlur={(e) => this.setStates('end_date', e.target.value)}/>
                                    </p>
                                </div>
                                <p type="Price:">
                                    <input defaultValue={this.state.price}
                                           onChange={(e) => this.setStates('price', e.target.value)}
                                           onBlur={(e) => this.setStates('price', e.target.value)}/>
                                </p>

                                <p type="Followers:">
                                    <input placeholder={this.props.vacation.followers} disabled={true}/>
                                </p>

                                <Button variant="outline-info" type={"submit"} onClick={this.submit}>Submit</Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-info" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AdminBoardEditVacation;
