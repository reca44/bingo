import React from "react";
import PropTypes from "prop-types";


const Circulo = ({ displayNumber }) => {
    return (
        <div className="circulo">
            {displayNumber ? displayNumber : "FIN"}
        </div>
    );
};

Circulo.propTypes = {
    displayNumber: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

export default Circulo;