import React from 'react';


export default class LookupMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderResults(movie) {
    return (
      <div>
        <h3>{movie}</h3>
      </div>
    );
  }
  render() {
    return (
        <form onSubmit={this.props.onSearchClick}>
          <div>
            <input name="title" type="text" placeholder="enter movie title" onChange={this.props.handleTitleChange} />
          </div>
          <div>
            <input name="season" type="text" placeholder="enter season (optional)" onChange={this.props.handleColorChange} />
          </div>
          <div>
            <button>Search</button>
          </div>
        </form>
    );
  }

}
