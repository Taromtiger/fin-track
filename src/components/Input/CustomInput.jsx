import './styles.css';
import PropTypes from 'prop-types';

const CustomInput = ({ label, state, setState, placeholder, type }) => {
  return (
    <p className="input-wrapper">
      <label className="input-label" htmlFor={label}>
        {label}
      </label>

      <input
        type={type}
        className="custom-input"
        name={label}
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </p>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string,
  state: PropTypes.string,
  setState: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default CustomInput;
