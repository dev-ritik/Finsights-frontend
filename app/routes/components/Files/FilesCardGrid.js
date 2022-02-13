import React from 'react';

import { 
    Card,
    CardBody,
    Badge,
    CardFooter,
    HolderProvider,
    Avatar,
    UncontrolledButtonDropdown,
    DropdownToggle,
    CardImg,
    DropdownMenu,
    DropdownItem,
    AvatarAddOn
} from './../../../components';

import { randomArray, randomAvatar } from './../../../utilities';

const badges = [
    "secondary"
];

const avatarStatus = [
    "secondary",
    "warning",
    "danger",
    "success"
];

const FilesCardGrid = () => (
    <React.Fragment>
            { /* START Card */}
            <Card>
                <HolderProvider.Icon
                    iconChar=""
                    size={ 32 }
                >
                    <CardImg top />
                </HolderProvider.Icon>
                <CardBody>
                    <h6 className="mb-2">
                        Practical Granite Shirt   
                    </h6>
                    <span className="mb-2">
                        22.22 Mb
                    </span>
                    <div className="mb-2">
                        Readme.md<br />
                        bob<br />
                        Sunday, 12 Jan, 2018<br />
                        12:34 PM
                    </div>
                    <div className="mb-3">
                        <Badge color={ randomArray(badges) } pill className="mr-1">
                            Toys, Kids & Baby   
                        </Badge>
                        <Badge color={ randomArray(badges) } pill className="mr-1">
                            Toys, Kids & Baby   
                        </Badge>
                        <Badge color={ randomArray(badges) } pill className="mr-1">
                            Toys, Kids & Baby   
                        </Badge>
                    </div>
                    <div>
                        <Avatar.Image
                            size="md"
                            src={ randomAvatar() }
                            className="mr-3"
                            addOns={[
                                <AvatarAddOn.Icon 
                                    className="fa fa-circle"
                                    color="white"
                                    key="avatar-icon-bg"
                                />,
                                <AvatarAddOn.Icon 
                                    className="fa fa-circle"
                                    color={ randomArray(avatarStatus) }
                                    key="avatar-icon-fg"
                                />
                            ]}
                        />
                        <Avatar.Image
                            size="md"
                            src={ randomAvatar() }
                            className="mr-3"
                            addOns={[
                                <AvatarAddOn.Icon 
                                    className="fa fa-circle"
                                    color="white"
                                    key="avatar-icon-bg"
                                />,
                                <AvatarAddOn.Icon 
                                    className="fa fa-circle"
                                    color={ randomArray(avatarStatus) }
                                    key="avatar-icon-fg"
                                />
                            ]}
                        />
                        <Avatar.Image
                            size="md"
                            src={ randomAvatar() }
                            className="mr-3"
                            addOns={[
                                <AvatarAddOn.Icon 
                                    className="fa fa-circle"
                                    color="white"
                                    key="avatar-icon-bg"
                                />,
                                <AvatarAddOn.Icon 
                                    className="fa fa-circle"
                                    color={ randomArray(avatarStatus) }
                                    key="avatar-icon-fg"
                                />
                            ]}
                        />
                    </div>
                </CardBody>
                <CardFooter>
                    <div className="d-flex">
                        <a href="#" className="align-self-center text-decoration-none">
                            Details<i className="fa fa-fw fa-angle-right ml-1"></i>
                        </a>
                        <UncontrolledButtonDropdown className="align-self-center ml-auto">
                            <DropdownToggle color="link" size="sm" className="pr-0">
                                <i className="fa fa-gear" /><i className="fa fa-angle-down ml-2" />
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <i className="fa fa-fw fa-reply mr-2"></i>
                                    Share
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="fa fa-fw fa-download mr-2"></i>
                                    Download
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="fa fa-fw fa-trash mr-2"></i>
                                    Delete
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="fa fa-fw fa-pencil mr-2"></i>
                                    Edit
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <i className="fa fa-fw fa-files-o mr-2"></i>
                                    Copy
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                </CardFooter>
            </Card>
            { /* END Card */}
    </React.Fragment>
)

export { FilesCardGrid };
