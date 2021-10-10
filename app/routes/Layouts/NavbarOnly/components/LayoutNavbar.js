import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Nav,
    NavItem,
    NavLink,
    Navbar,
    NavbarToggler,
    ThemeConsumer,
} from './../../../../components';

import { NavbarNavigation } from
    './../../../components/Navbars/NavbarNavigation';
import { LogoThemed } from
    './../../../components/LogoThemed/LogoThemed';

export const LayoutNavbar = () => (
    <React.Fragment>
        <Navbar light expand="lg" themed>
            <Link to="/" className="navbar-brand mr-0 mr-sm-3">
                <LogoThemed className="mb-1" checkBackground />
            </Link>

            <Nav pills>
                <NavItem>
                    <NavLink tag={ NavbarToggler } id="navbar-navigation-toggler" className="b-0">
                        <i className="fa fa-fw fa-bars"></i>
                    </NavLink>
                </NavItem>
            </Nav>

            { /* Navigation with Collapse */ }
            <NavbarNavigation pills />

            { /* END Navbar: Left Side */ }
            { /* START Navbar: Right Side */ }
            <Nav className="ml-auto" pills>
            </Nav>
            { /* END Navbar: Right Side */ }
        </Navbar>

        <Navbar light shadow expand="lg" className="py-3 bg-white">
            <h1 className="mb-0 h4">
                Navbar Only
            </h1>
            
            <ThemeConsumer>
            {
                ({ color }) => (
                    <Button color={ color } className="px-4 my-sm-0">
                        Download <i className="fa ml-1 fa-fw fa-download"></i>
                    </Button>
                )
            }
            </ThemeConsumer>
        </Navbar>
    </React.Fragment>
);
