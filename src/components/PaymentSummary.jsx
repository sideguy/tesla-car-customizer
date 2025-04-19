export default function PaymentSummary({ currentPrice }) {
    // Calculate payment breakdown
    const downPayment = currentPrice * 0.1;
    const loanTermMonths = 60;
    const interestRate = 0.03;
    const loanAmount = currentPrice - downPayment;
    const monthlyInterestRate = interestRate / 12;
    const monthlyPayment =
      (loanAmount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths))) /
      (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
  
    return (
      <>
        <div className="pt-4">
          <h3 className="font-semibold text-lg">Total Price</h3>
          <p className="text-2xl font-bold">
            ${currentPrice.toLocaleString()}
          </p>
        </div>
  
        <div className="border-t pt-4 mt-6">
          <h3 className="font-semibold text-lg">Estimated Payment Breakdown</h3>
          <div className="mt-4">
            <p>
              Down Payment:
              <span className="font-bold"> ${downPayment.toLocaleString()}</span>
            </p>
            <p>Loan Term: <span className="font-bold">60 Months</span></p>
            <p>Interest Rate: <span className="font-bold">3% APR</span></p>
            <p>
              Estimated Monthly Payment:
              <span className="font-bold text-2xl">
                ${monthlyPayment.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </>
    );
  }
  