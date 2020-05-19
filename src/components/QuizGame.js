import React, { Component } from 'react';
import Answers from '../components/Answers.js';
import { Popup } from 'semantic-ui-react';

export class QuizGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1
        }
    }

    componentDidUpdate() {
        document.getElementById("Quiz-Game").className = "ui container center aligned animate__animated animate__backInDown";
        setTimeout(() => { document.getElementById("Quiz-Game").className = "ui container center aligned" }, 1000);
        let buttons = document.getElementsByTagName("span")
        document.getElementsByTagName("button")[0].className = "ui inverted red button"
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = "ui inverted orange button column";
        }
    }

    updateRound(update) {
        this.setState({ index: update })
        if (this.state.index > this.props.rounds) {
            console.log("Quiz Completed")
            this.props.goBack()
        } else {
            this.props.getQuestion();
            console.log(update)
        }
    }

    render() {
        let currentRound = this.props.rounds != 0 ?
            React.createElement('p', { id: this.state.index, className: "ui disabled basic primary button" },
                `Round ${this.state.index} / ${this.props.rounds}`) : ''
        return this.props.questions.map((question, index) => (
            <div className='ui container center aligned' key={index} id="Quiz-Game">
                <div className="ui segment">
                    <p><strong>{question.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}</strong></p>
                    <div className="Info">
                        <p>Category: {question.category}</p>
                    </div>
                    <div className="ui dividing header"></div>
                    <div className="ui stackable centered two column grid">
                        <Answers
                            answers={this.props.answers.sort(() => Math.random() - 0.5)}
                            correctAnswer={this.props.correctAnswer}
                            updateRound={this.updateRound.bind(this)}
                            index={this.state.index}
                        />
                    </div>
                    <Popup
                        content={<button style={{ marginTop: '10px' }} type="button" className="ui tiny inverted red button" onClick={() => this.props.goBack()}>Quit</button>}
                        header='Quit Quiz?' on='click' pinned position={"bottom center"}
                        style={{ textAlign: 'center' }} className='animate__animated animate__fadeIn'
                        trigger={<button type="button" className="ui inverted red button" >Go Back</button>}
                    />
                </div>
                {currentRound}
            </div>
        ))
    }
}

export default QuizGame