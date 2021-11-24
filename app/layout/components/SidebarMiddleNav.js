import React from 'react';

import {SidebarMenu} from './../../components';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import {addAlert} from "../../redux/Alert";

export const SidebarMiddleNav = (props) => {
    const lastSearched = useSelector((state) => state.searchedSymbol)
    const dispatch = useDispatch()

    return (
        <SidebarMenu>
            <SidebarMenu.Item
                icon={<i className="fa fa-fw fa-home"/>}
                title="Home"
                to='/' exact
            />
            <SidebarMenu.Item
                icon={<i className="fa fa-fw fa-newspaper-o"/>}
                title="News"
                to='/news' exact
            />
            <SidebarMenu.Item
                icon={<i className="fa fa-fw fa-info-circle"/>}
                title="About"
                to='/about' exact
            />
            <SidebarMenu.Item
                icon={<i className="fa fa-fw fa-line-chart"/>}
                title="Analysis"
            >
                <SidebarMenu.Item title="Seasonal" to='seasonal' onToggle={() => {
                    if (lastSearched.lastSearch.symbol === "") {
                        dispatch(addAlert({
                            title: "Attention!",
                            message: "Search a Stock first!!",
                            colour: "dark"
                        }));
                    } else {
                        if (!_.includes(props.history.location.pathname, 'seasonal')) {
                            props.history.push(`/analysis/${lastSearched.lastSearch.type}/NSE/${lastSearched.lastSearch.symbol}/seasonal`)
                        }
                    }
                }} runOnClick={true} exact={false}/>
                <SidebarMenu.Item
                    title="News"
                    to='news' onToggle={() => {
                    if (lastSearched.lastSearch.symbol === "") {
                        dispatch(addAlert({
                            title: "Attention!",
                            message: "Search a Stock first!!",
                            colour: "dark"
                        }));
                    } else {
                        props.history.push(`/analysis/${lastSearched.lastSearch.type}/NSE/${lastSearched.lastSearch.symbol}/news`)
                    }
                }} runOnClick={true} exact={false}
                />
            </SidebarMenu.Item>
        </SidebarMenu>
    )
};


SidebarMiddleNav.propTypes = {
    history: PropTypes.object
}
