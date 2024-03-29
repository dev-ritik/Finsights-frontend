import React from 'react';
import _ from 'lodash';
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [
    {
        dataField: 'id',
        text: 'Product ID'
    }, {
        dataField: 'name',
        text: 'Product Name'
    }, {
        dataField: 'price',
        text: 'Product Price'
    }
];

const data = _.times(5, (index) => ({
    id: index,
    name: "Smart Phone",
    price: Math.round(2000 + Math.random() * 500)
}));

export const BasicTable = () => (
    <React.Fragment>
        <h6 className="mt-0">
            Basic Table
        </h6>
        <BootstrapTable
            classes="table-responsive-sm"
            keyField='id'
            data={ data }
            columns={ columns }
            bordered={ false }
        />
    </React.Fragment>
);
