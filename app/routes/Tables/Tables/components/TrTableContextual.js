import React from 'react';
import _ from 'lodash';

import { 
    Badge
} from './../../../../components';

/*eslint-disable */
const trColor = [
    "table-active",
    "",

    "table-success",
    "",

    "table-info",
    "",

    "table-warning",
    "",

    "table-danger",
    "",

    "table-primary",
    ""
];
/*eslint-enable */
/*eslint-disable */
const statusColor = [
    "secondary",
    "secondary",

    "success",
    "secondary",

    "info",
    "secondary",

    "warning",
    "secondary",

    "danger",
    "secondary",

    "primary",
    "secondary"
];
/*eslint-enable */

const TrTableContextual = () => (
    <React.Fragment>
        {
            _.times(12, (index) => (
                <tr className={ trColor[index%12] } key={ index }>
                    <td className="align-middle">
                        #8493
                    </td>
                    <td className="align-middle">
                        Bertram Gilfoyle
                    </td>
                    <td className="align-middle">
                        Sunday, 12 Jan, 2018
                    </td>
                    <td className="align-middle">
                         $ 22.22
                    </td>
                    <td className="align-middle">
                        <Badge color={ statusColor[index%12] }>
                            Investment Account
                        </Badge>
                    </td>
                    <td className="align-middle text-right">
                        French Guiana
                    </td>
                </tr>
            ))
        }
    </React.Fragment>
)

export { TrTableContextual };
