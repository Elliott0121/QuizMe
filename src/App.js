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
      type: ''
    }
  }

  handleQuestions() {
    this.setState(prevState => ({
      questions: !prevState.questions,
      dropdown: '', type: ''
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
    return this.state.questions == "" ? (
      <div className="ui container center aligned animate__animated animate__fadeInDown">
        <div className="ui segment">
          <h1 className="ui header">QuizMe</h1>
          <Dropdown getDropdown={this.getDropdown.bind(this)} getType={this.getType.bind(this)} />
          <div className="ui dividing header"></div>
          <button type="button" className="ui inverted primary button" onClick={(e) => this.getQuestion(e)}>Generate Question</button>
        </div>
      </div>
    ) :
      <div className="ui container center aligned">
        <Quiz
          answers={this.state.answers}
          questions={this.state.questions}
          correctAnswer={this.state.correctAnswer}
          getQuestion={this.getQuestion.bind(this)}
          handleState={this.handleQuestions.bind(this)}
        />
      </div>

  }
}

export default App