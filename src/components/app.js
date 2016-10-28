import React from 'react';
import CreateTodo from './create-todo';
import TodosList from './todos-list';
import LookupMovie from './lookup-movie';
import axios from 'axios';

const todos = [
  {
    task: 'do a thing',
    isCompleted: false
  },
  {
    task: 'build a dirigible',
    isCompleted: true
  }
]
class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    var voices = window.speechSynthesis.getVoices();
    const movieArray = this.props.movie && this.props.movie.data && this.props.movie.data.Episodes.map((episode) => {
      var msg = new SpeechSynthesisUtterance();
      if(voices.length > 0) {
        msg.voice = voices[Math.floor(Math.random() * 83) + 1];
      } else {
        msg.lang = "en-GB";
      }
      console.log('voice: ', msg.voice);
      msg.voiceURI = 'native';
      msg.volume = 1; // 0 to 1
      msg.rate = 0.9; // 0.1 to 10
      msg.pitch = 1; //0 to 2
      msg.text = episode.Title;

      speechSynthesis.speak(msg);

      return <li key={episode.imdbID}>{episode.Title}</li>
    })
    return(
      <ul>{movieArray}</ul>
    )
  }
}
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: todos
    };
  }
  handleTitleChange(event) {
    this.setState({movie: event.target.value});
  }
  handleColorChange(event) {
    this.setState({season: event.target.value});
  }
  render() {
    console.log("the state that I am in", this.state);
    console.log('movies: ', this.state.movie);
    return (
      <div>
        <h1>React Todos App</h1>
        <TodosList todos={this.state.todos}
                   toggleTask={this.toggleTask.bind(this)}
                   saveTask={this.saveTask.bind(this)}
                   deleteTask={this.deleteTask.bind(this)}
        />
        <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
        <h1>Search for a Movie</h1>
        <LookupMovie handleTitleChange={this.handleTitleChange.bind(this)}
                     handleColorChange={this.handleColorChange.bind(this)}
                     onSearchClick={this.onSearchClick.bind(this)}/>
        <MovieList movie={this.state.movie}/>
      </div>
    );
  }
  toggleTask(task) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === task);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    this.setState({todos: this.state.todos });
  }
  createTask(task) {
    this.state.todos.push({
      task,
      isCompleted: false
    });
    this.setState({ todos: this.state.todos });
  }

  saveTask(oldTask, newTask) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
    foundTodo.task = newTask;
    this.setState({ todos: this.state.todos });
  }

  deleteTask(taskToDelete) {
    _.remove(this.state.todos, todo => todo.task === taskToDelete);
    this.setState({ todos: this.state.todos });
  }
  onSearchClick(event) {
    event.preventDefault();

    const searchTerm = this.state.movie;
    const searchSeason = this.state.season || 1;

    console.log(`http://www.omdbapi.com/?t=${searchTerm}&Season=${searchSeason}`);
    axios.get(`http://www.omdbapi.com/?t=${searchTerm}&Season=${searchSeason}`)
    .then(function(response) {
      console.log(response);
      this.setState({movie: response});
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });

    //this.setState({movie: "", season: ""});
  }
  onPlayScene(event) {
    console.log('in here ', event);
    event.preventDefault();
    var voices = speechSynthesis.getVoices();
    console.log('voices ', voices);

    let narrator = "Scene opens on a sunlit living room. A great old crumbling manor in the English countryside, tasteful but a little bit in shambles. The two siblings are seated side by side, awkwardly."
    let narrator2 = "clock ticks for a minute";
    let narrator3 = "long awkward pause";
    let aimee = "It was my last chance to do something ridiculous, before becoming a crazy old cat lady, Jerrod!";
    let jerrod = "So… you signed up for a stand-up comedy class?!";

    // first narration
    let msg = new SpeechSynthesisUtterance();
    msg.voiceURI = 'native';
    msg.lang = "en-US";
    msg.volume = 1; // 0 to 1
    msg.rate = 0.9; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.text = narrator;

    speechSynthesis.speak(msg);

    // aimee talks
    let msgA = new SpeechSynthesisUtterance();

    //msgA.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google UK English Female'; })[0];
    msgA.voice = voices[66];
    msgA.text = aimee;

    speechSynthesis.speak(msgA);
  }
}
