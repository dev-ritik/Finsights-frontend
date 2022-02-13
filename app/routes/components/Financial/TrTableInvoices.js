import React from 'react';
import _ from 'lodash';
import {
    Media, 
    Avatar,
    AvatarAddOn
} from './../../../components';

import { randomAvatar } from './../../../utilities';

const TrTableInvoices = () => (
    <React.Fragment>
        {
            _.times(6, (index) => (
                <tr key={ index }>
                    <td className="align-middle">
                        <span className="text-inverse">Apple</span><br />
                        facilitate
                    </td>
                    <td className="align-middle">
                        $4.00
                    </td>
                    <td className="align-middle text-nowrap">
                        25-May-2018
                    </td>
                    <td className="align-middle">
                        <Media>
                            <Media left className="align-self-center mr-4">
                                <Avatar.Image
                                    size="md"
                                    src={ randomAvatar() }
                                    addOns={[
                                        <AvatarAddOn.Icon 
                                            className="fa fa-circle"
                                            color="white"
                                            key="avatar-icon-bg"
                                        />,
                                        <AvatarAddOn.Icon 
                                            className="fa fa-circle"
                                            color="danger"
                                            key="avatar-icon-fg"
                                        />
                                    ]}
                                /> 
                            </Media>
                            <Media body>
                                <span className="d-flex mb-1">
                                    <span className="mt-0 d-flex h6 mb-0">
                                        Bertram Gilfoyle
                                    </span>
                                </span>
                                <p className="mb-0">
                                    Engineer
                                </p>
                            </Media>
                        </Media>
                    </td>
                    <td className="align-middle">
                        <a href="#" className="text-decoration-none">
                            mick@suits.us
                        </a><br />
                        +919632587410
                    </td>
                    <td className="text-right align-middle text-nowrap">
                        <a href="#" className="text-decoration-none">View <i className="fa fa-angle-right"></i></a>
                    </td>
                </tr>
            ))
        }
    </React.Fragment>
)

export { TrTableInvoices };
