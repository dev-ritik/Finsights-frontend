import React from 'react';
import _ from 'lodash';

import { 
    Badge
} from './../../../../components';

/*eslint-disable */
const payment = [
    "success",
    "danger",
    "warning",
    "secondary"
];
/*eslint-enable */

const TrTableSmall = () => (
    <React.Fragment>
        {
            _.times(4, (index) => (
                <tr key={ index }>
                    <td className="align-middle">
                        #8493
                    </td>
                    <td className="align-middle">
                        Bertram Gilfoyle
                    </td>
                    <td className="align-middle">
                        $ 22.22
                    </td>
                    <td className="align-middle text-right">
                        <Badge pill color={ payment[index%4] }>
                            deposit
                        </Badge>
                    </td>
                </tr>
            ))
        }
    </React.Fragment>
)

export { TrTableSmall };
