import './App.css'
import Number from "./Number"
import React from "react";
import { nanoid } from 'nanoid';
import Confetti from "react-confetti"

export default function Frame() {

    function genNumbers() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const arraynum = [];
        for (let i = 0; i < 10; i++) {
            arraynum.push(genNumbers());
        }
        return arraynum;
    }

    const [number, setNumber] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    function holdDice(id) {
        console.log(id);
        setNumber(oldice => oldice.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }));
    }

    const numberelements = number.map((die) => <Number key={die.id} number={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />);

    function rollDice() {
        if(!tenzies) {
            setNumber(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    genNumbers()
            }))
        } else {
            setTenzies(false)
            setNumber(allNewDice())
        }
    }

    React.useEffect(() => {
        const allHeld = number.every(die => die.isHeld);
        const firstValue = number[0].value;
        const allSameValue = number.every(die => die.value === firstValue);
        if (allHeld && allSameValue) {
            setTenzies(true);
            console.log("You won!");
        }
    }, [number]);

    return (


        <main>
            {tenzies && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current
                value between rolls.</p>
            <div className="dice-container">
                {numberelements}
            </div>
            <button
                className="roll-dice"
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>


    );
}
