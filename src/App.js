import { useReducer } from "react";
import "./styles.css";

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

export default function App() {
  function reducer(state, action) {
    switch (action.type) {
      case "openAccount": // when we open the brand new account
        return {
          ...state,
          isActive: (state.isActive = true),
          balance: 500,
        };

      case "deposit": // we deposit 150
        return { ...state, balance: state.balance + action.payload };

      case "withdraw": // we withdraw 50
        return { ...state, balance: state.balance - action.payload };

      case "requestLoan": // we request a loan of 5000
        const loanExists = state.loan !== 0;

        return {
          ...state,
          loan:
            loanExists === false
              ? state.loan + action.payload
              : (alert("You have a loan..."), state.loan),
        };
      case "payLoan": // we pay the loan of 5000 IF we have enough money
        return {
          ...state,
          balance: state.balance - state.loan,
          loan: 0,
        };

      case "closeAccount": // if everything is ok (no loan and balance is 0), the account is closed
        const safeToClose = state.loan === 0 && state.balance === 0;
        console.log(safeToClose);

        return { ...state, isActive: safeToClose ? false : state };
      default:
        throw new Error("Doesn't work...");
    }
  }

  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <>
        <h1>useReducer Bank Account</h1>
        <p>Balance: {balance}</p>
        <p>Loan: {loan}</p>

        <p>
          <button
            onClick={() => {
              dispatch({ type: "openAccount" });
            }}
            disabled={false}
          >
            Open account
          </button>
        </p>
        <p>
          <button
            onClick={() => {
              const depositValue = 150;
              dispatch({ type: "deposit", payload: depositValue });
            }}
            disabled={!isActive}
          >
            Deposit 150
          </button>
        </p>
        <p>
          <button
            onClick={() => {
              const withdrawValue = 50;
              dispatch({ type: "withdraw", payload: withdrawValue });
            }}
            disabled={!isActive}
          >
            Withdraw 50
          </button>
        </p>
        <p>
          <button
            onClick={() => {
              const loanAmount = 5000;
              dispatch({ type: "requestLoan", payload: loanAmount });
            }}
            disabled={!isActive}
          >
            Request a loan of 5000
          </button>
        </p>
        <p>
          <button
            onClick={() => {
              dispatch({ type: "payLoan" });
            }}
            disabled={!isActive}
          >
            Pay loan
          </button>
        </p>
        <p>
          <button
            onClick={() => {
              dispatch({ type: "closeAccount" });
            }}
            disabled={!isActive}
          >
            Close account
          </button>
        </p>
      </>
    </div>
  );
}
