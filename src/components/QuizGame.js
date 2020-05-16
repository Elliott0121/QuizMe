import React, { Component } from 'react';
import Answers from '../components/Answers.js';
import { Popup } from 'semantic-ui-react';

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
                    <Popup
                        content={<button style={{ marginTop: '10px' }} type="button" className="ui tiny inverted red button" onClick={() => this.props.goBack()}>Quit</button>}
                        header='Quit Quiz?' on='click' pinned position={"bottom center"}
                        style={{ textAlign: 'center' }} className='animate__animated animate__fadeIn'
                        trigger={<button type="button" className="ui inverted red button" >Go Back</button>}
                    />
                </div>
            </div>
        ))
    }
}

export default QuizGame