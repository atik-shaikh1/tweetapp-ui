import React, { Component } from 'react'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginLogout/LoginComponent'
import AuthenticatedRoute from './AuthenticatedRoute'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ErrorComponent from './ErrorComponent'
import Register from './register/Register'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import ParentComponent from './ParentComponent'
import UserComponent from './Users/UserComponent'
import HeaderComponent from './HeaderFooter/HeaderComponent'


class TweetApp extends Component {

    constructor(props) {
        super(props)
    
    
    }

    render() {
        return (
            <div className='TweetApp'>
                <div className="container">

                    <Router>
                        <>
                            <HeaderComponent/> 
                            <Switch>
                                <Route path="/" exact component={ParentComponent} />
                                <Route path="/register" exact component={Register} />
                                <Route path="/login" exact component={ParentComponent} />
                                <Route path="/forgot-password" exact component={ForgotPassword} />
                                <Route path="/users"  exact component={UserComponent} />
                                <AuthenticatedRoute path="/welcome" exact component={WelcomeComponent} />
                                <Route component={ErrorComponent} />
                            </Switch>
                            {/* <FooterComponent /> */}

                        </>
                    </Router>
                </div>
            </div>
        )
    }
}

export default TweetApp