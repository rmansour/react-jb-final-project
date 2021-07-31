import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Route, Router, Switch} from "react-router-dom";

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap';
import "./styles/App.css";

// components
import Login from './components/login';
import Register from "./components/register";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardAdmin from "./components/adminBoard/board-admin.component";
import VacationFollowersChart from "./components/chart/vacationFollowersChart";

// actions, helpers and history
import {logout} from "./actions/auth";
import {clearMessage} from "./actions/messages";
import {history} from './helpers/history';


class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAdminBoard: false,
            currentUser: undefined,
        };

        history.listen((location) => {
            props.dispatch(clearMessage()); // clear message when changing location
        });
    }

    componentDidMount() {
        const user = this.props.user;

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }


    logOut() {
        this.props.dispatch(logout());
    }

    render() {
        const {currentUser, showAdminBoard} = this.state;

        if (!currentUser) {
            history.push('/login');
        }
        return (
            <Router history={history}>
                <>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            {currentUser ? (
                                <Link to={{pathname: "/",}}
                                      className="navbar-brand">
                                    Travel Agency
                                </Link>
                            ) : (
                                <Link to={{pathname: "/login",}}
                                      className="navbar-brand">
                                    Travel Agency
                                </Link>
                            )}
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <div className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {showAdminBoard && (
                                        <li className="nav-item">
                                            <Link to={"/admin"} className="nav-link">
                                                Admin Board
                                            </Link>
                                        </li>
                                    )}
                                    {showAdminBoard && (
                                        <li className="nav-item">
                                            <Link to={"/followers-chart"} className="nav-link">
                                                Followers' Chart
                                            </Link>
                                        </li>
                                    )}
                                </div>


                                {currentUser ? (
                                    <div className="navbar-nav ms-auto">
                                        <li className="nav-item">
                                            <Link to={"/profile"} className="nav-link">
                                                {currentUser.username}
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/login" className="nav-link" onClick={this.logOut}>
                                                LogOut
                                            </a>
                                        </li>
                                    </div>
                                ) : (
                                    <div className="navbar-nav ml-auto navbar__login">
                                        <li className="nav-item">
                                            <Link to={"/login"} className="nav-link">
                                                Login
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link to={"/register"} className="nav-link">
                                                Sign Up
                                            </Link>
                                        </li>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>

                    <div className="app__component">
                        <Switch>
                            <Route exact path={["/", "/home", ""]} component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/profile" component={Profile}/>
                            <Route exact path="/followers-chart" component={VacationFollowersChart}/>
                            <Route path="/admin" component={BoardAdmin}/>
                        </Switch>
                    </div>
                </>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(App);
