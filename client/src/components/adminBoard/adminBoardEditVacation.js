import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import UserService from '../../services/user.service';
import '../../styles/adminBoardModalVacation.css';

class AdminBoardEditVacation extends Component {
    selectedFile;
    fd = new FormData();

    constructor(props) {
        super(props);

        this.updateVacations = this.updateVacations.bind(this);
        this.setStates = this.setStates.bind(this);
        this.submit = this.submit.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);


        this.state = {
            textAreaDescription: this.props.vacation.description,
            filename: this.props.vacation.filename,
            type: this.props.vacation.type,
            vacationID: this.props.vacation.id,
            destination: this.props.vacation.destination,
            startDate: this.props.vacation.start_date,
            endDate: this.props.vacation.end_date,
            price: this.props.vacation.price,
            previewImage: undefined
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
    }

    updateVacations = async () => {
        this.fileUploadHandler();
        for (let formData of this.fd.entries()) {
            console.log(formData);
        }

        await UserService.upsertVacation(this.fd).then(() => {
            alert("updated");
            this.props.onHide();
            this.props.updateVacations();
            this.fd = new FormData();
            
        });
    }

    async submit() {
        await this.updateVacations();
    }

    fileSelectedHandler = event => {
        this.selectedFile = event.target.files[0];
    }

    fileUploadHandler = () => {
        if (this.selectedFile)
            this.fd.append('fileUpld', this.selectedFile, this.selectedFile.name);
        else {
            this.fd.append('type', this.state.type);
            this.fd.append('filename', this.state.filename);
        }

        this.fd.append('vacationId', this.state.vacationID);
        this.fd.append('destination', this.state.destination);
        this.fd.append('description', this.state.textAreaDescription);
        this.fd.append('price', this.state.price);
        this.fd.append('start_date', this.state.startDate);
        this.fd.append('end_date', this.state.endDate);
        console.log(this.selectedFile);
    };

    render() {
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
                                    <input type="file"
                                           onChange={(e) => this.fileSelectedHandler(e)}/>
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
                                    <p type="Start Date:"
                                       className="admin__page--modal--edit-vacation-body-div--start-date">
                                        <input type={"date"} value={this.state.startDate}
                                               onChange={(e) => this.setStates('start_date', e.target.value)}
                                               onBlur={(e) => this.setStates('start_date', e.target.value)}/>
                                    </p>
                                    <p type="End Date:"
                                       className="admin__page--modal--edit-vacation-body-div--end-date">
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
        )
            ;
    }
}

export default AdminBoardEditVacation;
