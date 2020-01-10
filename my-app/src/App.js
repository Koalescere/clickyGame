import React from 'react';
import './App.css';
import Card from './components/Card';
import Scoreboard from './components/Scoreboard';
import pictures from './cards.json';
// import Game from './components/Game';

//shuffle upon each click, https://javascript.info/task/shuffle, Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class App extends React.Component {
  state = {
    pictures,
    score: 0,
    topScore: 0,
    showAlert: 0,
    showSuccess: 0,
    pastSelections: []
  }

  UNSAFE_componentWillMount() {
    this.setState({ pictures: pictures })
  }
  clickedImage = id => {
    // assign the state of the empty array to a let to be updated
    let pastSelections = this.state.pastSelections;
    let score = this.state.score;
    let topScore = this.state.topScore;
    this.setState({
      showAlert: 0
    });

    // if the clicked image has an id of the indexed pictures
    if (pastSelections.indexOf(id) === -1) {
      // push that id into the array to be stored
      pastSelections.push(id);
      console.log(pastSelections);
      // run the score function
      this.handleIncrement();
      // run the reshuffle function after each click
      this.makeShuffle();
    } else if (this.state.score === 9) {
      // alert player wins
      this.setState({
        showSuccess: 1,
        score: 0,
        pastSelections: []
      });
    } else {
      // alert player loss
      this.setState({
        score: 0,
        pastSelections: []
      });
      console.log("duplicate");
      this.setState({
        showAlert: 1
      });
    }

    if (score > topScore) {
      this.setState({
        topScore: score
      });
    }
  };

  // handleIncrement increases this.state.score by 1
  handleIncrement = () => {
    // setState updates a components states
    this.setState({ score: this.state.score + 1 });
  };

  // shuffle up images
  makeShuffle = () => {
    this.setState({ pictures: shuffle(pictures) });
  };

  render() {
    return (
      <div className="container">
        <div
          className="alert alert-danger"
          style={{ opacity: this.state.showAlert }}
        >
          Try again, already clicked...
          </div>
        <div
          className="alert alert-success"
          style={{ opacity: this.state.showSuccess }}
        >
          Hurrah! Duplicate was not clicked!
          </div>
        <Scoreboard
          title="clicky Game"
          score={this.state.score}
          topScore={this.state.topScore}
        />
        <div className="row">
          {this.state.pictures.map(pictures => (
            <Card

              id={pictures.id}
              key={pictures.id}
              image={pictures.url}
              clickedImage={this.clickedImage}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
