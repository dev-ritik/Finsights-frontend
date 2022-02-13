import React from 'react';
import { Link } from 'react-router-dom';

import { 
    Badge,
    Avatar,
    AvatarAddOn,
    Media
} from './../../../../components';

import { randomArray } from './../../../../utilities';

const status = [
    "warning",
    "danger",
    "success",
    "secondary"
];

const tag = [
    "primary",
    "secondary",
    "info"
];


const TrTableMessages = () => (
    <React.Fragment>
        <tr>
            <td className="align-middle">
                <Media>
                    <Media left className="align-self-center mr-3">
                        <Avatar.Image
                            size="sm"
                            src="http://bs4.webkom.co/img/avatars/2.jpg"
                            addOns={[
                                <AvatarAddOn.Icon 
                                    className="fa fa-circle"
                                    color="white"
                                    key="avatar-icon-bg"
                                />,
                                <AvatarAddOn.Icon 
                                    className="fa fa-circle"
                                    color={ randomArray(status) }
                                    key="avatar-icon-fg"
                                />
                            ]}
                        />
                    </Media>
                    <Media body>
                        <div className="mt-0 d-flex text-inverse">
                            Bertram Gilfoyle
                        </div>
                        <span>
                            Goa
                        </span>
                    </Media>
                </Media>
            </td>
            <td className="align-middle">
                <Link to="/apps/email-details">
                    Business-focused coherent parallelism
                </Link>
                <br />
                <div>
                    lerem ipsum
                </div>
                <Badge color={ randomArray(tag) } pill className="mr-1">
                    Toys, Kids & Baby   
                </Badge>
            </td>
            <td className="align-middle text-right">
                30-Jun-2014<br />
                01:54 PM
            </td>
        </tr>
    </React.Fragment>
)

export { TrTableMessages };
