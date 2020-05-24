import React, { Component } from "react";
import Quiz from './components/QuizGame.js';
import Dropdown from './components/DropDown.js';
import ScoreBoard from './components/ScoreBoard.js';
import axios from "axios";
import { Popup } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      correctAnswer: '',
      dropdown: { value: '', category: '' },
      type: { value: '', type: '' },
      rounds: 0,
      index: 0
    }
  }

  exitQuiz() {
    document.title = 'QuizMe';
    this.setState(prevState => ({
      questions: !prevState.questions,
      dropdown: { value: '', category: '' }, type: { value: '', type: '' },
      rounds: 0, index: 0
    }));
  }

  getDropdown(value, text) {
    this.setState({ dropdown: { value: value, category: text } })
  }

  getType(value, text) {
    this.setState({ type: { value: value, type: text } })
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
    // Generates one question based on category & type choice.
    axios.get(`https://opentdb.com/api.php?amount=1&category=${this.state.dropdown.value}&type=${this.state.type.value}`)
      .then(res => {
        let response = res.data.results;
        let answers = [response[0].correct_answer].concat(...[response[0].incorrect_answers])
        this.setState({ questions: response });
        this.setState({ answers: answers });
        this.setState({ correctAnswer: response[0].correct_answer })
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
      document.title =  this.state.rounds != 'Speed' ? `QuizMe | ${this.state.index} - ${this.state.rounds}` : 'QuizMe | Speed';
    }
  }

  render() {
    let styleLocked = this.state.rounds == 0 ? "ui disabled inverted orange button" : "ui inverted orange button";
    let choices = this.state.rounds != 0 ?
      React.createElement('p', { className: "ui orange pointing basic label animate__animated animate__fadeIn" },
        <div id="Quiz-Settings" style={{ display: 'grid' }}>
          <a className="ui label basic button"><i aria-hidden="true" className={this.state.rounds != 'Speed' ? "flag outline icon" : 'clock outline icon'}></i>{this.state.rounds != 'Speed' ? `${this.state.rounds} Rounds` : 'Speed Round'}</a>
          <a className="ui label basic button"><i aria-hidden="true" className="tag icon"></i>{this.state.dropdown.category == '' ? 'Category: Random Category' : `Category: ${this.state.dropdown.category}`}</a>
          <a className="ui label basic button"><i aria-hidden="true" className="clone icon"></i>{this.state.type.type == '' ? 'Type: Random Type' : `Type: ${this.state.type.type}`}</a>
        </div>) : ''
    return this.state.questions == "" ? (
      <div className="ui container center aligned animate__animated animate__fadeInDown">
        <div className="ui segment">
          <h1 className="ui header">QuizMe</h1>
          <Dropdown getDropdown={this.getDropdown.bind(this)} getType={this.getType.bind(this)} />
          <div className="ui dividing header"></div>
          <div id="option-btn-container">
            <button id="option-btn" type="button" className="ui icon left inverted orange button" onClick={() => this.setState({ rounds: 5 })}>
              <i aria-hidden="true" className="angle right icon"></i>5 Rounds</button>
            <button id="option-btn" type="button" className="ui icon left inverted orange button" onClick={() => this.setState({ rounds: 10 })}>
              <i aria-hidden="true" className="angle double right icon"></i>10 Rounds</button>
            <button id="option-btn" type="button" className="ui icon left inverted orange button" onClick={() => this.setState({ rounds: 'Speed' })}>
              <i aria-hidden="true" className="clock outline icon"></i> Speed Round</button>
            <div className="ui dividing header"></div>
            <button type="button" id="start-quiz" className={styleLocked} onClick={(e) => this.getQuestion(e)}>Generate Question</button>
            {choices}
          </div>
        </div>
        <ScoreBoard />
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
        />
      </div>
  }
}

export default App