'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',    
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
let movementsDates = document.querySelectorAll('.movements__date');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
let myfunc; //Interval timer function

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
accounts.forEach((currAcc)=>{
  let char = currAcc.owner.split(" ");
  let username = "";
    char.forEach((char)=>{
      let x = char.split("", 1).toString().toLowerCase();
      username += x;  
    })
    // console.log(username)
    currAcc.username = username;
    // console.log(currAcc)  
})

//LOGIN BUTTON FUNCTIONALITY
accounts.forEach((currAcc)=>{  
  btnLogin.addEventListener("click", function(e){  
  // --------------------------have to add transition effect on re-login
    e.preventDefault()    
    // let char = currAcc.owner.split(" ");
    // console.log(char) //Returning an array of names separated by commas
    // let finalChars = "";
    // char.forEach((char)=>{
      // let x = char.split("", 1).toString().toLowerCase();
      // finalChars += x;      
    // })
    // console.log("currAcc username", currAcc.username) //match input value against this    
    if((inputLoginUsername.value).toLowerCase() == currAcc.username && inputLoginPin.value == currAcc.pin){
      //SETTING AN ID TO 'btnTransfer' AND CHECKING IF IT CHNAGES ON SWITCHING ACCOUNTS
      btnTransfer.setAttribute("id", `${currAcc.username}`);
      console.log("id on transfer button", btnTransfer.getAttribute("id"));
      //SETTING AN ID TO 'btnClose' AND CHECKING IF IT CHNAGES ON SWITCHING ACCOUNTS

      console.log("account username" ,currAcc.username) //WORKING FINE
      containerApp.style.opacity = "1";
      labelWelcome.innerHTML = "Welcome, " +`${currAcc.owner}`
      inputLoginUsername.value = "";
      inputLoginPin.value = "";
      countDownTimer();
      updateAccount(currAcc);
      updateDateLabel();
      updateBalance(currAcc);
      updateTotalDeposits(currAcc);
      updateTotalWithdrawals(currAcc);
      updateInterest(currAcc);
      // sortEntries(currAcc);
      requestLoan(currAcc);
      transferAmount(currAcc);
    }
  }) 
})

//COUNTDOWN TIMER FUNCTIONALITY
function countDownTimer(){  
  let m = 9; //1
  let s = 60; //10
  clearInterval(myfunc)
  myfunc = setInterval(()=>{
    if(m > -1){
    s--
      if(s == -1){
      s = 59; //9
      m--;
      }    
    }
    m = (m.toString().length > 1) ? m.toString() : "0" + m.toString();
    s = (s.toString().length > 1) ? s.toString() : "0" + s.toString();
    let timer = `${m}:${s}`
    // console.log(timer)
    labelTimer.innerHTML = timer;
    if(m == 0 && s == 0){
    clearInterval(myfunc)
    // LOG OUT AFTER TIME-OUT
    containerApp.style.opacity = "0";
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    labelWelcome.innerHTML = "Log in to get started";
    setTimeout(()=>{      
      containerApp.style.display = "none"
    },1000)
    }
  },1000)
}

//FUNCTION TO UPDATE ACCOUNT
function updateAccount(account){
  containerMovements.innerHTML = ""; 
  for(let i = account.movements.length - 1; i >= 0; i--) {    //last in the array is the latest transaction
    // for(let i = 0; i < account.movements.length; i++){     //this is showing first in the array (oldest) as latest transaction 
    let transactionDate = new Date(account.movementsDates[i])
    let day = (transactionDate.getDate().toString().length > 1) ? transactionDate.getDate().toString() : "0" + transactionDate.getDate();
    let month = ((transactionDate.getMonth()+1).toString().length > 1) ? (transactionDate.getMonth()+1).toString() : "0" + (transactionDate.getMonth() + 1);
    let year = transactionDate.getFullYear().toString()
    let finalDate = `${day}/${month}/${year}`  
    if(account.movements[i] > 0){      
      containerMovements.innerHTML += `<div class="movements__row"><div class="movements__type movements__type--deposit">${i + 1} deposit</div><div class="movements__date">${finalDate}</div><div class="movements__value"> ${account.movements[i]}€</div></div>`
      }else{
      containerMovements.innerHTML += `<div class="movements__row"><div class="movements__type movements__type--withdrawal">${i + 1} withdrawal</div><div class="movements__date">${finalDate}</div><div class="movements__value"> ${account.movements[i]}€</div></div>` 
    } 
  }
}

//FUNCTION TO UPDATE DATE LABEL
function updateDateLabel(){
  let d = new Date();
  let date = (d.getDate().toString().length < 2) ? "0" + d.getDate() : d.getDate().toString();
  labelDate.innerHTML = `${date}/${d.getMonth() + 1}/${d.getFullYear()}`
}

//FUNCTION TO UPDATE BALANCE
function updateBalance(account){
  let bal = account.movements.reduce((init, sec)=> init + sec);
  labelBalance.innerHTML = bal + "€";
}

