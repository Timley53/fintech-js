"strict mode";
///////input/////////////
const username = document.querySelector(".username");

const password = document.querySelector(".password");
const login = document.querySelector(".login");
////input
const username2 = document.querySelector(".username2");

const password2 = document.querySelector(".password2");
const login2 = document.querySelector(".login2");

////trf
const receiever = document.querySelector(".receievr");
const trfAmount = document.querySelector(".trf-amount");
const trfBtn = document.querySelector(".transfer-btn");
/////

////loan
const loanAmount = document.querySelector(".loan-amount");
//
const loanBtn = document.querySelector(".loan-btn");

//////airtime
const airtime = document.querySelector(".airtime");
const airtimeAmount = document.querySelector(".airtime-amount");
const airtimeBtn = document.querySelector(".airtime-btn");

/////////
const showBal = document.querySelector(".show-bal");
const savBal = document.querySelector(".sav-bal");
const nav = document.querySelector("nav");
const menuBAr = document.querySelector(".menu-bar");
const closeBar = document.querySelector(".close-bar");
const balance = document.querySelector(".balance");
const mainVisible = document.querySelector(".visible");
const noneDisplay = document.querySelector(".none-display");
const history = document.querySelector(".history");
const nameWelc = document.querySelector(".name-welc");
const successloan = document.querySelector(".successloan");
const successtrf = document.querySelector(".successtrf");

///////////////
///totals
const incomeTotal = document.querySelector(".income-total");

const withdrawalTotal = document.querySelector(".Withdraw-total");

