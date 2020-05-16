import React, { Component } from 'react';
import Answers from '../components/Answers.js';

export class QuizGame extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        document.getElementById("Quiz-Game").className = "ui container center aligned animate__animated animate__zoomIn"
    }

    render() {
        return this.props.questions.map((question, index) => (
            <div className="ui container center aligned animate__animated animate__zoomIn" key={index} id="Quiz-Game">
                <div className="ui segment">
                    <p><strong>{question.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}</strong></p>
                    <div className="Info">
                        <p>Category: {question.category}</p>
                        <p className="Difficulty">Difficulty: {question.difficulty}</p>
                    </div>
                    <div className="ui dividing header"></div>
                    <ul>
                        <Answers
                            answers={this.props.answers.sort(() => Math.random() - 0.5)}
                            correctAnswer={this.props.correctAnswer}
                            getQuestion={this.props.getQuestion}
                        />
                    </ul>
                    <p onClick={this.props.handleState}>Go Back</p>
                </div>
            </div>
        ))
    }
}

export default QuizGame