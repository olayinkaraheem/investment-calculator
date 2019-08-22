/**
 * @params object req, the request object
 * @params object res, the response object
 * This function takes in two argument, req and res
 * it then extracts the sub, tenor, rate properties of the req.body
 * to perfomr the calculation based on the requirement
 */
const calculateInvestment = (req, res) => {
  const { sub, tenor, rate } = req.body;
  if (!sub || !tenor || !rate) {
    res.status(400).json("Please check your inputs. All fields are required");
  } else {
    let openingBal = 0;
    let totalSub = 0;
    let totalInterestEarned = 0;
    let totalInvestment = 0;

    const results = [];

    for (let i = 0; i < tenor; i++) {
      if (i == 0) {
        results[i] = {
          month: i + 1,
          opening_bal: openingBal,
          subscription: sub,
          interest: sub * (rate / 100),
          closing_balance: sub * (rate / 100) + sub
        };
      } else {
        let intr =
          (sub + results[results.length - 1].closing_balance) * (rate / 100);
        let closing_bal =
          results[results.length - 1].closing_balance + sub + intr;
        results[i] = {
          month: i + 1,
          opening_bal: results[results.length - 1].closing_balance,
          subscription: sub,
          interest: intr,
          closing_balance: closing_bal
        };
      }
    }

    totalSub = results.reduce((curr, next) => {
      console.log("1", curr, next);
      console.log("1.5", curr.subscription, next.subscription);
      return curr.subscription + next.subscription;
    }, 0);
    console.log(totalSub);
    totalInterestEarned = results.reduce((curr, next) => {
      console.log("2", curr, next);
      console.log("3", curr.interest, next.interest);
      return curr.interest + next.interest;
    }, 0);
    console.log("inv", totalInterestEarned);
    totalInvestment = totalSub + totalInterestEarned;
    console.log("tot", totalInvestment);

    const output = {
      data: results
      //totalInterestEarned,
      //totalInvestment,
      //totalSub
    };

    res.status(200).json(output);
  }
};

module.exports = {
  calculateInvestment
};
