import { useState } from "react";

import Header from "./components/Header/Header";
import UserInput from "./components/UserInput/UserInput";
import ResultsTable from "./components/ResultsTable/ResultsTable";

function App() {
    const [userInput, setUserInput] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const calculateHandler = (userInput) => {
        setUserInput(userInput);
        setShowResults(true);
    };

    const resetHandler = () => {
        setUserInput(null);
        setShowResults(false);
    };

    const yearlyData = [];

    if (userInput) {
        let currentSavings = +userInput["current-savings"];
        const yearlyContribution = +userInput["yearly-contribution"];
        const expectedReturn = +userInput["expected-return"] / 100;
        const duration = +userInput["duration"];

        for (let i = 0; i < duration; i++) {
            const yearlyInterest = currentSavings * expectedReturn;
            currentSavings += yearlyInterest + yearlyContribution;
            yearlyData.push({
                year: i + 1,
                yearlyInterest: yearlyInterest,
                savingsEndOfYear: currentSavings,
                yearlyContribution: yearlyContribution,
            });
        }
    }

    return (
        <div>
            <Header />

            <UserInput onCalculate={calculateHandler} onReset={resetHandler} />

            {!showResults && <p className="styled-p">No investment calculated yet.</p>}
            {showResults && (
                <ResultsTable data={yearlyData} initialInvestment={userInput["current-savings"]} />
            )}
        </div>
    );
}

export default App;
