import React from "react";
import PropTypes from "prop-types";

const Button = ({ color, text, handleClick }) => {
	return (
		<button style={{ backgroundColor: color }} className="btn" onClick={handleClick}>
			{text}
		</button>
	);
};

Button.defaultProps = {
	color: "steelblue"
};

Button.propTypes = {
	text: PropTypes.string,
	color: PropTypes.string,
	handleClick: PropTypes.func
};

export default Button;
