import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {Button, EmptyLayout, Form, FormGroup, FormText, Input, Label, ThemeConsumer} from './../../../components';

import {HeaderAuth} from "../../components/Pages/HeaderAuth";
import {FooterAuth} from "../../components/Pages/FooterAuth";
import {ADMIN_EMAIL} from "../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../redux/User";
import {Redirect} from "react-router";
import {addNotification} from "../../../redux/Notification";


const initialState = {
    email: "",
    password: "",
    // rememberPassword: false,
}

const Login = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.userInfo)
    const [loginState, setLoginState] = useState(initialState);

    const attemptLogin = () => {
        if (loginState.email.trim() === "") {
            dispatch(addNotification({
                title: "Warning!",
                message: "Enter a valid email",
                colour: "warning"
            }));
        } else if (loginState.password.trim() === "") {
            dispatch(addNotification({
                title: "Warning!",
                message: "Enter a password",
                colour: "warning"
            }));
        } else {
            dispatch(login(loginState));
        }
    }

    useEffect(() => {
        if (userInfo.refreshToken) {
            dispatch(addNotification({
                title: "Success!",
                message: "Logged in",
                colour: "success"
            }));
        }
    }, []);

    if (userInfo.refreshToken) {
        return <Redirect to='/'/>;
    }

    return (
        <EmptyLayout>
            <EmptyLayout.Section center>
                { /* START Header */}
                <HeaderAuth
                    title="Sign In"
                />
                { /* END Header */}
                { /* START Form */}
                <Form className="mb-3">
                    <FormGroup>
                        <Label for="emailAddress">
                            Email Address
                        </Label>
                        <Input type="email" name="email" id="emailAddress" placeholder="Enter email..."
                               className="bg-white"
                               onChange={(e) => {
                                   setLoginState({
                                       ...loginState,
                                       email: e.target.value
                                   })
                               }}
                        />
                        <FormText color="muted">
                            We&#39;ll never share your email with anyone else.
                        </FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">
                            Password
                        </Label>
                        <Input type="password" name="password" id="password" placeholder="Password..."
                               className="bg-white"
                               onChange={(e) => {
                                   setLoginState({
                                       ...loginState,
                                       password: e.target.value
                                   })
                               }}
                        />
                    </FormGroup>
                    {/*<FormGroup>*/}
                    {/*    <CustomInput type="checkbox" id="rememberPassword" label="Remember Password" inline*/}
                    {/*                 onClick={(e) => {*/}
                    {/*                     setLoginState({*/}
                    {/*                         ...loginState,*/}
                    {/*                         rememberPassword: e.target.checked*/}
                    {/*                     })*/}
                    {/*                 }}/>*/}
                    {/*</FormGroup>*/}
                    <ThemeConsumer>
                        {
                            ({color}) => (
                                <Button color={color} block
                                        onClick={() => {
                                            attemptLogin();
                                        }}
                                >
                                    Sign In
                                </Button>
                            )
                        }
                    </ThemeConsumer>
                </Form>
                { /* END Form */}
                { /* START Bottom Links */}
                <div className="d-flex mb-5">
                    <a
                        href={`mailto:${ADMIN_EMAIL}?subject=Finsights%3A%20Forgot%20password&body=Hi%20there%2C%0A%0AI%20don't%20remember%20my%20password.%20Can%20you%20help%20me%20pls!%0A%0AThanks!`}
                        target="_blank" rel="noopener noreferrer"
                        className="text-decoration-none"
                    >
                        Forgot Password
                    </a>
                    <Link to="/register" className="ml-auto text-decoration-none">
                        Register
                    </Link>
                </div>
                { /* END Bottom Links */}
                { /* START Footer */}
                <FooterAuth/>
                { /* END Footer */}
            </EmptyLayout.Section>
        </EmptyLayout>
    )
};

export default Login;
