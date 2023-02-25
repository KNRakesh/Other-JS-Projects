'use strict';

// BANKIST APP - [username (first characters of each name) & pin example- for account1: username: js & pin: 1111]

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
  locale: 'pt-PT', // de-DE (Germany)  pt-PT (Portugal)
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
  locale: 'de-DE', // de-DE (Germany)  pt-PT (Portugal)
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
//console.log('accounts',accounts)

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

const formLogin = document.querySelector('.login');
const logo = document.querySelector('[src="logo.png"]')
const btnLogout = document.getElementById('btnLogout')

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
let intervalTimerFunc; //Interval timer function

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//ASSIGNING USERNAMES FOR EACH ACCOUNT BASED ON THE OWNER NAME
accounts.forEach((currAcc)=>{
  let char = currAcc.owner.split(" ");
  let username = "";
    char.forEach((char)=>{
      let x = char.split("", 1).toString().toLowerCase();
      username += x;  
    })
    currAcc.username = username;
})

//FUNCTION FOR CREATING AN OBJECT FOR THE ACCOUNT HAVING AMOUNTS AND DATES
function createUserAccountObj(userAcc){  
  userAcc.forEach((currAcc)=>{
    let userAccountObj = [];
    for(let i = 0 ; i < currAcc.movements.length; i++){
    userAccountObj.push({amount: currAcc.movements[i], date: currAcc.movementsDates[i]})
    }
    currAcc.userAccountObj = userAccountObj;
  })
}
createUserAccountObj(accounts)

//COUNTDOWN TIMER FUNCTIONALITY
function countDownTimer(){  
    let m = 9; //9
    let s = 60; //60
    clearInterval(intervalTimerFunc)
    intervalTimerFunc = setInterval(()=>{
      if(m > -1){
      s--
        if(s == -1){
        s = 59; //59
        m--;
        }    
      }
      m = (m.toString().length > 1) ? m.toString() : "0" + m.toString();
      s = (s.toString().length > 1) ? s.toString() : "0" + s.toString();
      let timer = `${m}:${s}`
      labelTimer.innerHTML = timer;
      if(m == 0 && s == 0){
      clearInterval(intervalTimerFunc)
      // LOG OUT AFTER TIME-OUT
      containerApp.style.opacity = "0";
      inputLoginUsername.value = "";
      inputLoginPin.value = "";
      labelWelcome.innerHTML = "Log in to get started";
      setTimeout(()=>{      
        containerApp.style.display = "none"
        btnLoan.removeAttribute("data-id");
        btnTransfer.removeAttribute("data-id")
        btnClose.removeAttribute("data-id")
        btnSort.removeAttribute("data-id")
        inputLoginUsername.disabled = false;
        inputLoginPin.disabled = false;        
        formLogin.style.display = "block";
        btnLogout.style.display = "none";
      },1000)
      }
    },1000)
  }  

//LOGIN BUTTON FUNCTIONALITY
btnLogin.addEventListener("click", function(e){
    e.preventDefault();       
    accounts.forEach((currAcc)=>{      
      //LOGIN AND START TIMER

      if((inputLoginUsername.value).toLowerCase() === currAcc.username && Number(inputLoginPin.value) === currAcc.pin){
      btnLoan.setAttribute("data-id", `${currAcc.username}`);
      btnTransfer.setAttribute("data-id", `${currAcc.username}`)
      btnClose.setAttribute("data-id", `${currAcc.username}`)
      btnSort.setAttribute("data-id", `${currAcc.username}`)
      containerApp.style.opacity = "1";
      containerApp.style.display = "grid";
      labelWelcome.innerHTML = "Welcome, " +`${currAcc.owner}`
      inputLoginUsername.value = "";
      inputLoginPin.value = "";
      countDownTimer();
      updateUI(currAcc);          
      implementLogoutOnLogin();
      }

})      
})    

//FUNCTION TO UPDATE THE USER ACCOUNT UI
function updateUI(userAcc){
  updateTransactions(userAcc);
  updateTodayDate();
  updateBalance(userAcc);
  updateTotalDeposits(userAcc);
  updateTotalWithdrawals(userAcc);
  updateInterest(userAcc);
}

