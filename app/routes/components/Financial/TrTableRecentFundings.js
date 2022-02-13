import React from 'react';
import _ from 'lodash';


const TrTableRecentFundings = () => (
    <React.Fragment>
        {
            _.times(6, (index) => (
                <tr key={ index }>
                    <td className="align-middle">
                        <span className="text-inverse">Apple</span>
                    </td>
                    <td className="align-middle">
                        $4.00
                    </td>
                    <td className="align-middle text-nowrap">
                        20-02-2015
                    </td>
                    <td className="align-middle text-right text-nowrap">
                        <a href="#" className="text-decoration-none">View <i className="fa fa-angle-right"></i></a>
                    </td>
                </tr>
            ))
        }
    </React.Fragment>
)

export { TrTableRecentFundings };
