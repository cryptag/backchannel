import React, { Component } from 'react';

class BackChannelsList extends Component {
  render(){
    let allChannels = [
      {
        key: 'channel1',
        name: "Word Green Fund",
        chats: [
          { key: 'chan1-chat1', name: 'Protest Plan', latest: 'John Cruca: Hi guys, I\'ve got the' },
          { key: 'chan1-chat2', name: 'Nick, John, Eric, & Steve', latest: 'Shared: Strategy.pdf' }
        ]
      },
      {
        key: 'channel2',
        name: "Steve's Channel",
        chats: [
          { key: 'chan2-chat1', name: 'Steve Jones', latest: 'Hey Steve, send those documents over to me' }
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
            return <li key={channel.key}>
              <i className="fa fa-globe"></i>
              <span className="name">{channel.name}</span>

              <ul className="chat">
                {channel.chats.map( (chat) => {
                  return <li key={chat.key}>
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
