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
import { v4 as uuidv4 } from 'uuid';

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
    const newTransaction = {
      type: 'expense',
      name: data.name,
      amount: data.amount,
      date: moment(data.date).format('L'),
      tag: data.tag,
      id: uuidv4(),
    };

    toast.success('Expense successfully added');
    reset();
    cancelHandler();

    addTransactionToDb(user, newTransaction);
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
        <label htmlFor="name" className="modal-input-label">
          <span>*</span> Expense Name
        </label>
        <input
          id="name"
          {...register('name', {
            required: 'Please input name of transaction',
            minLength: {
              value: 3,
              message: 'Minimum length 3 letters',
            },
          })}
          className="modal-input"
        />
        <p className="input-error">{errors?.name?.message}</p>

        <label htmlFor="amount" className="modal-input-label">
          <span>*</span> Amount
        </label>
        <input
          id="amount"
          {...register('amount', {
            required: 'Please input an amount',
          })}
          className="modal-input"
          type="number"
        />
        <p className="input-error">{errors?.amount?.message}</p>

        <label htmlFor="date" className="modal-input-label">
          <span>*</span> Date
        </label>
        <Controller
          control={control}
          name="date"
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
        <p className="input-error">{errors?.date?.message}</p>
        <label htmlFor="tag" className="modal-input-label">
          <span>*</span> Tag
        </label>
        <select
          id="tag"
          {...register('tag', { required: true })}
          className="modal-select"
        >
          <option value="food">Food</option>
          <option value="drink">Drink</option>
          <option value="movie">Movie</option>
          <option value="medicine">Medicine</option>
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
