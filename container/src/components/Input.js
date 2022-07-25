import React from "react";

export default class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    value: null,
    dirty: false,
  };

  componentDidMount() {
    this.input.addEventListener("ionChange", (ev) =>
      this.setState({ ...this.state, value: ev.detail.value },
        () => this.props.inputChanged(this.state))
    );
    this.input.addEventListener("ionBlur", () =>
      this.setState({ ...this.state, dirty: true },
        () => this.props.inputChanged(this.state))
    );
  }

  render() {
    return (
      <div>
        <ion-item data-error={!this.state.value && this.state.dirty}>
          <ion-label position="floating">
            {this.props.label} <sup>*</sup>
          </ion-label>
          <ion-input
            ref={input => this.input = input}
            type={this.props.type}
            value={this.state.value}
          ></ion-input>
        </ion-item>
        <div className="error-msg">Account number is required</div>
      </div>
    );
  }
}
