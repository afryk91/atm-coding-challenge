import React, { useState } from 'react';
import axios from 'axios';
import './WithdrawInput.css';
import WithdrawModal from '../WithdrawModal/WithdrawModal';

const errorMessages = {
    InvalidInputError: 'Invalid input! Amount must be positive number',
    NoteUnavailableError: 'Cannot withdraw given amount! Amount must be multiple of 10'
};

const WithdrawInput = () => {
    const [value, setValue] = useState('');
    const updateValue = event => setValue(event.target.value);

    const [currentWithdrawal, setCurrentWithdrawal] = useState([]);
    const [withdrawalError, setWithdrawalError] = useState();
  
    const getWithdrawalFromServer = amount => {
      axios.post('http://localhost:9999/api/v1/withdraw', {amount})
        .then(resp => setCurrentWithdrawal(resp.data))
        .then(() => setWithdrawalError(null))
        .catch(e => {
          console.log('Received error:', e.response.data.error);
          setWithdrawalError(e.response.data.error);
        });
    };

    const getMessage = (withdrawal, error) => error ?
        errorMessages[error] :
        `You will receive following notes: ${withdrawal.map(a => a + '$')}`;

    return (
        <div>
            <input type='text'
                className='input-field'
                placeholder='Enter amount you want to withdraw'
                onChange={updateValue}
                value={value} />
            <button className='btn' onClick={() => getWithdrawalFromServer(value)}>withdraw</button>
            <WithdrawModal msg={getMessage(currentWithdrawal, withdrawalError)}/>
        </div>
    )
}

export default WithdrawInput
