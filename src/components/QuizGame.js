import React, { Component } from 'react';
import Answers from '../components/Answers.js';
import { Popup } from 'semantic-ui-react';

export class QuizGame extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        document.getElementById("Quiz-Game").className = "ui container center aligned animate__animated animate__zoomIn";
        setTimeout(() => { document.getElementById("Quiz-Game").className = "ui container center aligned" }, 1000);
        document.title = `QuizMe | ${this.props.index} - ${this.props.rounds}`
    }

    render() {
        let currentRound = this.props.rounds != 0 ?
            React.createElement('p', { id: this.props.index, className: "ui disabled inverted orange button" },
                `Round ${this.props.index} / ${this.props.rounds}`) : ''
        return this.props.questions.map((question, index) => (
            <div className='ui container center aligned' key={index} id="Quiz-Game">
                <div className="ui segment">
                    <div id="container-image" className="ui segment">
                        <div id="placeholder">
                            <img id="image" src="../public/media/quizme.png" className="ui fluid image" alt="Quiz Me background-image"/>
                        </div>
                        <div id="jumbo">
                            <p><strong>{question.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}</strong></p>
                            <div className="Info">
                                <p>Category: {question.category}</p>
                            </div>
                        </div>
                    </div>
                    <div className="ui dividing header"></div>
                    <div className="ui stackable centered two column grid">
                        <Answers
                            answers={this.props.answers.sort(() => Math.random() - 0.5)}
                            correctAnswer={this.props.correctAnswer}
                            getQuestion={this.props.getQuestion}
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