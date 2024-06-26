import React from 'react'
import {MdDelete} from "react-icons/md";
import ExpenseItem from './ExpenseItem';
import "./Expenselist.css";

const ExpenseList = ({handleDelete, expenses, handleEdit, clearItems}) => {
    return (
        // <div></div>사용하기싫을때 <>안에 div생략
        <>
            <ul className='list'>
                {/* expense item */}

                {expenses.map(expense => {
                    return(
                        <ExpenseItem 
                            expense={expense}
                            key={expense.id}
                            handleDelete = {handleDelete}
                            handleEdit = {handleEdit}
                        />
                    )
                })}
            
            </ul>
            {expenses.length > 0 && (
                <button className='btn' onClick={clearItems}>
                목록지우기
                <MdDelete className='btn-icon' />
                </button>
            )}
            
       
        </>

    )
}

export default ExpenseList