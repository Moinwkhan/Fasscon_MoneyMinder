import React, { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Expenses = ({
  fetchData,
  totalExpense,
  totalIncome,
  incomeCount,
  expenseCount,
  userId,
}) => {

  useEffect(() => {
    fetchData();
  }, [userId]);

  console.log(userId);

  const total = totalExpense + totalIncome;
  const expensesPercentage = (totalExpense / total) * 100;
  const savingsPercentage = total !== 0 ? (totalIncome / total) * 100 : 0;

  return (
    <div>
      <div className="expensefull">
        <div style={{ marginBottom: 10 }}>
          <CircularProgressbar
            value={expensesPercentage}
            text={`${expensesPercentage.toFixed(2)}%`}
            // text="exp"
            styles={buildStyles({
              pathColor: "#FF6347",
              textColor: "#FF6347",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
        <div>
          <CircularProgressbar
            value={savingsPercentage}
            // text={`${savings}`}
            text={`${savingsPercentage.toFixed(2)}%`}
            styles={buildStyles({
              pathColor: "#20B2AA",
              textColor: "#20B2AA",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
      </div>

      <div className="expensefull1">
        <div style={{ marginBottom: 10 }}>
          <CircularProgressbar
            value={expenseCount}
            text={`${expenseCount}%`}
            styles={buildStyles({
              pathColor: "#FF6347",
              textColor: "#FF6347",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
        <div>
          <CircularProgressbar
            value={incomeCount}
            text={`${incomeCount}%`}
            styles={buildStyles({
              pathColor: "#20B2AA",
              textColor: "#20B2AA",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
      </div>
      <div className="info">
        <p className="info1">Saving: Rs. {totalIncome}</p>
        <p className="info1">Expense: Rs.{totalExpense}</p>
        <p className="info1">No. of Saving: {incomeCount}</p>
        <p className="info1">No. of Expense: {expenseCount}</p>
      </div>
    </div>
  );
};

export default Expenses;
