import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {
    Button,
    CustomInput,
    EmptyLayout,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    ThemeConsumer
} from './../../../components';

import {HeaderAuth} from "../../components/Pages/HeaderAuth";
import {FooterAuth} from "../../components/Pages/FooterAuth";
import {ADMIN_EMAIL} from "../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../../redux/User";
import {Redirect} from "react-router";
import {addAlert} from "../../../redux/Alert";

const initialState = {
    email: "",
    password1: "",
    password2: "",
    firstName: "",
    lastName: "",
}

const Register = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.userInfo)
    const [registerState, setRegisterState] = useState(initialState);

    const attemptRegister = () => {
        if (registerState.email.trim() === "") {
            dispatch(addAlert({
                title: "Warning!",
                message: "Enter a valid email",
                colour: "warning"
            }));
        } else if (registerState.password1.trim() === "") {
            dispatch(addAlert({
                title: "Warning!",
                message: "Enter a password",
                colour: "warning"
            }));
        } else if (registerState.password2.trim() === "") {
            dispatch(addAlert({
                title: "Warning!",
                message: "Passwords don't match",
                colour: "warning"
            }));
        } else {
            dispatch(register({
                email: registerState.email,
                password: registerState.password1,
            }));
        }
    }

    useEffect(() => {
        if (userInfo.refreshToken) {
            dispatch(addAlert({
                title: "Success!",
                message: "Account created successfully",
                colour: "success"
            }));
        }
    }, []);

    if (userInfo.refreshToken) {
        return <Redirect to='/'/>;
    }

    return (
        <EmptyLayout>
            <EmptyLayout.Section center width={480}>
                { /* START Header */}
                <HeaderAuth
                    title="Create Account"
                />
                { /* END Header */}
                { /* START Form */}
                <Form className="mb-3">
                    <FormGroup>
                        <Label for="firstname">
                            First Name
                        </Label>
                        <Input type="text" name="text" id="firstname" placeholder="Enter your Firstname..."
                               className="bg-white"
                               onChange={(e) => {
                                   setRegisterState({
                                       ...registerState,
                                       firstName: e.target.value
                                   })
                               }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastname">
                            Last Name
                        </Label>
                        <Input type="text" name="text" id="lastname" placeholder="Enter your lastname..."
                               className="bg-white"
                               onChange={(e) => {
                                   setRegisterState({
                                       ...registerState,
                                       lastName: e.target.value
                                   })
                               }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">
                            Password
                        </Label>
                        <Input type="password" name="password" id="password" placeholder="Password..."
                               className="bg-white"
                               onChange={(e) => {
                                   setRegisterState({
                                       ...registerState,
                                       password1: e.target.value
                                   })
                               }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="repeatPassword">
                            Repeat Password
                        </Label>
                        <Input type="password" name="password" id="repeatPassword" placeholder="Password..."
                               className="bg-white"
                               onChange={(e) => {
                                   setRegisterState({
                                       ...registerState,
                                       password2: e.target.value
                                   })
                               }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="emailAddress">
                            Email Adress
                        </Label>
                        <Input type="email" name="email" id="emailAddress" placeholder="Enter email..."
                               className="bg-white"
                               onChange={(e) => {
                                   setRegisterState({
                                       ...registerState,
                                       email: e.target.value
                                   })
                               }}
                        />
                        <FormText color="muted">
                            We&#39;ll never share your email with anyone else.
                        </FormText>
                    </FormGroup>
                    <FormGroup>
                        <CustomInput type="checkbox" id="acceptTerms" label="Accept Terms and Privacy Policy" inline/>
                    </FormGroup>
                    <ThemeConsumer>
                        {
                            ({color}) => (
                                <Button color={color} block
                                        onClick={() => {
                                            attemptRegister();
                                        }}
                                >
                                    Create Account
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
                    <Link to="/login" className="ml-auto text-decoration-none">
                        Login
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

export default Register;
