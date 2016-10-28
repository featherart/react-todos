import React from 'react';

export default class CreateVoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    var voices = window.speechSynthesis.getVoices();
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
    msg.text = this.state.movieTitle;
    speechSynthesis.speak(msg);
    return (
      <li key={counter++}>{this.state.movieTitle}</li>
    )
  }
}
