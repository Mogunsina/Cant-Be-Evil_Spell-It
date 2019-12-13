import React, { Component } from "react";
// import "./styles/style.css";
export default class Signin extends Component {
  render() {
    const { handleSignIn } = this.props;

    return (
      <React.Fragment>
        <div class="topnav">
          <img id="logo" src=".\images\spell.jpg" />
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          {/* <a href="#contact">About</a> */}
          <a href="https://blockstack.org/">Blockstack</a>
        </div>
        <div class="HOME">
          <div id="home">
            <p>PROVIDING AN ARTSY WAY</p>
            <p>OF SPELLING WITH YOUR</p>
            <p>PRIVACY INTACT!</p>
            <i>
              "Anyone who can only think of one way to spell a word obviously
              lacks imagination."
            </i>
          </div>
        </div>
        <div class="FEAT">
          <div id="features">
            <h1>
              <img id="icon" src=".\images\spelt.jpg" />
            </h1>
            <h2>
              Ever wondered how different words could come together just by
              shuffling the same letters? We refer to this term as "PANGRAMS",
              like our familiar ANAGRAMS game for our fellow iOS users. With
              "SpellIt", the user can do much more and it is not restricted to
              iOS users.
            </h2>
            <p> </p>
            <h2>
              The user can click the ‘Play’ button to hear the words that’s to
              be entered and can see letters displayed in the word input text
              box as they are entered on the keyboard, which is a usual feature.
              The user can also click the ‘Submit’ button to key in the first
              word that has been typed in the word input text box User can see a
              confirmation message when the correct word is typed. Also, the
              user can see a message requesting the word be typed again when it
              is spelled incorrectly User can see a tally of the number of
              correct spellings, the total number of words attempted, and the
              score which is calculated based on what type of word is put in,
              whether it is a pangram or not.
            </h2>
            <p> </p>
            <h2>
              <b>**Be Aware**</b>
              <p> </p>
              We only offer Blockstack login because your data is stored in
              <i> Gaia </i>
              and nowhere else. This requires you to have a FREE Blockstack
              account, which allows access to well over 180 other Blockstack
              applications! We are a <i>truly</i> decentralized application.
            </h2>
          </div>
        </div>
        <div className="panel-landing" id="section-1">
          {/* <h1 className="landing-heading">Time2Spell</h1> */}
          <p className="lead">
            <button
              className="btn btn-primary btn-lg"
              id="signin-button"
              onClick={handleSignIn.bind(this)}
            >
              Login With Blockstack
            </button>
          </p>
        </div>
      </React.Fragment>
    );
  }
}
