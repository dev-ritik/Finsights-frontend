import {withPageConfig} from '../../../components';
import axios from "axios";
import {API_URL} from "../../../constants";
import {connect} from "react-redux";
import {addNotification} from "../../../redux/Notification";
import BaseWishlistDisplay from "./BaseWishlistDisplay";


class PublicWishlistDisplay extends BaseWishlistDisplay {

    fetchWishlist(public_id) {
        axios.get(`${API_URL}/portfolio/wishlist/public/${public_id}`,
        ).then(this.processWishlistResponse).catch((error) => {
            if (error.response.status === 404) {
                this.props.history.push(`/pages/error-404`)
            } else {
                this.props.addNotification({
                    title: "Error!",
                    message: "Error occurred while fetching existing wishlist",
                    colour: "error"
                });
            }
        });
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNotification: (alert) => {
            dispatch(addNotification(alert))
        },
    }
}

export default connect(null, mapDispatchToProps)(withPageConfig(PublicWishlistDisplay));
