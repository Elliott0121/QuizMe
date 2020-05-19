import React, { Component } from "react";
import Quiz from './components/QuizGame.js';
import Dropdown from './components/DropDown.js';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      correctAnswer: '',
      dropdown: '',
      type: '',
      rounds: 0
    }
  }

  exitQuiz() {
    this.setState(prevState => ({
      questions: !prevState.questions,
      dropdown: '', type: '', rounds: 0
    }));
  }

  getDropdown(value) {
    this.setState({ dropdown: value })
  }

  getType(value) {
    this.setState({ type: value })
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
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    let styleLocked = this.state.rounds == 0 ? "ui disabled inverted primary button" : "ui inverted primary button";
    return this.state.questions == "" ? (
      <div className="ui container center aligned animate__animated animate__fadeInDown">
        <div className="ui segment">
          <h1 className="ui header">QuizMe</h1>
          <Dropdown getDropdown={this.getDropdown.bind(this)} getType={this.getType.bind(this)} />
          <div className="ui dividing header"></div>
          <button type="button" className="ui icon left inverted primary button" data-rounds={5} onClick={(e) => this.setState({ rounds: e.target.getAttribute('data-rounds') })}>
            <i aria-hidden="true" className="angle right icon"></i>5 Rounds</button>
          <button type="button" className="ui icon left inverted primary button" data-rounds={10} onClick={(e) => this.setState({ rounds: e.target.getAttribute('data-rounds') })}>
            <i aria-hidden="true" className="angle double right icon"></i>10 Rounds</button>
          <div className="ui dividing header"></div>
          <button type="button" className={styleLocked} onClick={(e) => this.getQuestion(e)}>Generate Question</button>
        </div>
      </div>
    ) :
      <div className="ui container center aligned">
        <Quiz
          answers={this.state.answers}
          questions={this.state.questions}
          correctAnswer={this.state.correctAnswer}
          getQuestion={this.getQuestion.bind(this)}
          goBack={this.exitQuiz.bind(this)}
          rounds={this.state.rounds}
        />
      </div>

  }
}

export default App