import React, { Component } from "react";
import Quiz from './components/QuizGame.js';
import Dropdown from './components/DropDown.js';
import axios from "axios";
import {Popup} from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      correctAnswer: '',
      dropdown: '',
      type: '',
      rounds: 0,
      index: 0
    }
  }

  exitQuiz() {
    document.title = 'QuizMe';
    this.setState(prevState => ({
      questions: !prevState.questions,
      dropdown: '', type: '', rounds: 0, index: 0
    }));
  }

  getDropdown(value) {
    this.setState({ dropdown: value })
  }

  getType(value) {
    this.setState({ type: value })
  }

  updateRound() {
    let buttons = document.getElementsByTagName("span")
    document.getElementsByTagName("button")[0].className = "ui inverted red button"
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].className = "ui inverted orange button column animate__animated animate__fadeIn"
    }
    this.setState({ index: this.state.index += 1 })
  }

  getQuestion() {
    axios.get(`https://opentdb.com/api.php?amount=1&category=${this.state.dropdown}&type=${this.state.type}`)
      .then(res => {
        let response = res.data.results;
        let answers = [response[0].correct_answer].concat(...[response[0].incorrect_answers])
        this.setState({ questions: response });
        this.setState({ answers: answers });
        this.setState({ correctAnswer: response[0].correct_answer })
        console.log(...this.state.questions);
        console.log(this.state.correctAnswer)
        this.updateRound();
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidUpdate() {
    let quizElement = document.getElementById("Quiz-Game")
    if (quizElement == null) {
      return;
    } else {
      quizElement.className = "ui container center aligned animate__animated animate__zoomIn";
      setTimeout(() => { quizElement.className = "ui container center aligned" }, 1000);
      document.title = `QuizMe | ${this.state.index} - ${this.state.rounds}`;
    }
  }

  render() {
    let styleLocked = this.state.rounds == 0 ? "ui disabled inverted primary button" : "ui inverted primary button";
    let choices = this.state.rounds != 0 ?
      React.createElement('p', { className: "ui blue pointing basic label animate__animated animate__fadeIn" },
        <i aria-hidden="true" className="flag outline icon"></i>, `Rounds ${this.state.rounds}`) : ''
    return this.state.questions == "" ? (
      <div className="ui container center aligned animate__animated animate__fadeInDown">
        <div className="ui segment">
          <h1 className="ui header">QuizMe</h1>
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
          <Dropdown getDropdown={this.getDropdown.bind(this)} getType={this.getType.bind(this)} />
          <div className="ui dividing header"></div>
          <button type="button" className="ui icon left inverted primary button" onClick={() => this.setState({ rounds: 5 })}>
            <i aria-hidden="true" className="angle right icon"></i>5 Rounds</button>
          <button type="button" className="ui icon left inverted primary button" onClick={() => this.setState({ rounds: 10 })}>
            <i aria-hidden="true" className="angle double right icon"></i>10 Rounds</button>
          <div className="ui dividing header"></div>
          <button type="button" id="start-quiz" className={styleLocked} onClick={(e) => this.getQuestion(e)}>Generate Question</button>
          {choices}
        </div>
      </div>
    ) :
      <div className="ui container center aligned" id="Quiz-Game">
        <Quiz
          answers={this.state.answers.sort(() => Math.random() - 0.5)}
          questions={this.state.questions}
          correctAnswer={this.state.correctAnswer}
          getQuestion={this.getQuestion.bind(this)}
          goBack={this.exitQuiz.bind(this)}
          rounds={this.state.rounds}
          index={this.state.index}
          loading={this.state.loading}
        />
      </div>
  }
}

export default App