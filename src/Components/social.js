import React from 'react'
import ReactGA from 'react-ga';

class Social extends React.Component {

    shareReddit = () => {
        ReactGA.event({
            category: 'Share',
            action: 'Reddit'
          });
    }

    shareFacebook = () => {
        ReactGA.event({
            category: 'Share',
            action: 'Facebook'
          });
    }

    shareTwitter = () => {
        ReactGA.event({
            category: 'Share',
            action: 'Twitter'
          });
    }

    render() {

        return (
            <div className="social">
                <a href="https://www.reddit.com/submit?url=https://shitstorm.app&title=Shitstorm:%20a%20rude%20weather%20app" target="_blank" rel="noopener" onClick={this.shareReddit}>
                    <img src={require('../img/reddit.svg')} alt="Post to Reddit"/>
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//shitstorm.app" target="_blank" rel="noopener" onClick={this.shareFacebook}>
                    <img src={require('../img/facebook.svg')} alt="Post to Facebook"/>
                </a>
                <a href="https://twitter.com/home?status=Shitstorm%20is%20a%20rude%20weather%20app%20that%20lets%20you%20know%20what%20the%20fuck%20is%20going%20on%20out%20there%20-%20https%3A//shitstorm.app" target="_blank" rel="noopener" onClick={this.shareTwitter}>
                    <img src={require('../img/twitter.svg')} alt="Post to Twitter"/>
                </a>
            </div>
        )
    }
}

export default Social