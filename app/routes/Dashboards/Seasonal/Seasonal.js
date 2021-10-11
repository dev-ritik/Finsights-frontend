import React from 'react';
import PropTypes from 'prop-types';
import faker from 'faker/locale/en_US';
import _ from 'lodash';
import {
    Container,
    ButtonToolbar,
    ButtonGroup,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FloatGrid as Grid,
    Card,
    Media,
    CardBody,
    ListGroup,
    ListGroupItem,
    Progress,
    Table,
    CardFooter,
    Button,
    CardHeader, CardImg, HolderProvider

} from './../../../components';
import { applyColumn } from './../../../components/FloatGrid';

import { HeaderMain } from "../../components/HeaderMain";

import {
    WebsitePerformance
} from "../../components/Analytics/WebsitePerformance";
import {
    AudienceMetricsChart
} from "./components/AudienceMetricsChart";
import {
    TinyAreaChart
} from "../../components/Analytics/TinyAreaChart";
import {
    SimpleLineChart
} from "./../../Graphs/ReCharts/components/SimpleLineChart";

import classes from './Analytics.scss';

const LAYOUT = {
    // Fetches the best size going from sm to xxl
    'seasonal-analysis': {h: 14, sm: 4, md: 5, lg: 7, xl: 8, xxl: 9, minH: 8},
}

const SessionByDevice = (props) => (
    <div className={classes['session']}>
        <div className={classes['session__title']}>
            { props.title }
        </div>
        <div className={classes['session__values']}>
            <div className={`${classes['session__percentage']} text-${props.color}`}>
                { props.valuePercent }%
            </div>
            <div className={`${classes['session__value']} text-${props.color}`}>
                { props.value }
            </div>
        </div>
    </div>
);
SessionByDevice.propTypes = {
    title: PropTypes.node,
    color: PropTypes.string,
    valuePercent: PropTypes.string,
    value: PropTypes.string
}

export class Seasonal extends React.Component {
    state = {
        layouts: _.clone(LAYOUT)
    }

    _resetLayout = () => {
        this.setState({
            layouts: _.clone(LAYOUT)
        })
    }

    render() {
        const { layouts } = this.state;

        return (
            <React.Fragment>
                <Container fluid={ false }>
                    <div className="d-flex mt-3 mb-5">
                        <HeaderMain
                            title="Seasonal"
                            className="mt-0"
                        />
                        <ButtonToolbar className="ml-auto">
                            <ButtonGroup className="align-self-start mr-2">
                                <UncontrolledButtonDropdown className="ml-auto flex-column">
                                    <DropdownToggle color="link" className="text-left pl-0 text-decoration-none mb-2">
                                        <i className="fa fa-fw fa-exchange text-body mr-2"></i>
                                        NSE<i className="fa fa-angle-down text-body ml-2"/>
                                    </DropdownToggle>
                                    <div className="small">
                                        Exchange for data source
                                    </div>
                                    <DropdownMenu>
                                        <DropdownItem header>
                                            Select Exchange:
                                        </DropdownItem>
                                        <DropdownItem active>
                                            NSE
                                        </DropdownItem>
                                        <DropdownItem>
                                            BSE
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </ButtonGroup>
                            <ButtonGroup className="align-self-start mr-2">
                                <UncontrolledButtonDropdown className="ml-auto flex-column">
                                    <DropdownToggle color="link" className="text-left pl-0 text-decoration-none mb-2">
                                        <i className="fa fa-calendar-o text-body mr-2"></i>
                                        1 Month<i className="fa fa-angle-down text-body ml-2"/>
                                    </DropdownToggle>
                                    <div className="small">
                                        Group duration
                                    </div>
                                    <DropdownMenu>
                                        <DropdownItem header>
                                            Select duration:
                                        </DropdownItem>
                                        <DropdownItem active>
                                            1 Month
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </ButtonGroup>
                            <ButtonGroup className="align-self-start">
                                <Button color="primary" className="mb-2 mr-2 px-3">
                                    Apply
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Button
                                    color="link"
                                    className="mb-2 text-decoration-none align-self-start"
                                    onClick={this._resetLayout}
                                >
                                    Reset
                                </Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </Container>

                <Grid>
                    <Grid.Row
                        onLayoutChange={layouts => this.setState({layouts})}
                        columnSizes={this.state.layouts}
                        rowHeight={55}
                    >
                        <Grid.Col {...(applyColumn('seasonal-analysis', layouts))}>
                            <Card className="mb-3">
                                <HolderProvider.Icon
                                    iconChar=""
                                    size={32}
                                    className="mb-3"
                                >
                                    <CardImg className="figure-img card-img"
                                             src="https://api.finsights.ritik.ml/instrument/TCS/seasonal"
                                             alt="Seasonal analysis"/>
                                </HolderProvider.Icon>
                            </Card>
                        </Grid.Col>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        );
    }
}
