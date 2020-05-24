import React, { Component } from 'react';

export class Answers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: document.getElementsByTagName("span"),
            points: 2
        }
    }

    checkAnswer(event) {
        // Checks if the answer is correct or wrong depending on user input.
        // Points are sent to calculateScore after correct answer is given.
        if (event.target.textContent == this.props.correctAnswer) {
            for (let i = 0; i < this.state.buttons.length; i++) {
                if (this.state.buttons[i].className != 'ui disabled red button') {
                    this.state.buttons[i].className = "ui disabled red button column animate__animated animate__headShake"
                    document.getElementsByTagName("button")[0].className = "ui disabled inverted red button";
                }
            }
            event.target.className = "ui disabled green button column animate__animated animate__heartBeat";
            setTimeout(() => {
                this.props.calculateScore(this.state.points), this.setState({ points: 2 })
            }, 3000);
        } else {
            this.setState({ points: this.state.points -= 0.5 });
            event.target.className = "ui disabled red button column animate__animated animate__headShake";
        }
    }

    render() {
        return this.props.answers.map((answer, index) => (
            <span id="answer-btn" key={index} type="button" className="ui inverted orange button column" onClick={(e) => this.checkAnswer(e)}>{answer}</span>
        ))
    }
}

export default Answers