import React from 'react'
import ReactGA from 'react-ga';

let deferredPrompt;

class Prompt extends React.Component {
    constructor(props, context) { 
        super(props, context);
     
        this.state = {
            appDownload: false
        };


     };

    componentDidMount() {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI notify the user they can add to home screen
            console.log('app download')
            this.setState( {
                appDownload: true
            })
        });
    }
    
    handleClick() {
        console.log('should download')
        deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
            .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                ReactGA.event({
                    category: 'Download',
                    action: 'Downloaded App'
                  });
            } else {
                ReactGA.event({
                    category: 'Failed Download',
                    action: 'Ducked out of download'
                  });
            }
            deferredPrompt = null;
            });
      }

    render() {

        return (
            <div className="Prompt" onClick={this.handleClick}>
                <div>
                    <p className='gravitas'>Download Shitstorm</p>
                    <p>Unbridled weather power. At your fucking fingertips.</p>
                </div>
            </div>
        )
    }
}


export default Prompt
