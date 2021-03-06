import React, { Component } from "react";
import Auxiliary from "../auxillary/Auxillary.jsx";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import ScoreModal from "../layout/Modal/scoreModal.jsx";
import $ from "jquery";
import "../../public/css/play.css";
class playquiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playId: {},
      questionsList: [],
      score: 0,
      questionNo: 0
    };
    this.playId = {};
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.playId !== this.state.playId) {
      let data = this.state.playId;
      $.ajax({
        url: "http://localhost:8000/getquestions",
        type: "GET",
        data: data,
        success: function(response) {
          if (response) {
            this.setState(
              {
                questionsList: response
              },
              () => {
                console.log("");
              }
            );
          }
        }.bind(this),
        error: function(response) {
          console.log(response);
        }
      });
    }
  }
  componentDidMount() {
    if (this.props.playId.length === 0) {
      this.props.redirect(true);
      return;
    }
    this.setState({ playId: { id: this.props.playId } });
  }
  switchQuestions = event => {
    let answer = event.target.innerText;
    let question_id = document.getElementById("hiddenId").innerText;
    let questionsList = [...this.state.questionsList];
    let answerdata = questionsList.filter(question => {
      return question._id.$oid === question_id;
    });

    if (answerdata[0].correct === answer) {
      let oldScore = this.state.score;
      let newScore = oldScore + 1;
      this.setState(
        {
          score: newScore
        },
        () => {
          if (
            this.state.score >= this.state.questionsList.length ||
            this.state.questionNo >= this.state.questionsList.length
          ) {
            this.refs.scoreModal.handleShow(this.state.score);
            return;
          }
        }
      );
    } else {
      this.setState(
        {
          score: this.state.score
        },
        () => {
          if (
            this.state.score >= this.state.questionsList.length ||
            this.state.questionNo >= this.state.questionsList.length
          ) {
            this.refs.scoreModal.handleShow(this.state.score);
            return;
          }
        }
      );
    }

    this.setState({
      questionNo: this.state.questionNo + 1
    });
  };
  setQuestion = index => {
    let question = document.getElementById("question");
    question.innerHTML = this.state.questionsList[index].question;
    let hiddenId = document.getElementById("hiddenId");
    let stringifyQuestionId = JSON.stringify(
      this.state.questionsList[index]._id
    );
    hiddenId.innerHTML = JSON.parse(stringifyQuestionId).$oid;
    let options = this.state.questionsList[index].options;
    options.push(this.state.questionsList[index].correct);
    for (var i = options.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = options[i];
      options[i] = options[j];
      options[j] = temp;
    }
    options = [...new Set(options)];

    document.getElementById("opt1").innerHTML = options[0];
    document.getElementById("opt2").innerHTML = options[1];
    document.getElementById("opt3").innerHTML = options[2];
    document.getElementById("opt4").innerHTML = options[3];
  };
  restartQuiz = () => {
    this.setState({
      questionNo: 0,
      score: 0,
      playId: this.state.playId
    });
    this.refs.scoreModal.handleClose();
  };
  render() {
    if (this.state.questionsList.length) {
      if (this.state.questionNo < this.state.questionsList.length) {
        this.setQuestion(this.state.questionNo);
      }
    }
    return (
      <Auxiliary>
        <ScoreModal
          ref={"scoreModal"}
          restartQuiz={this.restartQuiz}
          redirect={this.props.redirect}
        />
        <div className="bg"></div>
        <div className="bg-text txt">
          <p id="question"></p>
          <p id="hiddenId"></p>
        </div>
        <div id="opt1" onClick={event => this.switchQuestions(event)}></div>
        <div id="opt2" onClick={event => this.switchQuestions(event)}></div>
        <div id="opt3" onClick={event => this.switchQuestions(event)}></div>
        <div id="opt4" onClick={event => this.switchQuestions(event)}></div>
      </Auxiliary>
    );
  }
}

export default playquiz;