//FUNCTION TO UPDATE ACCOUNT TRANSACTIONS
function updateTransactions(userAcc){
  containerMovements.innerHTML = "";
  for(let i = userAcc.userAccountObj.length - 1; i >= 0; i--) {
    //CREATING THE DATE FOR THE TRANSACTION
    let transactionDate = new Date(userAcc.userAccountObj[i].date)
    let day = (transactionDate.getDate().toString().length > 1) ? transactionDate.getDate().toString() : "0" + transactionDate.getDate();
    let month = ((transactionDate.getMonth()+1).toString().length > 1) ? (transactionDate.getMonth()+1).toString() : "0" + (transactionDate.getMonth() + 1);
    let year = transactionDate.getFullYear().toString()
    let finalDate = `${month}/${day}/${year}`  
    //INTERNATIONALIZATION OF CURRENCIES
    let finalAmt = new Intl.NumberFormat(userAcc.locale, {style: 'currency', currency: userAcc.currency}).format(userAcc.userAccountObj[i].amount)
    //UPDATING THE TRANSACTIONS ALONG WITH ITS DATE
    if(userAcc.userAccountObj[i].amount > 0){      
      containerMovements.innerHTML += `<div class="movements__row"><div class="movements__type movements__type--deposit">${i + 1} deposit</div><div class="movements__date">${finalDate}</div><div class="movements__value"> ${finalAmt}</div></div>`
    }else{
      containerMovements.innerHTML += `<div class="movements__row"><div class="movements__type movements__type--withdrawal">${i + 1} withdrawal</div><div class="movements__date">${finalDate}</div><div class="movements__value"> ${finalAmt}</div></div>` 
    } 
  }
}

//FUNCTION TO UPDATE TODAY'S DATE
function updateTodayDate(){
  let d = new Date();
  let date = (d.getDate().toString().length < 2) ? "0" + d.getDate() : d.getDate().toString();
  labelDate.innerHTML = `${date}/${d.getMonth() + 1}/${d.getFullYear()}`
}

//FUNCTION TO UPDATE TOTAL BALANCE
function updateBalance(userAcc){
  let bal;
  if(userAcc.movements.length == 0){
    bal = 0;
  }else if(userAcc.movements.length == 1){
    bal = userAcc.movements[0];
  }else if(userAcc.movements.length > 1){
    bal = userAcc.movements.reduce((init, sec)=> init + sec);
  }
  //INTERNATIONALIZATION OF CURRENCY
  let finalBal = new Intl.NumberFormat(userAcc.locale, {style: 'currency', currency: userAcc.currency}).format(bal)
  labelBalance.innerHTML = finalBal;
}

//FUNCTION TO UPDATE TOTAL DEPOSITS
function updateTotalDeposits(userAcc){
  let deposits  
  if(userAcc.movements.length > 0){
    deposits = userAcc.movements.filter((currEntry)=> currEntry > 0);    
  }  
  let totalDeposits;
  if(deposits.length == 0){
    totalDeposits = 0;
  }else if(deposits.length == 1){
    totalDeposits = userAcc.movements[0];
  }else if(deposits.length > 1){
    totalDeposits = deposits.reduce((init, sec)=> init + sec);
  }
  //INTERNATIONALIZATION OF CURRENCY
  let finalDeposits = new Intl.NumberFormat(userAcc.locale, {style: 'currency', currency: userAcc.currency}).format(totalDeposits)
  labelSumIn.innerHTML = finalDeposits;
}

//FUNCTION TO UPDATE TOTAL WITHDRAWALS
function updateTotalWithdrawals(userAcc){
  let withdrawals = userAcc.movements.filter((currEntry)=> currEntry < 0);
  let totalWithdrawals;
  if(withdrawals.length == 0){
    totalWithdrawals = 0;
  }else if(withdrawals.length == 1){
    totalWithdrawals = withdrawals[0];
  }else if(withdrawals.length > 1){
    totalWithdrawals = Math.abs(withdrawals.reduce((init, sec)=> init + sec));
  }
  //INTERNATIONALIZATION OF CURRENCY
  let finalWithdrawals = new Intl.NumberFormat(userAcc.locale, {style: 'currency', currency: userAcc.currency}).format(totalWithdrawals)
  labelSumOut.innerHTML = finalWithdrawals;
}

//FUNCTION TO UPDATE INTEREST
function updateInterest(userAcc){
  let deposits = userAcc.movements.filter((tran)=> tran > 0);
  let IntOnDeposits;
  let finalInterest;
  if(deposits.length == 0){
    IntOnDeposits = 0;
  }else if(deposits.length == 1){
    IntOnDeposits = (deposits[0] * userAcc.interestRate) / 100
    labelSumInterest.innerHTML = finalInterest;
  }else if(deposits.length > 1){    
    let int = deposits.map((tran)=> (tran * userAcc.interestRate) / 100);
    IntOnDeposits = int.reduce((init, sec)=> init + sec)
  }
  //INTERNATIONALIZATION OF CURRENCY
  finalInterest = new Intl.NumberFormat(userAcc.locale, {style: 'currency', currency: userAcc.currency}).format(IntOnDeposits)
  labelSumInterest.innerHTML = finalInterest;
} 

//REQUEST LOAN BUTTON FUNCTIONALITY
btnLoan.addEventListener("click", function(e){
  e.preventDefault();
  let loanAmt = Number(inputLoanAmount.value);
  inputLoanAmount.value = ""; 
  accounts.forEach((currAcc)=>{
    if(currAcc.username == btnLoan.getAttribute("data-id")){
      if(loanAmt > 0){
        let d = new Date();
        inputLoanAmount.value = "";
        setTimeout(()=>{
            currAcc.movements.push(loanAmt);
            currAcc.movementsDates.push(d);
            currAcc.userAccountObj.push({amount: loanAmt, date: d})
            updateUI(currAcc);          
        },5000)
      }

    }
  })
})

