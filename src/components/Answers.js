import React, { Component } from 'react';

export class Answers extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        let buttons = document.getElementsByTagName("li");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = "ui inverted orange button";
        }
    }

    checkAnswer(event) {
        if (event.target.textContent == this.props.correctAnswer) {
            console.log(`Correct! | ${event.target.textContent}`);
            event.target.className = "ui disabled green button animate__animated animate__heartBeat";
            setTimeout(() => { this.props.getQuestion() }, 3000);
        } else {
            console.log(`Wrong! | ${event.target.textContent}`);
            event.target.className = "ui disabled red button animate__animated animate__headShake";
        }
    }

    render() {
        return this.props.answers.map((answer, index) => (
            <li key={index} type="button" className="ui inverted orange button" onClick={(e) => this.checkAnswer(e)}>{answer}</li>
        ))
    }
}

export default Answers
