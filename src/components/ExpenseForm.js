import React from 'react'
import {MdSend} from 'react-icons/md';
import "./Expense.css";

//각각의 컴포넌트들은 꼭 대문자로 시작하는 이름이어야한다

//클래스형 컴포넌트일때 작성법은
// export class ExpenseForm extends Component


const ExpenseForm = ({handleCharge, charge, edit, amount, handleAmount, handleSubmit}) => {
 
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-center'>
                <div className='form-group'>
                    <label htmlfor="charge">지출항목</label>
                    <input type='text' className='form-control' id='charge' name='charge' value={charge} placeholder='예)렌트비' onChange={handleCharge} />
                </div>
                <div className='form-group'>
                    <label htmlfor="amount">지출항목</label>
                    <input type='number' className='form-control' id='amount' name='amount' value={amount} placeholder='예) 100' onChange={handleAmount} />
                </div>
            </div>
            <button type='submit' className='btn'>
                {edit? "수정": "제출"}
                <MdSend className="btn-icon"/>
            </button>
        </form>
    )
}

export default ExpenseForm
