import React, {Component} from "react";
import '../../styles/adminPage.css';
import UserService from "../../services/user.service";
import {Table} from "react-bootstrap";
import AdminBoardTableRow from "./adminBoardTableRow";
import {connect} from "react-redux";

class BoardAdminComponent extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props)

        this.state = {
            content: "",
            vacations: [],
            searchInput: '',
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

        UserService.getVacations().then(
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

    render() {
        // console.log(this.props)
        return (
            <div className="admin__page">
                <header className="jumbotron admin__page--header-container">
                    <h3 className="admin__page--header-container-text">{this.state.content}</h3>
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
                                    <AdminBoardTableRow vacation={vacation} key={index}/>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </main>
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
