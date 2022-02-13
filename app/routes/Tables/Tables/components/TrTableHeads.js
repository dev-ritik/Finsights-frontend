import React from 'react';
import _ from 'lodash';

import { 
    Badge
} from './../../../../components';

/*eslint-disable */
const colorStatus = [
    "danger",
    "success",
    "warning",
    "secondary"
];
/*eslint-enable */

const TrTableHeads = () => (
    <React.Fragment>
        {
            _.times(4, (index) => (
                <tr key={ index }>
                    <td className="align-middle">
                        1
                    </td>
                    <td className="align-middle">
                        { "Bertram" }
                    </td>
                    <td className="align-middle">
                        { "Gilfoyle" }
                    </td>
                    <td className="align-middle">
                        mike@suits.us
                    </td>
                    <td className="align-middle">
                        bob
                    </td>
                    <td className="align-middle text-right">
                        <Badge color={ colorStatus[index%4] }>
                            { "Engineer" }
                        </Badge>
                    </td>
                </tr>
            ))
        }
    </React.Fragment>
)

export { TrTableHeads };
