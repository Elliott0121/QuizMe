import React, { Component } from 'react';

export class Answers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: document.getElementsByTagName("span")
        }
    }

    componentDidUpdate() {
        document.getElementsByTagName("button")[0].className = "ui inverted red button"
        for (let i = 0; i < this.state.buttons.length; i++) {
            this.state.buttons[i].className = "ui inverted orange button column";
        }
    }

    checkAnswer(event) {
        if (event.target.textContent == this.props.correctAnswer) {
            console.log(`Correct! | ${event.target.textContent}`);
            for (let i = 0; i < this.state.buttons.length; i++) {
                if (this.state.buttons[i].className != 'ui disabled red button') {
                    this.state.buttons[i].className = "ui disabled red button column animate__animated animate__headShake"
                    document.getElementsByTagName("button")[0].className = "ui disabled inverted red button"
                }
            }
            event.target.className = "ui disabled green button column animate__animated animate__heartBeat";
            setTimeout(() => { this.props.getQuestion() }, 3000);

        } else {
            console.log(`Wrong! | ${event.target.textContent}`);
            event.target.className = "ui disabled red button column animate__animated animate__headShake";
        }
    }

    render() {
        return this.props.answers.map((answer, index) => (
            <span key={index} type="button" className="ui inverted orange button column" onClick={(e) => this.checkAnswer(e)}>{answer}</span>
        ))
    }
}

export default Answers