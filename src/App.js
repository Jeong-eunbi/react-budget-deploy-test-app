import {  useState } from "react"; // eslint-disable-line no-unused-vars
import "./App.css" 
import Alert from "./components/Alert";
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from "./components/ExpenseList";
// rce : classcomponent만드는 단축키같은것
//rcc
//rfce : 함수형 컴포넌트 만들때


//리액트는 각각의 컴포넌트들로 구성되어있고, 하나의 싱글페이지로 이루어져있다 기존에 a, b가 있다면 각각 a.html/b.html이 있다면 리액트는 부모페이지에서 a를 보여주고 b를 보여주는 개념//ㅈ
//절대이름바꾸지말아야하는것이 public의 index.html과 src의 index.js인데 index.html은 index.js에 있는 root를 가지고와서 화면을 그리고있다
//root는 app.js에서 그릴수가있음


//React State는 데이터가 변했을때 화면을 다시렌더링하기위해 사용하는것. state 입력값을 기억해줄때 사용하는것, 다시 렌더링


// class App extends Component{
//   render(){
//     return(
//       <main className="main-container">
//         <h1>예산 계산기</h1>
//         <div style={{width: '100%', backgroundColor: 'white',padding: '1rem'}}>
//           {/* expense Form */}
//         </div>
//         <div style={{width: '100%', backgroundColor: 'white',padding: '1rem'}}>
//           {/* expense list  */}
//         </div>

//         <div style={{display:'flex', justifyContent: 'end', marginTop: '1rem'}}>
//           <p style={{fontSize:'2rem'}}>
//             총지출:
//             <span>dnjs</span>
//           </p>
//         </div>
//       </main>
//     )
//   }
// }


const App = () => {
  const [charge, setCharge] = useState(""); //초기값 빈문자열
  const [id, setId] = useState(''); 
  const [edit, setEdit] = useState(false);
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState({show: false});


  const [expenses, setExpenses] = useState([
      {id: 1, charge: "렌트비", amount: 1600},
      {id: 2, charge: "교통비", amount: 400},
      {id: 3, charge: "식비", amount: 1200},
  ])

  const clearItems = () => {
    setExpenses([]);
  } 
  //expenseform.js > input입력값에 텍스트값이 변경될때마다 기억해주는 state 함수를 만듬
  const handleCharge = (e) =>{

    setCharge(e.target.value);
  }

  const handleAmount = (e) =>{
    setAmount(e.target.valueAsNumber); //value값을 숫자로 변경
  }
  const handleAlert = ({type,text}) => {
    setAlert({show: true, type, text});
    setTimeout(() => {
      setAlert({show: false});
    }, 7000);
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    //무언가 작성했고 0보다 크면
    if(charge !== "" && amount > 0){
      if(edit){
        const newExpense = expenses.map(item => {
          return item.id === id ? {...item, charge, amount } : item
        })
        setExpenses(newExpense);
        setEdit(false);
        handleAlert({TYPE: 'success', text: "수정되었습니다"});
      }else{
        const newExpense = {id: crypto.randomUUID(), charge, amount}
      
        //불변성을 지켜주기위해 새로운 expenses 생성
        //spread operater 를 사용하면 새로운 배열을 반환해서 기존의 값은 변경되지않음
       
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);

        handleAlert({type: "success", text: "아이템이 생성되었습니다"});
      }
      setCharge("");
      setAmount(0);
    
    }else{
      handleAlert({
        type: 'danger',
        text: 'charge는 빈 값일 수 없으며, amount는 0보다 커야 합니다'
      })  
    }

  } 


  const handleEdit = id =>{
    const expense = expenses.find(item => item.id ===id);
    const {charge, amount} = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  }
  // initialExpenses = [
  //   {id: 1, charge: "렌트비", amount: 1600},
  //   {id: 2, charge: "교통비", amount: 400},
  //   {id: 3, charge: "식비", amount: 1200}
  // ]

  const handleDelete = (id) => {
    const newExpenses = expenses.filter(expense => expense.id !== id)
    console.log(newExpenses);
    setExpenses(newExpenses);
    handleAlert({
      type: "danger",
      text: "아이템이 삭제되었습니다"
    })
  }

  //Props 는 상속하는 부모컴포넌트로부터 자녀컴포넌트의 데이터등을 전달하는 방법으로 자녀컴포넌트에서는 변경할 수 없고, 부모 컴포넌트에서 변경이 가능하다
  //방법!!! a - 부모컴포넌트 / b - 자식컴포넌트 

    return(
      //return 작성안하면 에러나니 꼭 작성하기
      <main className="main-container">
        {alert.show? <Alert type={alert.type} text={alert.text}/> : null}
        <h1>예산계산기</h1>
        <div style={{width:'100%',backgroundColor:'white',padding:'1rem'}}>
          {/* expens form */}
          <ExpenseForm 
            handleCharge ={handleCharge} 
            charge = {charge}
            handleAmount ={handleAmount}
            amount = {amount}
            handleSubmit = {handleSubmit}
            edit={edit}
          />
         
        </div>
        <div style={{width:'100%',backgroundColor:'white',padding:'1rem'}}>
          {/* expens list */}
            <ExpenseList
              expenses={expenses}
              handleDelete ={handleDelete}
              handleEdit={handleEdit}
              clearItems={clearItems}
          />
        </div>
        <div style={{display:'flex',justifyContent:'end',marginTop:'1rem'}}>
          <p style={{fontSize:'2rem'}}>
            총지출:
            <span>
              {expenses.reduce((acc, curr) => {
                return (acc += curr.amount)
              },0)}

              원</span>
          </p>
        </div>
      </main>
    )
}
export default App; //위에서만든 Appcomponent를 내보내기해줘야 index.js에서 import하여 사용이가능함, default는 메인으로 내보낼때 사용