import React from 'react'


class IosPrompt extends React.Component {
    constructor(props, context) { 
        super(props, context);
     
        this.state = {
            showInstallMessage: false
        };
        this.handleClick = this.handleClick.bind(this);


     };

    //  handleClick() {
    //     this.setState ({
    //         showInstallMessage: false
    //     })        
    //   }

    componentDidMount() {
        const isIos = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad|ipod/.test( userAgent );
          }
          // Detects if device is in standalone mode
          const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
          
          // Checks if should display install popup notification:
          if (isIos() && !isInStandaloneMode()) {
            this.setState({ showInstallMessage: true });
          }
    }

    handleClick() {
        this.setState({ showInstallMessage: false });
      }
    
    render() {
        if (this.state.showInstallMessage) {
            return (
                <React.Fragment>
                <div className="iosPrompt">
                    <div>
                        <div className='close' onClick={this.handleClick}>X</div>
                        <p className='gravitas'>Download Shitstorm</p>
                        <p className="center">Tap <img src={require('../img/iosShare.png')} /> and then 'Add to Homescreen'.</p>
                        <img src={require('../img/downarrow.svg')} className='downArrow' />
                    </div>
                </div>
                <div className='iosBuffer'></div>
                </React.Fragment>
            )
        }
        else {
            return null;
        }
    }
}


export default IosPrompt
