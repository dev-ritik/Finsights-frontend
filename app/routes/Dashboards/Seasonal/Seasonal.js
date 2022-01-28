import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {HeaderMain} from "../../components/HeaderMain";
import {API_URL, image404} from "../../../constants";
import {newSymbolSelection} from "../../../redux/SearchedSymbol";
import {connect} from "react-redux";
import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardImg,
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    UncontrolledButtonDropdown,
    withPageConfig
} from './../../../components';


class Seasonal extends React.Component {
    static propTypes = {
        match: PropTypes.object,
        newSymbolSelection: PropTypes.func,
        pageConfig: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = _.clone(this.INITIAL_STATE)
        this.props.newSymbolSelection({
            'type': `${this.props.match.params.type}`,
            'symbol': `${this.props.match.params.symbol}`,
        })
    }

    INITIAL_STATE = {
        exchange: 'NSE',
        frequency: 'Month',
        weighted: 'Weighted',
        urlParams: '',
        imageLoadFailed: false,
    }

    EXCHANGES = {
        'NSE': 'NSE',
        'BSE': 'BSE'
    }

    FREQUENCIES = {
        'Semi-Month': '15d',
        'Month': '1m',
        'Quarter': 'q'
    }

    WEIGHTED = {
        'Weighted': 'true',
        'Weightless': 'false'
    }

    _resetLayout = () => {
        this.setState(_.clone(this.INITIAL_STATE))
    }

    componentDidMount() {
        this.prevConfig = _.pick(this.props.pageConfig,
            ['pageTitle', 'pageDescription', 'pageKeywords']);
        this.props.pageConfig.changeMeta({
            pageTitle: this.getPageTitle()
        });
    }

    componentWillUnmount() {
        this.props.pageConfig.changeMeta(this.prevConfig);
    }

    componentDidUpdate(prevProps, prevState, ss) {
        if (this.props.match.params.symbol !== prevProps.match.params.symbol) {
            this.props.pageConfig.changeMeta({
                pageTitle: this.getPageTitle()
            });
        }
    }

    getPageTitle() {
        return `${this.props.match.params.symbol} - Seasonal`
    }

    performQuery() {
        const PARAMS = `?duration=${this.FREQUENCIES[this.state.frequency]}&weighted=${this.WEIGHTED[this.state.weighted]}`
        this.setState({urlParams: PARAMS});
    }

    render() {
        return (
            <React.Fragment>
                <Container fluid={false}>
                    <div className="d-flex mt-3 mb-5">
                        <HeaderMain
                            title={`Seasonal : ${this.props.match.params.symbol}`}
                            className="mt-0"
                        />
                        <ButtonToolbar className="ml-auto">
                            {/*<ButtonGroup className="align-self-start mr-2">*/}
                            {/*    <UncontrolledButtonDropdown className="ml-auto flex-column">*/}
                            {/*        <DropdownToggle color="link" className="text-left pl-0 text-decoration-none mb-2">*/}
                            {/*            <i className="fa fa-fw fa-exchange text-body mr-2"/>*/}
                            {/*            {this.state.exchange}<i className="fa fa-angle-down text-body ml-2"/>*/}
                            {/*        </DropdownToggle>*/}
                            {/*        <div className="small">*/}
                            {/*            Exchange*/}
                            {/*        </div>*/}
                            {/*        <DropdownMenu>*/}
                            {/*            <DropdownItem header>*/}
                            {/*                Select Exchange:*/}
                            {/*            </DropdownItem>*/}
                            {/*            /!*{*!/*/}
                            {/*            /!*    Object.keys(this.EXCHANGES).map((key, index) => (*!/*/}
                            {/*            /!*        <DropdownItem key={index} active={this.state.exchange === key}>*!/*/}
                            {/*            /!*            {key}*!/*/}
                            {/*            /!*        </DropdownItem>*!/*/}
                            {/*            /!*    ))*!/*/}
                            {/*            /!*}*!/*/}
                            {/*        </DropdownMenu>*/}
                            {/*    </UncontrolledButtonDropdown>*/}
                            {/*</ButtonGroup>*/}
                            <ButtonGroup className="align-self-start mr-2">
                                <UncontrolledButtonDropdown className="ml-auto flex-column">
                                    <DropdownToggle color="link" className="text-left pl-0 text-decoration-none mb-2">
                                        <i className="fa fa-calendar-o text-body mr-2"/>
                                        {this.state.frequency}<i className="fa fa-angle-down text-body ml-2"/>
                                    </DropdownToggle>
                                    <div className="small">
                                        Group duration
                                    </div>
                                    <DropdownMenu>
                                        <DropdownItem header>
                                            Select duration:
                                        </DropdownItem>
                                        {
                                            Object.keys(this.FREQUENCIES).map((key, index) => (
                                                <DropdownItem key={index} active={this.state.frequency === key}
                                                              onClick={
                                                                  () => {
                                                                      this.setState({frequency: key});
                                                                  }
                                                              }>
                                                    {key}
                                                </DropdownItem>
                                            ))
                                        }
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </ButtonGroup>
                            <ButtonGroup className="align-self-start mr-2">
                                <UncontrolledButtonDropdown className="ml-auto flex-column">
                                    <DropdownToggle color="link" className="text-left pl-0 text-decoration-none mb-2">
                                        {this.state.weighted}<i className="fa fa-angle-down text-body ml-2"/>
                                    </DropdownToggle>
                                    <div className="small">
                                        Weight to recent?
                                    </div>
                                    <DropdownMenu>
                                        <DropdownItem header>
                                            Select weighted:
                                        </DropdownItem>
                                        {
                                            Object.keys(this.WEIGHTED).map((key, index) => (
                                                <DropdownItem key={index} active={this.state.weighted === key}
                                                              onClick={
                                                                  () => {
                                                                      this.setState({weighted: key});
                                                                  }
                                                              }>
                                                    {key}
                                                </DropdownItem>
                                            ))
                                        }
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </ButtonGroup>
                            <ButtonGroup className="align-self-start">
                                <Button color="primary" className="mb-2 mr-2 px-3" onClick={() => {
                                    this.performQuery();
                                }}>
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

                <Row>
                    <Col lg={8}>
                        <Card className="mb-3">
                            <CardImg className="figure-img card-img"
                                     src={`${API_URL}/instrument/${this.props.match.params.symbol}/seasonal${this.state.urlParams}`}
                                     onError={(e) => {
                                         if (e.target.src === image404)
                                             return;
                                         e.target.src = image404
                                     }}
                                     alt="Seasonal analysis"/>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newSymbolSelection: (newSymbol) => {
            dispatch(newSymbolSelection(newSymbol))
        },
    }
}

export default connect(null, mapDispatchToProps)(withPageConfig(Seasonal));