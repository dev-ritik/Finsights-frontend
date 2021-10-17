import React from 'react';
import PropTypes from 'prop-types';

const COMMIT_HASH = process.env.COMMIT_HASH || '-';

const FooterText = (props) => (
	<React.Fragment>
		<code>v{COMMIT_HASH}</code>
		<br/>
		(C) {props.year} All Rights Reserved. Built with <i className="fa fa-fw fa-heart" aria-hidden="true"/> by <a
		href="https://ritik.ml"
		target="_blank"
		rel="noopener noreferrer"
		className="sidebar__link"
	>
		Ritik Kumar
	</a>.
	</React.Fragment>
)
FooterText.propTypes = {
    year: PropTypes.node,
	name: PropTypes.node,
	desc: PropTypes.node,
};
FooterText.defaultProps = {
    year: "2021",
};

export { FooterText };
