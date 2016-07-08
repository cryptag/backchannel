import React, { Component } from 'react';

class MessageForm extends Component {
  render(){
    return (
      <div className="row message-form">
        <form role="form">
          <div className="col-md-10">

            <textarea name="message"></textarea>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary">Send</button>
          </div>
        </form>
      </div>
    )
  }
}

export default MessageForm;
