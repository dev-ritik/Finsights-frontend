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
            <SidebarMenu.Item
                icon={<i className="fa fa-fw fa-th"/>}
                title="Widgets"
                to='/widgets'
            />
            { /* -------- Cards ---------*/}
            <SidebarMenu.Item
                icon={<i className="fa fa-fw fa-clone"/>}
                title="Cards"
            >
                <SidebarMenu.Item title="Cards" to='/cards/cards' exact/>
                <SidebarMenu.Item title="Cards Headers" to='/cards/cardsheaders' exact/>
            </SidebarMenu.Item>
            { /* -------- Layouts ---------*/}
            <SidebarMenu.Item
                icon={<i className="fa fa-fw fa-columns"/>}
                title="Layouts"
            >
                <SidebarMenu.Item title="Navbar" to='/layouts/navbar' exact/>
                <SidebarMenu.Item title="Sidebar" to='/layouts/sidebar' exact/>
                <SidebarMenu.Item title="Sidebar A" to='/layouts/sidebar-a' exact/>
                <SidebarMenu.Item title="Sidebar With Navbar" to="/layouts/sidebar-with-navbar" exact/>
                <SidebarMenu.Item title="Drag &amp; Drop" to='/layouts/dnd-layout' exact/>
            </SidebarMenu.Item>
            { /* -------- Interface ---------*/}
            <SidebarMenu.Item
                icon={<i className="fa fa-fw fa-toggle-on"/>}
                title="Interface"
            >
                <SidebarMenu.Item title="Colors" to='/interface/colors'/>
                <SidebarMenu.Item title="Typography" to='/interface/typography'/>
                <SidebarMenu.Item title="Buttons" to='/interface/buttons'/>
                <SidebarMenu.Item title="Paginations" to='/interface/paginations'/>
                <SidebarMenu.Item title="Images" to='/interface/images'/>
                <SidebarMenu.Item title="Avatars" to='/interface/avatars'/>
                <SidebarMenu.Item title="Progress Bars" to='/interface/progress-bars'/>
                <SidebarMenu.Item title="Badges &amp; Labels" to='/interface/badges-and-labels'/>
                <SidebarMenu.Item title="Media Objects" to='/interface/media-objects'/>
                <SidebarMenu.Item title="List Groups" to='/interface/list-groups'/>
                <SidebarMenu.Item title="Alerts" to='/interface/alerts'/>
                <SidebarMenu.Item title="Accordions" to='/interface/accordions'/>
                <SidebarMenu.Item title="Tabs Pills" to='/interface/tabs-pills'/>
                <SidebarMenu.Item title="Tooltips &amp; Popovers" to='/interface/tooltips-and-popovers'/>
                <SidebarMenu.Item title="Dropdowns" to='/interface/dropdowns'/>
                <SidebarMenu.Item title="Modals" to='/interface/modals'/>
                <SidebarMenu.Item title="Breadcrumbs" to='/interface/breadcrumbs'/>
                <SidebarMenu.Item title="Navbars" to='/interface/navbars'/>
                <SidebarMenu.Item title="Notifications" to='/interface/notifications'/>
                <SidebarMenu.Item title="Crop Image" to='/interface/crop-image'/>
                <SidebarMenu.Item title="Drag &amp; Drop Elements" to='/interface/drag-and-drop-elements'/>
                <SidebarMenu.Item title="Calendar" to='/interface/calendar'/>
            </SidebarMenu.Item>
            { /* -------- Graphs ---------*/}
            <SidebarMenu.Item
                icon={<i className="fa fa-fw fa-pie-chart"/>}
                title="Graphs"
            >
                <SidebarMenu.Item title="ReCharts" to='/graphs/re-charts'/>
            </SidebarMenu.Item>
            { /* -------- Forms ---------*/}
            <SidebarMenu.Item
                icon={<i className="fa fa-fw fa-check-square-o"/>}
                title="Forms"
            >
                <SidebarMenu.Item title="Forms" to='/forms/forms'/>
                <SidebarMenu.Item title="Forms Layouts" to='/forms/forms-layouts'/>
                <SidebarMenu.Item title="Input Groups" to='/forms/input-groups'/>
                <SidebarMenu.Item title="Wizard" to='/forms/wizard'/>
                <SidebarMenu.Item title="Text Mask" to='/forms/text-mask'/>
                <SidebarMenu.Item title="Typeahead" to='/forms/typeahead'/>
                <SidebarMenu.Item title="Toggles" to='/forms/toggles'/>
                <SidebarMenu.Item title="Editor" to='/forms/editor'/>
                <SidebarMenu.Item title="Date Picker" to='/forms/date-picker'/>
            <SidebarMenu.Item title="Dropzone" to='/forms/dropzone' />
            <SidebarMenu.Item title="Sliders" to='/forms/sliders' />
        </SidebarMenu.Item>
        { /* -------- Tables ---------*/ }
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-trello"/>}
            title="Tables"
        >
            <SidebarMenu.Item title="Tables" to='/tables/tables' />
            <SidebarMenu.Item title="Extended Tables" to='/tables/extended-table' />
            <SidebarMenu.Item title="AgGrid" to='/tables/ag-grid' />
        </SidebarMenu.Item>
        { /* -------- Apps ---------*/ }
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-mouse-pointer"/>}
            title="Apps"
        >
            <SidebarMenu.Item title="Projects">
                <SidebarMenu.Item title="Projects List" to="/apps/projects/list" />
                <SidebarMenu.Item title="Projects Grid" to="/apps/projects/grid" />
            </SidebarMenu.Item>
            <SidebarMenu.Item title="Tasks">
                <SidebarMenu.Item title="Tasks List" to="/apps/tasks/list" />
                <SidebarMenu.Item title="Tasks Grid" to="/apps/tasks/grid" />
                <SidebarMenu.Item title="Tasks Kanban" to="/apps/tasks-kanban" />
                <SidebarMenu.Item title="Tasks Details" to="/apps/task-details" />
            </SidebarMenu.Item>
            <SidebarMenu.Item title="Files">
                <SidebarMenu.Item title="Files List" to="/apps/files/list" />
                <SidebarMenu.Item title="Files Grid" to="/apps/files/grid" />
            </SidebarMenu.Item>
            <SidebarMenu.Item title="Search Results">
                <SidebarMenu.Item title="Search Results" to="/apps/search-results" />
                <SidebarMenu.Item title="Images Results" to="/apps/images-results" />
                <SidebarMenu.Item title="Videos Results" to="/apps/videos-results" />
                <SidebarMenu.Item title="Users Results" to="/apps/users-results" />
            </SidebarMenu.Item>
            <SidebarMenu.Item title="Users">
                <SidebarMenu.Item title="Users List" to="/apps/users/list"/>
                <SidebarMenu.Item title="Users Grid" to="/apps/users/grid"/>
            </SidebarMenu.Item>
            <SidebarMenu.Item title="Gallery">
                <SidebarMenu.Item title="Gallery Grid" to="/apps/gallery-grid"/>
                <SidebarMenu.Item title="Gallery Table" to="/apps/gallery-table"/>
            </SidebarMenu.Item>
            <SidebarMenu.Item title="Mailbox">
                <SidebarMenu.Item title="Inbox" to="/apps/inbox"/>
                <SidebarMenu.Item title="New Email" to="/apps/new-email"/>
                <SidebarMenu.Item title="Email Details" to="/apps/email-details"/>
            </SidebarMenu.Item>
            <SidebarMenu.Item title="Profile">
                <SidebarMenu.Item title="Profile Details" to="/apps/profile-details"/>
                <SidebarMenu.Item title="Profile Edit" to="/apps/profile-edit"/>
                <SidebarMenu.Item title="Account Edit" to="/apps/account-edit"/>
                <SidebarMenu.Item title="Billing Edit" to="/apps/billing-edit"/>
                <SidebarMenu.Item title="Settings Edit" to="/apps/settings-edit"/>
                <SidebarMenu.Item title="Sessions Edit" to="/apps/sessions-edit"/>
            </SidebarMenu.Item>
            <SidebarMenu.Item title="Clients" to="/apps/clients" exact/>
            <SidebarMenu.Item title="Chat" to="/apps/chat" exact/>
        </SidebarMenu.Item>
            { /* -------- Pages ---------*/}
            <SidebarMenu.Item
                icon={<i className="fa fa-fw fa-copy"/>}
                title="Pages"
            >
                <SidebarMenu.Item title="Register" to="/pages/register"/>
                <SidebarMenu.Item title="Login" to="/pages/login"/>
                <SidebarMenu.Item title="Forgot Password" to="/pages/forgot-password"/>
                <SidebarMenu.Item title="Lock Screen" to="/pages/lock-screen"/>
                <SidebarMenu.Item title="Error 404" to="/pages/error-404"/>
                <SidebarMenu.Item title="Confirmation" to="/pages/confirmation"/>
                <SidebarMenu.Item title="Success" to="/pages/success"/>
                <SidebarMenu.Item title="Danger" to="/pages/danger"/>
                <SidebarMenu.Item title="Coming Soon" to="/pages/coming-soon"/>
                <SidebarMenu.Item title="Timeline" to="/pages/timeline"/>
            </SidebarMenu.Item>
        </SidebarMenu>
    )
};


SidebarMiddleNav.propTypes = {
    history: PropTypes.object
}
