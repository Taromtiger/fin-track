import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import DatePicker from 'react-datepicker';
import Button from '../Button/Button';
import './styles.css';
import { toast } from 'react-toastify';

const AddIncomeModal = ({ visible, title, cancelHandler }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Income successfully added');
    reset();
    cancelHandler();
  };

  return (
    <Modal
      open={visible}
      title={title}
      onCancel={cancelHandler}
      footer={null}
      className="modal-window"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="incomeName" className="modal-input-label">
          <span>*</span> Income Name
        </label>
        <input
          id="incomeName"
          {...register('incomeName', {
            required: 'Please input name of transaction',
            minLength: {
              value: 5,
              message: 'Minimum length 5 letters',
            },
          })}
          className="modal-input"
        />
        <p className="input-error">{errors?.incomeName?.message}</p>

        <label htmlFor="incomeAmount" className="modal-input-label">
          <span>*</span> Amount
        </label>
        <input
          id="incomeAmount"
          {...register('incomeAmount', {
            required: 'Please input an amount',
          })}
          className="modal-input"
          type="number"
        />
        <p className="input-error">{errors?.incomeAmount?.message}</p>

        <label htmlFor="date" className="modal-input-label">
          <span>*</span> Date
        </label>
        <Controller
          control={control}
          name="dateInput"
          rules={{ required: 'Please select date' }}
          render={({ field }) => (
            <DatePicker
              placeholderText="Select date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              dateFormat="dd.MM.YYYY"
              className="modal-date"
            />
          )}
        />
        <p className="input-error">{errors?.dateInput?.message}</p>
        <label htmlFor="tag" className="modal-input-label">
          <span>*</span> Tag
        </label>
        <select
          id="tag"
          {...register('incomeTag', { required: true })}
          className="modal-select"
        >
          <option value="salary">Salary</option>
          <option value="freelance">Freelance</option>
          <option value="investment">Investment</option>
        </select>

        <Button type="submit" text={'Add Income'} blue={true} />
      </form>
    </Modal>
  );
};

AddIncomeModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  cancelHandler: PropTypes.func,
};

export default AddIncomeModal;
