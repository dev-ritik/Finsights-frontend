import React from 'react';

import { 
    Card,
    CardImg,
    HolderProvider,
    Media,
    Avatar,
    AvatarAddOn,
    Badge,
    CardBody
} from './../../../components';

import { randomArray, randomAvatar } from '../../../utilities';
import {API_URL} from "../../../constants";

const status = [
    "warning",
    "danger",
    "success",
    "secondary"
];
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

const VideosResultsCard = () => (
    <React.Fragment>
        <Card className="mb-3">
            <div className="row">
                <div className="col-md-4">
                    <HolderProvider.Icon
                        iconChar=""
                        size={ 32 }
                        width="100p"
                        height={350}
                    >
                        <CardImg height="100px" />
                    </HolderProvider.Icon>
                </div>
                <div className="col-md-8 py-2">
                    <CardBody>
                        <div>
                            <a href="#" className="h6 mb-0">
                                Practical Granite Shirt
                            </a>
                        </div>
                        <div className="text-success mb-3">
                            {API_URL}
                        </div>
                        <div className="mb-3">
                            Lorem ipsum
                        </div>
                        <div>
                            { randomArray(stars) } <span className="ml-2">16 Reviews</span>
                        </div>
                        <div className="mb-2">
                            <Badge color="secondary" pill className="mr-1">
                                {API_URL}
                            </Badge>
                            <Badge color="secondary" pill className="mr-1">
                                {API_URL}
                            </Badge>
                            <Badge color="secondary" pill className="mr-1">
                                {API_URL}
                            </Badge>                       
                        </div>
                        <div>
                            <Media>
                                <Media left className="align-self-center mr-3">
                                    <Avatar.Image
                                        size="sm"
                                        src={ randomAvatar() }
                                        addOns={[
                                            <AvatarAddOn.Icon 
                                                className="fa fa-circle"
                                                color="white"
                                                key="avatar-icon-bg"
                                            />,
                                            <AvatarAddOn.Icon 
                                                className="fa fa-circle"
                                                color={ randomArray(status) }
                                                key="avatar-icon-fg"
                                            />
                                        ]}
                                    /> 
                                </Media>
                                <Media body>
                                    <div className="mt-0">
                                        Bertram Gilfoyle
                                    </div>
                                </Media>
                            </Media>  
                        </div>  
                    </CardBody>
                </div>
            </div>
        </Card>
    </React.Fragment>
)

export { VideosResultsCard };