//TRANSFER AMOUNT BUTTON FUNCTIONALITY
btnTransfer.addEventListener("click", function(e){
  e.preventDefault();
  let toAccount = inputTransferTo.value;
  let amount = Number(inputTransferAmount.value);
  inputTransferTo.value = inputTransferAmount.value = "";
  
  //VALIDATE TRANSFER AMOUNT FIELDS
  if(toAccount !== "" && amount !== "" && toAccount !== btnTransfer.getAttribute("data-id") && amount > 0){    
    for(let i = 0; i < accounts.length; i++){
      if(accounts[i].username == toAccount){
        accounts.forEach((currAcc)=>{
          if(currAcc.username == btnTransfer.getAttribute("data-id")){
            //NOTE DATE
            let d = new Date();
            //PUSH THE -VE AMOUNT VALUE INTO TRANSACTIONS ARRAY
            currAcc.movements.push(-amount)
            //PUSH DATE INTO TRANSACTION DATES ARRAY
            currAcc.movementsDates.push(d)
            currAcc.userAccountObj.push({amount: -amount, date: d})
            //UPDATE UI
            updateUI(currAcc);
          }
          if(currAcc.username == toAccount){
            //NOTE DATE
            let d = new Date();
            //PUSH THE AMOUNT VALUE INTO TRANSACTIONS ARRAY
            currAcc.movements.push(amount)        
            //PUSH DATE INTO TRANSACTION DATES ARRAY
            currAcc.movementsDates.push(d);
            currAcc.userAccountObj.push({amount: amount, date: d})
          }
        })        
      }
    }
  }

})

//CANCEL ACCOUNT BUTTON FUNCTIONALITY
btnClose.addEventListener("click", function(e){
  e.preventDefault();
  let closeAccUsername = inputCloseUsername.value;
  let closeAccPin = Number(inputClosePin.value);
  inputCloseUsername.value = inputClosePin.value = "";
  accounts.forEach((currAcc)=>{
    //VALIDATION
    if(closeAccUsername == currAcc.username && closeAccPin == currAcc.pin && closeAccUsername == btnClose.getAttribute("data-id")){
      accounts.splice(accounts.indexOf(currAcc), 1)
    //LOGOUT AFTER CANCEL ACCOUNT
      containerApp.style.opacity = "0";
      inputLoginUsername.value = "";
      inputLoginPin.value = "";
      labelWelcome.innerHTML = "Log in to get started";
      setTimeout(()=>{      
        //REMOVING ATTRIBUTES
        btnLoan.removeAttribute("data-id");
        btnTransfer.removeAttribute("data-id")
        btnClose.removeAttribute("data-id")
        btnSort.removeAttribute("data-id")

        containerApp.style.display = "none";
        formLogin.style.display = "block";
        btnLogout.style.display = "none";
      },1000)  
    }

  })
})

//FUNCTION TO ADD LOGOUT BUTTON ON SUCCESSFUL LOGIN
function implementLogoutOnLogin(){
  formLogin.style.display = "none";
  btnLogout.style.display = "block";
}

//LOGOUT BUTTON FUNCTIONALITY
btnLogout.addEventListener("click", function(){
  containerApp.style.opacity = "0";
  inputLoginUsername.value = "";
  inputLoginPin.value = "";
  labelWelcome.innerHTML = "Log in to get started";
  setTimeout(()=>{      
    //REMOVING ATTRIBUTES
    btnLoan.removeAttribute("data-id");
    btnTransfer.removeAttribute("data-id")
    btnClose.removeAttribute("data-id")
    btnSort.removeAttribute("data-id")

    containerApp.style.display = "none";
    formLogin.style.display = "block";
    btnLogout.style.display = "none";
  },1000)  
})

//SORT BUTTON FUNCTIONALITY
let sortStatus = true;
btnSort.addEventListener("click", function(){
  if(sortStatus == true){
    //SORT AND UPDATE UI
    accounts.forEach((currAcc)=>{
      if(currAcc.username == btnSort.getAttribute("data-id")){
        let unsortedAccount = JSON.parse(JSON.stringify(currAcc));
        let sortedAccount = unsortedAccount.userAccountObj.sort((init, sec)=> init.amount - sec.amount)
        delete unsortedAccount.userAccountObj;
        unsortedAccount.userAccountObj = sortedAccount;
        updateTransactions(unsortedAccount);
      }
    })
    sortStatus = false;
  }else{
    //USE THE UNSORTED ACCOUNT AND UPDATE UI
    accounts.forEach((currAcc)=>{
      if(currAcc.username == btnSort.getAttribute("data-id")){
        updateTransactions(currAcc);
      }
    })
    sortStatus = true; 
  }
})