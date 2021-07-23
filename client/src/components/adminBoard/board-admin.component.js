import React, {Component} from "react";
import '../../styles/adminPage.css';
import UserService from "../../services/user.service";
import {Button, Table} from "react-bootstrap";
import AdminBoardTableRow from "./adminBoardTableRow";
import {connect} from "react-redux";
import AdminAddVacation from "./adminAddVacation";

class BoardAdminComponent extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props)


        this.state = {
            content: "",
            vacations: [],
            searchInput: '',
            modalShow: false
        };
    }

    componentDidMount() {
        UserService.getAdminBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );

        this.getVacations();
    }

    getVacations = async () => {
        await UserService.getVacations().then(
            response => {
                this.setState({
                    vacations: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    setModalShow = (bool) => {
        this.setState({modalShow: bool});
    }

    render() {
        // console.log(this.props)
        return (
            <div className="admin__page">
                <header className="jumbotron admin__page--header-container">
                    <h3 className="admin__page--header-container-text">{this.state.content}</h3>
                    <div className="admin__page--add-vacation-btn">
                        <Button variant="outline-info" onClick={() => this.setModalShow(true)}>Add Vacation</Button>
                    </div>
                </header>

                <main className="admin__page--content">
                    <Table striped bordered hover variant="light" className="admin__page--content--vacations-table"
                           responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Destination</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Price</th>
                            <th>Followers</th>
                            <th>Created At</th>
                            <th>Last Updated At</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.vacations.map((vacation, index) => {
                                return (
                                    <AdminBoardTableRow vacation={vacation} key={index} vacations={this.state.vacations}
                                                        updateVacations={this.getVacations}/>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </main>

                <AdminAddVacation show={this.state.modalShow}
                                  updateVacations={this.getVacations}
                                  onHide={() => this.setModalShow(false)}/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(BoardAdminComponent);
