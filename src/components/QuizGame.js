import React, { Component } from 'react';
import Answers from '../components/Answers.js';
import {Popup} from 'semantic-ui-react';

export class QuizGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            status: ''
        }
    }

    updateStyle() {
        document.getElementById("Current-Score").className = "ui disabled inverted yellow button animate__animated animate__fadeInDown";
        setTimeout(() => {
            document.getElementById("Current-Score").className = "ui disabled inverted yellow button animate__animated animate__fadeOut"
        }, 1500);
    }

    componentDidMount() {
        this.updateStyle();
    }

    calculateScore(multiplier) {
        multiplier *= 10
        this.setState({ score: this.state.score += multiplier })
        if (this.props.index < this.props.rounds) {
            setTimeout(() => {
                this.props.getQuestion();
            }, 1500);
        } else {
            this.setState({ status: 'done' })
        }
        console.log(this.state.score)
        this.updateStyle();
    }

    render() {
        let currentRound = this.props.rounds != 0 ?
            React.createElement('p', { id: this.props.index, className: "ui disabled inverted orange button" },
                `Round ${this.props.index} / ${this.props.rounds}`) : ''
        return this.props.questions.map((question, index) => (
            <div className='ui container center aligned' key={index}>
                <div className="ui segment">
                    <div id="container-image" className="ui segment">
                        <div id="placeholder">
                            <img id="image" draggable="false" src="../public/media/quizme.png" className="ui fluid image" alt="Quiz Me background-image" />
                        </div>
                        <div id="jumbo">
                            <p><strong>{question.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}</strong></p>
                            <div className="Info">
                                <p>Category: {question.category}</p>
                                <p id="Current-Score" className="ui disabled inverted yellow button">Current Score: {this.state.score}</p>
                            </div>
                        </div>
                    </div>
                    <div className="ui dividing header"></div>
                    <div className="ui stackable centered two column grid">
                        {this.state.status == 'done' ?
                            <div id="results" className="ui segment animate__animated animate__fadeInDown">
                                <p class="ui icon basic black button"><i aria-hidden="true" class="trophy icon"></i> Final Results: {this.state.score}</p>
                                <p className="ui basic green button" onClick={() => this.props.goBack()}>Continue</p>
                            </div> :
                            <Answers
                                answers={this.props.answers}
                                correctAnswer={this.props.correctAnswer}
                                calculateScore={this.calculateScore.bind(this)}
                            />}
                    </div>
                    <div className="ui dividing header"></div>
                    <Popup
                        content={<button style={{ marginTop: '10px' }} type="button" className="ui tiny inverted red button" onClick={() => this.props.goBack()}>Quit</button>}
                        header='Quit Quiz?' on='click' pinned position={"bottom center"}
                        style={{ textAlign: 'center' }} className='animate__animated animate__fadeIn'
                        trigger={<button type="button" className="ui inverted red button" >Go Back</button>}
                    />
                <div id="floating-label" className="ui red floating label">
                <Popup
                    trigger={<i id="help" className="question circle outline big icon"></i>}
                    content={<ol role="list" className="ui list">
                    <li role="listitem">First Try = 20 points</li>
                    <li role="listitem">Second Try = 15 points</li>
                    <li role="listitem">Third Try = 10 points</li>
                    <li role="listitem">Last Try = 5 points</li>
                  </ol>}
                    position='bottom left'
                />
                </div>
                </div>
                {currentRound}
            </div>
        ))
    }
}

export default QuizGame