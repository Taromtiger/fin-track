import './styles.css';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, blue, disabled }) => {
  return (
    <button
      className={blue ? 'btn btn-blue' : 'btn'}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  blue: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
