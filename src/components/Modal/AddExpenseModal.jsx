import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import DatePicker from 'react-datepicker';
import Button from '../Button/Button';
import './styles.css';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { addTransactionToDb } from '../../firebase/addTransactionToDb';

const AddExpenseModal = ({ visible, title, cancelHandler }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [user] = useAuthState(auth);

  const onSubmit = (data) => {
    console.log(data);
    const newTrasaction = {
      expenseName: data.expenseName,
      expenseAmount: data.expenseAmount,
      expenseDate: moment(data.dateInput).format('L'),
      expenseTag: data.expenseTag,
    };

    toast.success('Expense successfully added');
    reset();
    cancelHandler();

    addTransactionToDb(user, newTrasaction);
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
        <label htmlFor="expenseName" className="modal-input-label">
          <span>*</span> Expense Name
        </label>
        <input
          id="expenseName"
          {...register('expenseName', {
            required: 'Please input name of transaction',
            minLength: {
              value: 3,
              message: 'Minimum length 3 letters',
            },
          })}
          className="modal-input"
        />
        <p className="input-error">{errors?.expenseName?.message}</p>

        <label htmlFor="expenseAmount" className="modal-input-label">
          <span>*</span> Amount
        </label>
        <input
          id="expenseAmount"
          {...register('expenseAmount', {
            required: 'Please input an amount',
          })}
          className="modal-input"
          type="number"
        />
        <p className="input-error">{errors?.expenseAmount?.message}</p>

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
          {...register('expenseTag', { required: true })}
          className="modal-select"
        >
          <option value="salary">Salary</option>
          <option value="freelance">Freelance</option>
          <option value="investment">Investment</option>
        </select>

        <Button
          type="submit"
          text={'Add Income'}
          blue={true}
          className="modal-btn"
        />
      </form>
    </Modal>
  );
};

AddExpenseModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  cancelHandler: PropTypes.func,
};

export default AddExpenseModal;
