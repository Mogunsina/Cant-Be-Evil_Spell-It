import React, { Component } from "react";
import { Person } from "blockstack";
//import { quizData } from "./quizData.js";

//import "./profile.css";

import Header from "./Header";
import UserScore from "./UserScore";
import Letters from "./Letter";
import Words from "./Words";
import Answers from "./Answers";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      wordSetLength: undefined,
      isCorrect: undefined,
      answerShow: "hidden",
      grayForm: "show",

      validLetters: [],
      validPangrams: [],
      validAnswers: [],
      validScore: 0,

      userGuess: "",
      userPangrams: [],
      userAnswers: [],
      userScore: 0,

      // AJAX call variables
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(
      "https://accesscontrolalloworiginall.herokuapp.com/http://robincamille.com/spellingbeetle/jumble5_hard.json"
    )
      .then(res => res.json())
      .then(
        result => {
          const randNum = Math.floor(
            Math.random() * (result.wordSets.length - 1)
          );
          this.setState({
            isLoaded: true,
            validLetters: result.wordSets[randNum].validLetters,
            validPangrams: result.wordSets[randNum].validPangram,
            validAnswers: result.wordSets[randNum].validAnswers,
            wordSetLength: result.wordSets.length
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  //end AJAX stuff

  getValidScores(answers, pangrams) {
    // biggest possible score
    let score = 0;

    answers.forEach(function(word) {
      score = score + word.length;
    });
    pangrams.forEach(function(word) {
      score = score + 10 + word.length;
    });
    return score;
  }

  shuffleLetters() {
    let theLetters = this.state.validLetters;
    for (let i = theLetters.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let x = theLetters[i];
      theLetters[i] = theLetters[j];
      theLetters[j] = x;
    }
    this.setState({
      validLetters: theLetters
    });
  }

  scoreAnswers() {
    let score = 0;

    this.state.userAnswers.forEach(function(word) {
      score = score + word.length;
      console.log("+ " + word.length);
    });
    this.state.userPangrams.forEach(function(word) {
      score = score + 10 + word.length;
      console.log("+ 10 + " + word.length);
    });
    this.setState({
      userScore: score
    });
  }

  evaluateWord(word) {
    console.log(word + " submitted");

    let currentList = this.state.userAnswers;
    let currentPangram = this.state.userPangrams;

    if (this.state.userAnswers.includes(word)) {
      console.log("word already guessed");
      this.setState({
        isCorrect: "alreadyguessed"
      });
    } else if (this.state.validPangrams.includes(word)) {
      console.log("pangram!");
      currentPangram.push(word);
      currentPangram.sort();
      this.setState({
        userPangrams: currentPangram,
        isCorrect: "pangram"
      });
      this.scoreAnswers();
    } else if (this.state.validAnswers.includes(word)) {
      console.log("word is accepted");
      currentList.push(word);
      currentList.sort();
      this.setState({
        userAnswers: currentList,
        isCorrect: "yes"
      });
      this.scoreAnswers();
    } else {
      console.log("word is rejected");
      this.setState({
        userPangrams: currentPangram,
        isCorrect: "no"
      });
    }
  }

  answerToggler() {
    let css = this.state.answerShow === "hidden" ? "show" : "hidden";
    this.showAnswersEndGame();
    this.setState({
      answerShow: css
    });
  }

  newSet() {
    this.componentDidMount(); //re-chooses all valid__ state variables
    this.setState({
      answerShow: "hidden",
      userGuess: "",
      userAnswers: [],
      userPangrams: [],
      userScore: 0,
      isCorrect: undefined,
      grayForm: "show"
    });
  }

  showAnswersEndGame() {
    console.log("end game");

    this.setState({
      grayForm: "grayed"
    });
  }

  render() {
    const { handleSignOut, userSession } = this.props;
    const { person } = this.state;
    return !userSession.isSignInPending() ? (
      <div className="panel-welcome" id="section-2">
        <h1>
          Hello,{" "}
          <span id="heading-name">
            {person.name() ? person.name() : "Nameless Person"}
          </span>
        </h1>
        <Header />
        <UserScore
          userScore={this.state.userScore}
          userWordCount={
            this.state.userAnswers.length + this.state.userPangrams.length
          }
          validAnswers={this.state.validAnswers}
          validPangrams={this.state.validPangrams}
          validWordCount={
            this.state.validAnswers.length + this.state.validPangrams.length
          }
          getValidScores={this.getValidScores.bind(this)}
          highScore={this.state.highScore}
        />
        <Letters
          shuffleTheLetters={this.shuffleLetters.bind(this)}
          validLetters={this.state.validLetters}
          newSet={this.newSet.bind(this)}
        />
        <Words
          validPangrams={this.state.validPangrams}
          validAnswers={this.state.validAnswers}
          userAnswers={this.state.userAnswers}
          userPangrams={this.state.userPangrams}
          updateScore={this.scoreAnswers.bind(this)}
          evaluateWord={this.evaluateWord.bind(this)}
          isCorrect={this.state.isCorrect}
          grayForm={this.state.grayForm}
        />
        <Answers
          validPangrams={this.state.validPangrams}
          validAnswers={this.state.validAnswers}
          answerShow={this.state.answerShow}
          answerToggler={this.answerToggler.bind(this)}
          showAnswersEndGame={this.showAnswersEndGame.bind(this)}
        />

        <p className="lead">
          <button
            className="btn btn-primary navibar"
            id="signout-button"
            onClick={handleSignOut.bind(this)}
          >
            Logout
          </button>
        </p>
      </div>
    ) : null;
  }

  componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile)
    });
  }
}
