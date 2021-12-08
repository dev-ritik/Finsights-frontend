import React from 'react';

import {SidebarMenu} from './../../components';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import {addAlert} from "../../redux/Alert";

export const SidebarMiddleNav = (props) => {
    const lastSearched = useSelector((state) => state.searchedSymbol)
    const userInfo = useSelector((state) => state.userInfo)
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
            <SidebarMenu.Item
                icon={<i className="fa fa-fw fa-shopping-bag"/>}
                title="Wishlist"
                to='wishlist' onToggle={() => {
                if (!userInfo.refreshToken) {
                    dispatch(addAlert({
                        title: "Login required!",
                        message: "Please log in to access wishlist!!",
                        colour: "warning"
                    }));
                } else {
                    props.history.push(`/wishlist`)
                }
            }} runOnClick={true} exact={false}
            />
            <SidebarMenu.Item
                icon={<i className="fa fa-fw fa-info-circle"/>}
                title="About"
                to='/about' exact
            />
        </SidebarMenu>
    )
};


SidebarMiddleNav.propTypes = {
    history: PropTypes.object
}