const Interest = document.querySelector(".Interest");
///////////////
const account1 = {
  owner: "Adedokun Timileyin",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Adeshina Muhammed",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];
// /////////////////
//////open bar
menuBAr.addEventListener("click", function () {
  nav.style.transition = "all 2s";
  nav.classList.toggle("translate-nav");
});
///////////////close
closeBar.addEventListener("click", function () {
  nav.style.transition = "all 2s";
  nav.classList.toggle("translate-nav");
});
/////////
let bal = 0;
let currentbal;
// balance.textContent = '****';

showBal.addEventListener("click", function () {
  bal === 0 ? (bal = 1) : (bal = 0);
  console.log(bal);
  bal ? (balance.textContent = currentbal) : (balance.textContent = "****");
});
///////////functions

const displayMov = function (mov) {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  const trns = mov > 0 ? "deposit" : "withdrawal";
  const html = `<div class="movement-row">
                <div class="transaction-pill ${trns} ">${trns}</div>
                <div class="transaction-date">${day}/${month}/${year}
                </div>
                <div class="transaction-amount">${covertNumb(mov)}</div>
              </div>`;

  history.insertAdjacentHTML("afterbegin", html);
};

///////////
const wrongInputborder = function (input) {
  input.value = "";

  input.style.border = "2px solid red";
  input.placeholder = " input correct details";
};
//
///////
const covertNumb = function (mv) {
  const absNumb = Math.abs(mv);
  // console.log(absNumb);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(absNumb);
};

/////////
/////////////////

////////balance
const displayBal = function (cur) {
  const bal = cur.reduce((acc, mov) => {
    return (acc += mov);
  }, 0);
  return bal;
};
/////////////
const balanceFxn = function (account) {
  currentbal = covertNumb(displayBal(account.movements));
  bal ? (balance.textContent = currentbal) : (balance.textContent = "****");
};
////////
/////////tots

const incomeTotFxn = function (cur) {
  const incomeTot = cur
    .filter((mov) => {
      return mov > 0;
    })
    .reduce((acc, mov) => {
      return (acc += mov);
    }, 0);

  //assigning it to text content
  incomeTotal.textContent = `Total Income:${covertNumb(incomeTot)}`;
};
const withdrawTotfxn = function (cur) {
  const expenseTot = cur
    .filter((mov) => {
      return mov < 0;
    })
    .reduce((acc, mov) => {
      return (acc += mov);
    }, 0);

  //assigning it to text content
  withdrawalTotal.textContent = `Total Withdraw:${covertNumb(expenseTot)}`;
};

const interestTot = function (cur, rate) {
  const interest = cur
    .filter((funds) => funds > 0)
    .map((deposit) => {
      return (deposit * 1.5) / 100;
    })
    .filter((int) => {
      return int >= 1;
    })
    .reduce((acc, mov) => {
      return (acc += mov);
    }, 0);

  Interest.textContent = `Total interest:${covertNumb(interest)}`;
};
/////////
const allTotCall = function (cur) {
  incomeTotFxn(cur.movements);
  withdrawTotfxn(cur.movements);
  interestTot(cur.movements, cur.interestRate);
};

///////////

////username
let currentAccount;
accounts.map((acc) => {
  return (acc.username = acc.owner
    .toLocaleLowerCase()
    .split(" ")
    .map((names) => {
      // console.log(names);
      return names[0];
    })
    .join(""));
});
// console.log(account1, account2);

////// login
login.addEventListener("click", function (e) {
  e.preventDefault();
  const usersInput = username.value.toLocaleLowerCase();

  ////check if input field are not empty ..if not not empty--find account with the username provided assign the account to a variable

  if (usersInput && Number(password.value)) {
    ///if username is correct find a account with the username

    console.log("something");
    currentAccount = accounts.find((acc) => {
      return usersInput === acc.username;
    });
    console.log(currentAccount);

    ///check if the inputed username can be found on account lists
    if (currentAccount) {
      username.style.border = "2px solid green";
    } else {
      wrongInputborder(username);
    }

    ////checking if password matches

    if (Number(password.value) === currentAccount?.pin) {
      username.value = "";
      password.value = "";
      //if password is correct
      console.log("successful login");
      noneDisplay.style.opacity = "1";
      mainVisible.style.opacity = "1";
      savBal.classList.remove("none-display");
      nameWelc.textContent = `${currentAccount.owner.split(" ")[1]}`;
      history.textContent = "";

      currentAccount.movements.map((mov) => {
        // console.log(covertNumb(mov));
        return displayMov(mov);
        // const trns = mov > 0 ? "deposit" : "withdrawal";

        // const html = `<div class="movement-row">
        //         <div class="transaction-pill ${trns} ">${trns}</div>
        //         <div class="transaction-date">${day}/${month}/${year}
        //         </div>
        //         <div class="transaction-amount">${covertNumb(mov)}</div>
        //       </div>`;

        // history.insertAdjacentHTML("afterbegin", html);
      });
      currentbal = covertNumb(displayBal(currentAccount.movements));

      allTotCall(currentAccount);
      //////////////
      // const html = "sdlsdfn,d,ds";
      // history.insertAdjacentHTML("afterbegin", html);
      ////////
    } else {
      ///if password is wrong
      console.log("wrong password");
      wrongInputborder(password);
    }
  } else {
    wrongInputborder(username);
  }
  username.value = "";
  password.value = "";
});

////
//login 2
login2.addEventListener("click", function (e) {
  e.preventDefault();
  const usersInput2 = username2.value.toLocaleLowerCase();

  ////check if input field are not empty ..if not not empty--find account with the username provided assign the account to a variable

  if (usersInput2 && Number(password2.value)) {
    ///if username is correct find a account with the username

    console.log("something");
    currentAccount = accounts.find((acc) => {
      return usersInput2 === acc.username;
    });
    console.log(currentAccount);

    ///check if the inputed username can be found on account lists
    if (currentAccount) {
      username2.style.border = "2px solid green";
    } else {
      wrongInputborder(username2);
    }

    ////checking if password matches

    if (Number(password2.value) === currentAccount?.pin) {
      username2.value = "";
      password2.value = "";
      //if password is correct
      console.log("successful login");
      noneDisplay.style.opacity = "1";
      mainVisible.style.opacity = "1";
      savBal.classList.toggle("none-display");
      nameWelc.textContent = `${currentAccount.owner.split(" ")[1]}`;
      history.textContent = "";

      currentAccount.movements.map((mov) => {
        // console.log(covertNumb(mov));
        return displayMov(mov);
        // const trns = mov > 0 ? "deposit" : "withdrawal";

        // const html = `<div class="movement-row">
        //         <div class="transaction-pill ${trns} ">${trns}</div>
        //         <div class="transaction-date">${day}/${month}/${year}
        //         </div>
        //         <div class="transaction-amount">${covertNumb(mov)}</div>
        //       </div>`;

        // history.insertAdjacentHTML("afterbegin", html);
      });
      currentbal = covertNumb(displayBal(currentAccount.movements));

      allTotCall(currentAccount);
      //////////////
      // const html = "sdlsdfn,d,ds";
      // history.insertAdjacentHTML("afterbegin", html);
      ////////
    } else {
      ///if password is wrong
      console.log("wrong password");
      wrongInputborder(password2);
    }
  } else {
    wrongInputborder(username2);
  }
  username2.value = "";
  password2.value = "";
});

///////
/////transfer

trfBtn.addEventListener("click", function () {
  const Reciever = receiever.value.toLowerCase();
  ///check if field is not empty
  if (receiever.value && trfAmount.value && trfAmount.value > 0) {
    ///check if not sending to self
    if (Reciever === currentAccount?.username) {
      receiever.value = "";
      trfAmount.value = "";
      receiever.classList.toggle("wrong-input");
      receiever.placeholder = "Input user tag";
      trfAmount.placeholder = "can't send to self";
    } else if (trfAmount.value > displayBal(currentAccount?.movements)) {
      receiever.placeholder = "balance too low";
    } else {
      // find receivers acc
      const rcvAcc = accounts.find((acc) => {
        return Reciever === acc.username;
      });

      ///add to reciever

      rcvAcc?.movements.push(Number(trfAmount.value));
      console.log(rcvAcc, rcvAcc.movements);

      ///deduct from sender

      currentAccount?.movements.push(-Number(trfAmount.value));
      console.log(currentAccount, currentAccount.movements);
      displayMov(-trfAmount.value);
      // const now = new Date();
      // const day = now.getDate();
      // const month = now.getMonth();
      // const year = now.getFullYear();

      // const html = `<div class="movement-row">
      //           <div class="transaction-pill withdrawal ">withdrawal</div>
      //           <div class="transaction-date">${day}/${month}/${year}
      //           </div>
      //           <div class="transaction-amount">${covertNumb(
      //             trfAmount.value
      //           )}</div>
      //         </div>`;

      // history.insertAdjacentHTML("afterbegin", html);
      /////////

      balanceFxn(currentAccount);
      allTotCall(currentAccount);
    }
  } else {
    receiever.classList.toggle("wrong-input");
    receiever.placeholder = "Input  user tag";
  }
  trfAmount.value = "";
  receiever.value = "";
});
////////

/////loan
loanBtn.addEventListener("click", function () {
  const loanN = Number(loanAmount?.value);
  let atleast10;
  if (loanN && loanN > 0) {
    ///checking a deposit thats above 10% of the requested loan
    atleast10 = currentAccount.movements.some((mov) => {
      return mov >= loanN * 0.1;
    });
  }

  if (atleast10) {
    setTimeout(() => {
      currentAccount.movements.push(loanN);
      console.log(currentAccount.movements);
      displayMov(loanN);
      // const now = new Date();
      // const day = now.getDate();
      // const month = now.getMonth();
      // const year = now.getFullYear();

      // const html = ` <div class="movement-row">
      //           <div class="transaction-pill deposit ">Deposit</div>
      //           <div class="transaction-date">${day}/${month}/${year}</div>
      //           <div class="transaction-amount">${covertNumb(loanN)}</div>
      //         </div>`;

      // history.insertAdjacentHTML("afterbegin", html);
      allTotCall(currentAccount);
      balanceFxn(currentAccount);
    }, 2000);
  } else {
    wrongInputborder(loanAmount);
    successloan.textContent =
      "You have to deposit at least 10% of amount requested";
  }
  loanAmount.value = "";
});

//airtime

airtimeBtn.addEventListener("click", function () {
  console.log(airtime.value);
  console.log(airtimeAmount.value);
  const AitAM = Number(airtimeAmount.value);

  if (AitAM && AitAM > 0 && airtime.value !== "placeholder") {
    currentAccount?.movements.push(-AitAM);
    console.log(currentAccount.movements);
    console.log(airtime.value);
    displayMov(-AitAM);
    // const now = new Date();
    // const day = now.getDate();
    // const month = now.getMonth();
    // const year = now.getFullYear();

    // const html = ` <div class="movement-row">
    //             <div class="transaction-pill withdrawal ">Airtime</div>
    //             <div class="transaction-date">${day}/${month}/${year}</div>
    //             <div class="transaction-amount">$${covertNumb(AitAM)}</div>
    //           </div>`;

    // history.insertAdjacentHTML("afterbegin", html);
    balanceFxn(currentAccount);
    allTotCall(currentAccount);
    airtime.value = "placeholder";
    airtimeAmount.value = "";
  } else {
    wrongInputborder(airtime);
    wrongInputborder(airtimeAmount);
  }
});
/////////////
