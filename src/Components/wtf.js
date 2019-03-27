import React from 'react'

class WTF extends React.Component {

    constructor(props, context) { 
        super(props, context);
     
        this.state = {
           WTF: false
        };

        this.handleClick = this.handleClick.bind(this);

     };

     handleClick() {
        this.setState(prevState => ({
            WTF: !prevState.WTF
        }));
      }

    render() {
        return !this.state.WTF
        ?    <div className="WTF" onClick={this.handleClick}>
                WTF?
            </div>
        :   <div className="WTFexpanded">

                <div className="close" onClick={this.handleClick}>X</div>
                <div className="WTFwords">
                    <h1>What the fuck is all this?</h1>

                    <h2>Why did you bring this upon the world?</h2>
                    <p>Short answer: because I can. Longer answer: because I'm a <a href="https://thisiswilf.com">designer and developer</a> who took five years out to found <a href="https://ubrew.cc/">Ubrew</a>, an open brewery where anyone can brew their own beer. When I came back to design and development all the cool kids were talking about a new code library called <a href="https://reactjs.org/">ReactJS</a>, which was here to kill jQuery. Being someone who used a lot of jQuery, this was concerning. I resolved to learn ReactJS, and make a shitting sweary weather app at the same fucking time. Bon Appetit, motherfucker.</p>
                    <h2>Is this the very best weather app you can make?</h2>
                    <p>No. It's the very best weather app I wanted to make in the time I had with the tools I had. I didn't want to spend more than a few days on this, and I didn't want to spend any real money on it.</p>
                    <h2>Hey! This delightful weather app doesn't work in my country!</h2>
                    <p>Yeah. Originally the vision was to make this thing international, and the code actually accomodates that happening later if needs be. But right now that's beyond the scope of what I can commit to, due to timezone issues and locality issues. Both could be solved with cash, so if this app ever ends up being monetised, I'll probably make it international.</p>
                    <h2>Timezone issues?</h2>
                    <p><a href="https://www.youtube.com/watch?time_continue=1&v=-5wpm-gesOY">Watch this video</a>, and see what timezone issues can do to an otherwise sane and pleasant individual.</p>
                    <h2>Locality issues?</h2>
                    <p>I don't want to drown you in nerd talk, but the system saves money by looking at what you search for, checking it against a list of towns you're allowed to search for, and then only calling the weather station if what you're searching for is going to come up with something that makes sense. I've put together a list of every town in the UK and Republic of Ireland, which means you can only search for towns in the UK or Republic of Ireland.</p>
                    <h2>But I live in Little Piddlinghoe on Muckmire, and I can't check the weather.</h2>
                    <p>That's because Little Piddlinghoe on Muckmire is a tiny hamlet lurking near an unmapped village, which is itself a day's panicked run from the nearest town. Search for the closest town instead.</p>
                    <h2>It says it's raining outside, but I assure you it's not.</h2>
                    <p>Shitstorm gets all its info from <a href="https://openweathermap.org/">openweathermap.org</a>. Type your town into their engine and you should see the same result as you do on Shitstorm, just without all the swearing. If their info is wrong, they have a button that says "Wrong data?". Click that button and tell them all about it.</p>
                    <h2>It said the weather where I live is going to be grim five days in a row.</h2>
                    <p>Please address complaints surrounding the quality of your weather to your local borough authority.</p>
                    <h2>Can you make something for me?</h2>
                    <p>I'd love to. Head over to <a href="https://thisiswilf.com">thisiswilf.com</a> or just email me at wilf@wilfhorsfall.com.</p>
                </div>
            </div>
    }
}


export default WTF
