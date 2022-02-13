import React from 'react';
import _ from 'lodash';

import { 
    Badge,
    UncontrolledTooltip,
} from './../../../../components';

/*eslint-disable */
const payment = [
    <Badge color="primary">
        Premium
    </Badge>,
    <Badge color="info">
        Basic
    </Badge>,
    <Badge color="warning">
        Pro
    </Badge>,
    <Badge color="danger">
        Advanced
    </Badge>,
    <Badge color="secondary">
        Free
    </Badge>
];
/*eslint-enable */
/*eslint-disable */
const receipt = [
    <td className="align-middle text-right">
        <a href="#" id="UncontrolledTooltipDownload">
            <i className="fa fa-fw fa-download text-primary"></i>
        </a>
        <UncontrolledTooltip placement="left" target="UncontrolledTooltipDownload">
            Download
        </UncontrolledTooltip>
    </td>,
    <td className="align-middle text-right">
    </td>
];
/*eslint-enable */
/*eslint-disable */
const paymentMethod = [
    <td className="align-middle">
        <i className="fa fa-fw fa-paypal text-primary mr-2"></i>
        mike@suits.us
    </td>,
    <td className="align-middle">
        <i className="fa fa-fw fa-credit-card-alt mr-2"></i>
        Visa 4*** **** **** 9221
    </td>
];
/*eslint-enable */
/*eslint-disable */
const status = [
    <td className="align-middle">
        <i className="fa fa-fw fa-check text-success"></i>
    </td>,
    <td className="align-middle">
        <i className="fa fa-fw fa-close text-danger"></i>
    </td>
];
/*eslint-enable */

const TrTableBorderless = () => (
    <React.Fragment>
        {
            _.times(5, (index) => (
                <tr key={ index }>
                    { status[index%2] }
                    <td className="align-middle">
                        <samp>500</samp>
                    </td>
                    <td className="align-middle">
                        Sunday, 12 Jan, 2018
                    </td>
                    <td className="align-middle text-inverse">
                        $ 22.22
                    </td>
                    <td className="align-middle">
                        { payment[index%5] }
                    </td>
                    { paymentMethod[index%2] }
                    { receipt[index%2] }
                </tr>
            ))
        }
    </React.Fragment>
)

export { TrTableBorderless };
