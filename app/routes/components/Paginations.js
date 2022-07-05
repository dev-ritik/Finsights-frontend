import React from 'react';

import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import PropTypes, {number, string} from "prop-types";
import _ from "lodash";

export class Paginations extends React.Component {

    render() {
        let arrows_required = false;
        if (this.props.page_count > this.props.max_boxes - 2)
            arrows_required = true

        let show_left_double_arrow = false;
        let show_right_double_arrow = false;

        let boxes_left = this.props.max_boxes - 1;
        if (arrows_required) {
            // Calculate available boxes and whether to show double arrows
            if (this.props.active === 1) {
                boxes_left = this.props.max_boxes - 2;
                show_right_double_arrow = true
            } else if (this.props.active < Math.ceil((this.props.max_boxes - 2) / 2)) {
                show_right_double_arrow = true
                boxes_left = this.props.max_boxes - 3;
            }
            if (this.props.active >= Math.ceil((this.props.max_boxes - 2) / 2) && this.props.active <= this.props.page_count + 1 - Math.ceil((this.props.max_boxes - 2) / 2)) {
                show_left_double_arrow = true
                show_right_double_arrow = true
                boxes_left = this.props.max_boxes - 4;
            } else if (this.props.page_count + 1 - this.props.active < Math.ceil((this.props.max_boxes - 2) / 2)) {
                show_left_double_arrow = true
                boxes_left = this.props.max_boxes - 3;
            } else if (this.props.active === this.props.page_count) {
                boxes_left = this.props.max_boxes - 2;
                show_left_double_arrow = true
            }
        }

        boxes_left = Math.min(boxes_left, this.props.page_count);

        let start_index = 1;

        if (this.props.active > boxes_left / 2) {
            start_index = this.props.active - Math.floor(boxes_left / 2);
        }

        let end_index = start_index + boxes_left;
        if (end_index > this.props.page_count) {
            end_index = this.props.page_count + 1;
            start_index = end_index - boxes_left;
        }

        return (
            <Pagination aria-label="Page navigation example" className={`d-flex ${this.props.style}`}>
                {show_left_double_arrow &&
                    <PaginationItem onClick={() => {
                        this.props.goToPage(1);
                    }}>
                        <PaginationLink previous>
                            <i className="fa fa-fw fa-angle-double-left"/>
                        </PaginationLink>
                    </PaginationItem>
                }
                {arrows_required && this.props.active > 1 &&
                    <PaginationItem onClick={() => {
                        if (this.props.active > 1) {
                            this.props.goToPage(this.props.active - 1);
                        }
                    }}>
                        <PaginationLink previous>
                            <i className="fa fa-fw fa-angle-left"/>
                        </PaginationLink>
                    </PaginationItem>
                }

                {Array.from(_.range(start_index, end_index), (data, index) =>
                    <PaginationItem active={this.props.active === data} key={index} onClick={() => {
                        this.props.goToPage(data);
                    }}>
                        <PaginationLink>
                            {data}
                        </PaginationLink>
                    </PaginationItem>)}
                {arrows_required && this.props.active < this.props.page_count &&
                    <PaginationItem onClick={() => {
                        if (this.props.active < this.props.page_count) {
                            this.props.goToPage(this.props.active + 1);
                        }
                    }}>
                        <PaginationLink next>
                            <i className="fa fa-fw fa-angle-right"/>
                        </PaginationLink>
                    </PaginationItem>
                }
                {show_right_double_arrow &&
                    <PaginationItem onClick={() => {
                        this.props.goToPage(this.props.page_count);
                    }}>
                        <PaginationLink previous>
                            <i className="fa fa-fw fa-angle-double-right"/>
                        </PaginationLink>
                    </PaginationItem>
                }
            </Pagination>
        );
    }
}

Paginations.propTypes = {
    page_count: number,
    active: number,
    goToPage: PropTypes.func,
    style: string,
    max_boxes: number, // Max number of Pagination Item
};
Paginations.defaultProps = {
    page_count: 1,
    active: 1,
    goToPage: () => null,
    style: "justify-content-center",
    max_boxes: 7,
};
