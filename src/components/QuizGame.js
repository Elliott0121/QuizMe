import React, { Component } from 'react';
import Answers from '../components/Answers.js';
import { Popup } from 'semantic-ui-react';

export class QuizGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            highScore: 0,
            status: ''
        }
    }

    updateStyle() {
        document.getElementById("Current-Score").className = "ui inverted yellow button animate__animated animate__bounceIn";
        setTimeout(() => {
            document.getElementById("Current-Score").className = "ui inverted yellow button animate__animated animate__fadeOut"
        }, 1500);
    }

    componentDidMount() {
        this.updateStyle();
    }

    saveScore() {
        if (localStorage.getItem(`High_Score_${this.props.rounds}`) == null || JSON.parse(localStorage.getItem(`High_Score_${this.props.rounds}`))["High_Score"] < this.state.score) {
            let d = new Date();
            let newEntry = {
                High_Score: this.state.score,
                Rounds: this.props.rounds,
                Date: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
            }
            localStorage.setItem(`High_Score_${this.props.rounds}`, JSON.stringify(newEntry));
        }
    }

    calculateScore(multiplier) {
        multiplier *= 10
        this.setState({ score: this.state.score += multiplier })
        if (this.props.index < this.props.rounds) {
            setTimeout(() => {
                this.props.getQuestion();
            }, 1500);
        } else {
            this.setState({ status: 'done' });
            this.saveScore();
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
                                <p id="Current-Score" className="ui inverted yellow button">Current Score: {this.state.score}</p>
                            </div>
                        </div>
                    </div>
                    <div className="ui dividing header"></div>
                    <div className="ui stackable centered two column grid">
                        {this.state.status == 'done' ?
                            <div id="results" className="ui raised segment animate__animated animate__fadeInDown">
                                {localStorage.getItem(`High_Score_${this.props.rounds}`) == null || JSON.parse(localStorage.getItem(`High_Score_${this.props.rounds}`))["High_Score"] < this.state.score ?
                                    <div className="ui huge icon">
                                        <div id="High-Score">
                                            <i aria-hidden="true" className="trophy big yellow icon"></i>
                                            <i aria-hidden="true" className="certificate big loading large red icon"></i>
                                        </div>
                                        <p id="Score" className="animate__animated animate__pulse"><strong>New High Score!</strong></p>
                                        <p>Final Score: {this.state.score}</p>
                                    </div>
                                    : <p>Final Score: {this.state.score}</p>
                                }
                                <div className="ui divider"></div>
                                <p className="ui inverted green button" onClick={() => this.props.goBack()}>Continue</p>
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