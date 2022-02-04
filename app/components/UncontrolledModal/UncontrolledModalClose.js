import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { Consumer } from './context';

const UncontrolledModalClose = (props) => {
    const { tag, onClickFunc, ...otherProps } = props;
    const Tag = tag;
    return (
        <Consumer>
        {
            (value) => (
                <Tag
                    { ...otherProps }
                    onClick={ () => {
                        onClickFunc()
                        value.toggleModal()
                    } }
                />
            )
        }
        </Consumer>
    )
};
UncontrolledModalClose.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onClickFunc: PropTypes.func
};
UncontrolledModalClose.defaultProps = {
    tag: Button,
    onClickFunc: () => {}
};

export { UncontrolledModalClose };