//FUNCTION TO UPDATE DEPOSITS
function updateTotalDeposits(account){
  let deposits = account.movements.filter((currEntry)=> currEntry > 0);
  let totalDeposits = deposits.reduce((init, sec)=> init + sec);
  labelSumIn.innerHTML = totalDeposits + "€"; 
}

//FUNCTION TO UPDATE THE TOTAL WITHDRAWALS
function updateTotalWithdrawals(account){
  let withdrawals = account.movements.filter((currEntry)=> currEntry < 0);
  let totalWithdrawals = withdrawals.reduce((init, sec)=> init + sec);
  labelSumOut.innerHTML = Math.abs(totalWithdrawals) + "€";  
}

//FUNCTION TO UPDATE INTEREST ON THE TOTAL OF DEPOSITS & WITHDRAWALS
function updateInterest(account){
  let accountTotal = account.movements.reduce((init, sec)=> Math.abs(init) + Math.abs(sec))
  let interest = accountTotal * (account.interestRate / 100);
  labelSumInterest.innerHTML = interest + "€";
}

//FUNCTION TO REQUEST LOAN 
function requestLoan(account){
    btnLoan.addEventListener("click", function(e){
      e.preventDefault();
      let d = new Date();
      let loanAmt = Number(inputLoanAmount.value);
      inputLoanAmount.value = "";
      setTimeout(()=>{
        account.movements.push(loanAmt);
        // console.log(account.movements)
        account.movementsDates.push(d);
        // console.log(account.movementsDates)
        updateAccount(account);
        updateBalance(account);
        updateTotalDeposits(account);
        updateTotalWithdrawals(account);
        updateInterest(account);
      },5000)
    })
}

//FUNCTION TO TRANSFER AMOUNT 
// console.log(accounts)
function transferAmount(accountId){
  // btnTransfer.addEventListener("click", function(e){
    // e.preventDefault();
    let d = new Date();
    if(inputTransferTo.value !== "" && inputTransferAmount.value !== ""){
      // console.log(inputTransferAmount.value, typeof inputTransferAmount.value) //String
      let fromAccount = accountId.getAttribute("id");
      let toAccount = inputTransferTo.value;
      let amount = Number(inputTransferAmount.value);
      inputTransferTo.value = inputTransferAmount.value = "";
      console.log("account username" ,account.username)    //HERE, IT IS NOT ABLE TO DETECT THE CHANGE IN THE USER
      // if(account.username !== toAccount && amount > 0){
        if(btnTransfer.getAttribute("id") !== toAccount && amount > 0 && toAccount !== account.username){
        // console.log("all accounts", accounts)
        accounts.forEach((currAcc)=>{
          if(currAcc.username == toAccount){
            currAcc.movements.push(amount);
            currAcc.movementsDates.push(d);
            console.log("To account", currAcc.movements)
            // updateAccount(currAcc);
            // updateBalance(currAcc);
            // updateTotalDeposits(currAcc);
            // updateTotalWithdrawals(currAcc);
            // updateInterest(currAcc);
          }
            if(currAcc.username == fromAccount){
            currAcc.movements.push(-amount);
            currAcc.movementsDates.push(d);
            console.log("From account", account.movements)
            updateAccount(currAcc);
            updateBalance(currAcc);
            updateTotalDeposits(currAcc);
            updateTotalWithdrawals(currAcc);
            updateInterest(currAcc);
          }
        })
      }
    }
  })
}

//FUNCTION TO CLOSE THE ACCOUNT












//SORT TRANSACTIONS TO SHOW DEPOSITS FIRST AND THEN WITHDRAWALS AS PER CHRONOLOGY
// function sortEntries(account){   
//   btnSort.addEventListener('click', function(){
//     containerMovements.innerHTML = ""; 
//     let positiveEntries = account.movements.filter((currEntry)=> currEntry > 0)
//     let negativeEntries = account.movements.filter((currEntry)=> currEntry < 0)
//     let newSortedArray = [...positiveEntries, ...negativeEntries];
//     for(let i = newSortedArray.length - 1; i >= 0; i++){
//     let transactionDate = new Date(account.movementsDates[i])
//     let day = (transactionDate.getDate().toString().length > 1) ? transactionDate.getDate().toString() : "0" + transactionDate.getDate();
//     let month = ((transactionDate.getMonth()+1).toString().length > 1) ? (transactionDate.getMonth()+1).toString() : "0" + (transactionDate.getMonth() + 1);
//     let year = transactionDate.getFullYear().toString()
//     let finalDate = `${day}/${month}/${year}`  
//       containerMovements.innerHTML += `<div class="movements__row"><div class="movements__type movements__type--deposit">${i + 1} deposit</div><div class="movements__date">${finalDate}</div><div class="movements__value"> ${newSortedArray[i]}€</div></div>`
//     }
//   })
// })

//SORT BUTTON - use a class to track- check for class & add the class while updating sorted array; check for class & if true, remove and update with original array 
//TO FIXED
//INTERNATIONALIZATION
//ON CLICK- 'x' DAYS AGO (ALSO IMPLEMENT TODAY) / AGAIN ON CLICK- DISPLAY DATE

//CLOSE ACCOUNT