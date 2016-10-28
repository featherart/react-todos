import React from 'react';

export default class CreateTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  renderError() {
    if (!this.state.error) { return null; }

    return <div style={{ color: 'red' }}>{this.state.error}</div>;
  }

  render() {
    return (
      <form onSubmit={this.handleCreate.bind(this)}>
        <input type="text" placeholder="enter task" ref="createInput" />
        <button>Create</button>
        {this.renderError()}
      </form>
    );
  }

  handleCreate(event) {
    event.preventDefault()

    const createInput = this.refs.createInput;
    const task = createInput.value;
    const validateInput = this.validateInput(task);

    if (validateInput) {
      this.setState({ error: validateInput });
      return;
    }

    console.log("refs: ", this.refs.createInput.value);
    console.log(this.props.createTask);
    this.setState({ error: null });
    this.props.createTask(task);
    this.refs.createInput.value = ' ';
  }

  validateInput(task) {
    if (!task) {
      return "foo you";
    } else if (_.find(this.props.todos, todo => todo.task === task)) {
      return "duplicate";
    }
  }
}
