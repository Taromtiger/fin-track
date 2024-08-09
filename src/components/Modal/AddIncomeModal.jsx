import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import DatePicker from 'react-datepicker';
import Button from '../Button/Button';
import './styles.css';
import { toast } from 'react-toastify';
import { addTransactionToDb } from '../../firebase/addTransactionToDb';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { editDocument } from '../../firebase/editDocument';

const AddIncomeModal = ({
  visible,
  title,
  cancelHandler,
  isEditing,
  transaction,
}) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      amount: '',
      date: new Date(),
      tag: '',
    },
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (visible) {
      if (transaction) {
        setValue('name', transaction.name);
        setValue('amount', transaction.amount);
        setValue('date', moment(transaction.date, 'L').toDate());
        setValue('tag', transaction.tag);
      } else {
        reset();
      }
    }
  }, [visible, reset, transaction, setValue]);

  const onSubmit = (data) => {
    const newTransaction = {
      type: 'income',
      name: data.name,
      amount: data.amount,
      date: moment(data.date).format('L'),
      tag: data.tag,
      id: transaction ? transaction.id : uuidv4(),
    };

    if (isEditing && transaction) {
      editDocument(user, transaction.id, newTransaction);
      toast.success('Income successfully updated');
    } else {
      addTransactionToDb(user, newTransaction);
      toast.success('Income successfully added');
    }

    reset();
    cancelHandler();
  };

  const handleCancel = () => {
    reset();
    cancelHandler();
  };

  return (
    <Modal
      open={visible}
      title={title}
      onCancel={handleCancel}
      footer={null}
      className="modal-window"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="name" className="modal-input-label">
          <span>*</span> Income Name
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
          <option value="salary">Salary</option>
          <option value="freelance">Freelance</option>
          <option value="investment">Investment</option>
          <option value="investment">Other</option>
        </select>

        <Button
          type="submit"
          text={isEditing ? 'Edit Income' : 'Add Income'}
          blue={true}
        />
      </form>
    </Modal>
  );
};

AddIncomeModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  cancelHandler: PropTypes.func,
  isEditing: PropTypes.bool,
  transaction: PropTypes.object,
};

export default AddIncomeModal;
