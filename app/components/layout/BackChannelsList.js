import React, { Component } from 'react';

class BackChannelsList extends Component {
  render(){
    let allChannels = [
      {
        name: "Word Green Fund",
        chats: [
          { name: 'Protest Plan', latest: 'John Cruca: Hi guys, I\'ve got the' },
          { name: 'Nick, John, Eric, & Steve', latest: 'Shared: Strategy.pdf' }
        ]
      },
      {
        name: "Steve's Channel",
        chats: [
          { name: 'Steve Jones', latest: 'Hey Steve, send those documents over to me' }
        ]
      }
    ];

    return (
      <div className="channels">
        <div className="create">
          <i className="fa fa-plus-circle"></i>
        </div>
        <h2>All Backchannels</h2>

        <ul>
          {allChannels.map( (channel) => {
            return <li>
              <i className="fa fa-globe"></i>
              <span className="name">{channel.name}</span>

              <ul className="chat">
                {channel.chats.map( (chat) => {
                  return <li>
                    {chat.name}
                  </li>
                })}
              </ul>
            </li>
          })}
        </ul>
      </div>
    );
  }
}

export default BackChannelsList;
