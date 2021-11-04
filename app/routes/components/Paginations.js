import React from 'react';

import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import PropTypes, {number} from "prop-types";

export class Paginations extends React.Component {

    render() {
        return (
            <Pagination aria-label="Page navigation example" className="d-flex justify-content-center">
                <PaginationItem>
                    <PaginationLink previous>
                        <i className="fa fa-fw fa-angle-left"/>
                    </PaginationLink>
                </PaginationItem>
                {Array.from(Array(this.props.page_count), (data, index) =>
                    <PaginationItem active={this.props.active === (index + 1)} key={index} onClick={() => {
                        this.props.goToPage(index + 1)
                    }}>
                        <PaginationLink>
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>)}
                <PaginationItem>
                    <PaginationLink next>
                        <i className="fa fa-fw fa-angle-right"/>
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        );
    }
}

Paginations.propTypes = {
    page_count: number,
    active: number,
    goToPage: PropTypes.func,
};
Paginations.defaultProps = {
    page_count: 1,
    active: 1,
    goToPage: () => null,
};
