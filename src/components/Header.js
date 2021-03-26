import React from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "./Button";

const styles = {
	heading: { color: "red", backgroundColor: "black" }
};

const Header = ({ title, showInputForm, showAddBtn }) => {
	const location = useLocation();

	return (
		<header className="header">
			{/* <h1 style={{color: 'red', backgroundColor: 'black'}}>{title}</h1> */}
			{/* <h1 style={styles.heading}>{title}</h1> */}
			<h1>{title}</h1>
			{/* <button className='btn'>Add</button> */}
			{location.pathname === "/" && (
				<Button
					color={showAddBtn ? "red" : "green"}
					text={showAddBtn ? "Close" : "Add"}
					handleClick={showInputForm}
				/>
			)}
		</header>
	);
};

Header.defaultProps = { title: "Task Tracker" };

Header.propTypes = { title: PropTypes.string.isRequired };

export default Header;
