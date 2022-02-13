import React from 'react';

import { 
    Card,
    CardBody
} from './../../../components';

import { randomArray } from './../../../utilities';

const stars = [
    <span key="stars5">
        <i className="fa fa-fw fa-star text-warning" />
        <i className="fa fa-fw fa-star text-warning"></i>
        <i className="fa fa-fw fa-star text-warning"></i>
        <i className="fa fa-fw fa-star text-warning"></i>
        <i className="fa fa-fw fa-star text-warning"></i>
    </span>,
    <span key="stars4">
        <i className="fa fa-fw fa-star text-warning" />
        <i className="fa fa-fw fa-star text-warning"></i>
        <i className="fa fa-fw fa-star text-warning"></i>
        <i className="fa fa-fw fa-star text-warning"></i>
        <i className="fa fa-fw fa-star-o"></i>
    </span>,
    <span key="stars4">
        <i className="fa fa-fw fa-star text-warning" />
        <i className="fa fa-fw fa-star text-warning"></i>
        <i className="fa fa-fw fa-star text-warning"></i>
        <i className="fa fa-fw fa-star-o"></i>
        <i className="fa fa-fw fa-star-o"></i>
    </span>,
    <span key="stars2">
        <i className="fa fa-fw fa-star text-warning" />
        <i className="fa fa-fw fa-star text-warning"></i>
        <i className="fa fa-fw fa-star-o"></i>
        <i className="fa fa-fw fa-star-o"></i>
        <i className="fa fa-fw fa-star-o"></i>
    </span>,
    <span key="stars1">
        <i className="fa fa-fw fa-star text-warning" />
        <i className="fa fa-fw fa-star-o"></i>
        <i className="fa fa-fw fa-star-o"></i>
        <i className="fa fa-fw fa-star-o"></i>
        <i className="fa fa-fw fa-star-o"></i>
    </span>,
];

const SearchResultsCard = () => (
    <React.Fragment>
        <Card className="mb-3">
            <CardBody>
                <a href="#" className="h6 text-decoration-none">
                    lerem ipsum
                </a>
                <br />
                <div className="mb-2">
                    <span className="text-success">
                        https://finsights.ml/
                    </span>
                    <span className="mx-2">·</span>
                    { randomArray(stars) }
                    <span className="mx-2">·</span>
                    <span>
                        Votes
                    </span>
                </div>
                <p className="mb-0">
                    Lorem ipsum
                </p>
            </CardBody>
        </Card>
    </React.Fragment>
)

export { SearchResultsCard };
