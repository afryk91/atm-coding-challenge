import React from 'react'
import './WithdrawModal.css';

const WithdrawModal = ({msg}) => {
    return (
        <div className='modal'>
            {msg}
        </div>
    )
};

export default WithdrawModal;
