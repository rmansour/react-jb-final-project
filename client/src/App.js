import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Route, Router, Switch} from "react-router-dom";

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

// components
import Login from './components/login';
import Register from "./components/register";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";

// actions, helpers and history
import {logout} from "./actions/auth";
import {clearMessage} from "./actions/messages";
import {history} from './helpers/history';

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined
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

        return (
            <Router history={history}>
                    <>
                        <nav className="navbar navbar-expand bg-light">
                            <div className="navbar-nav mr-auto navbar__home">
                                <Link to={"/"} className="navbar-brand">
                                    Travel Agency
                                </Link>
                                <div className="navbar-nav mr-auto">
                                    {showAdminBoard && (
                                        <li className="nav-item">
                                            <Link to={"/admin"} className="nav-link">
                                                Admin Board
                                            </Link>
                                        </li>
                                    )}

                                    {currentUser && (
                                        <li className="nav-item">
                                            <Link to={"/user"} className="nav-link">
                                                User
                                            </Link>
                                        </li>
                                    )}
                                </div>
                            </div>

                            {currentUser ? (
                                <div className="navbar-nav ml-auto navbar__login">
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
                        </nav>

                        <div className="app__component">
                            <Switch>
                                <Route exact path={["/", "/home"]} component={Home}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/profile" component={Profile}/>
                                <Route path="/user" component={BoardUser}/>
                                <Route path="/admin" component={BoardAdmin}/>
                                {/*<Route path="/vacation-info/:id" component={VacationCard}></Route>*/}
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
