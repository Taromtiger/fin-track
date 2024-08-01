import './styles.css';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, blue }) => {
  return (
    <button className={blue ? 'btn btn-blue' : 'btn'} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  blue: PropTypes.bool,
};

export default Button;
