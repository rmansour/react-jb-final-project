import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import UserService from '../../services/user.service';
import '../../styles/adminBoardAddVacation.css';

class AdminAddVacation extends Component {
    selectedFile;
    fd = new FormData();

    constructor(props) {
        super(props);

        this.setStates = this.setStates.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);

        this.state = {
            destination: '',
            description: '',
            startDate: '',
            endDate: '',
            price: 0,
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
    };

    addVacation = () => {
        if (this.selectedFile) {
            this.fileUploadHandler().then(() => {
                UserService.upsertVacation(this.fd).then(() => {
                    alert("added");
                    this.props.onHide();
                    this.props.updateVacations();
                    this.fd = new FormData();
                });
            });
        } else
            alert('Please add image!');

    }

    fileSelectedHandler = event => {
        this.selectedFile = event.target.files[0];
    }

    fileUploadHandler = async () => {
        this.fd.append('fileUpld', this.selectedFile, this.selectedFile.name);
        this.fd.append('destination', this.state.destination);
        this.fd.append('description', this.state.description);
        this.fd.append('price', this.state.price);
        this.fd.append('start_date', this.state.startDate);
        this.fd.append('end_date', this.state.endDate);
    };

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
                        <div className="admin__page--modal--add-vacation-body">
                            <div className="admin__page--modal--add-vacation-body-div">
                                <p type="Destination:">
                                    <input placeholder="Destination..."
                                           onChange={(e) => this.setStates('destination', e.target.value)}
                                           onBlur={(e) => this.setStates('destination', e.target.value)}/>
                                </p>
                                <p type="Image Upload:">
                                    <input type="file" onChange={(e) => this.fileSelectedHandler(e)}/>
                                </p>
                                <p type="Description:">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Description"
                                        style={{height: '100px'}}
                                        onChange={(e) => this.setStates('description', e.target.value)}
                                        onBlur={(e) => this.setStates('description', e.target.value)}/>
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
