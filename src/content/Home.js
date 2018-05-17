import React from 'react';
import ContentManager from './Content';
import ReactMarkdown from 'react-markdown';


class Home extends React.Component {

    constructor( props ) {
        super( props )
        this.state = {
            content : "",
            shouldHireContent : ""
        }
        this.getLocalContent();
        this.getShouldHire();
    }
    render() {
        return (
            <div className="content-section">
                <img className="centered" src="/img/picofme.jpg"/>
                <ReactMarkdown source={ this.state.content } />
                { this.state.shouldHireContent }
            </div>
        );
    }

    getLocalContent() {
        fetch("/content/home.md")
        .then( 
            success => success ? success : console.log("There was an error getting the content.")
        )
        .then(
            content => content.text()
        )
        .then(
            newContent => this.setState( { content : newContent }  )
        )
    }

    getShouldHire() {

        var match = /^http[s]*:\/\/why.([a-zA-Z0-9-]+).shouldbehiring.me/.exec(document.location);
        console.log(match);
        // don't return anything if not under this domain
        if( ! match ) {
            console.log("debug: bad location");
            return "";
        }
        
        // Split by dash and capitalize the first letter of each word.
        var companyName = match[1].split("-").map( 
                word => 
                    word.charAt(0).toUpperCase() + word.substring(
                        Math.min(word.length,1), word.length ) 
                    ).join(" ");
        
        console.log( companyName );

        // check to make sure we dont have any prank kiddys making me look bad
        fetch("https://www.purgomalum.com/service/containsprofanity?text=" + companyName )
        .then(
            success => success ? success : console.log("There was an error getting the content.")
        )
        .then(
            result => result.text()
        )
        .then( 
            result => result == "true" ? window.location = "http://why.you.shouldbehiring.me" : null
        )

        // add the "hire me material"
        fetch("/content/should-hire.md")
        .then( 
            success => success ? success : console.log("There was an error getting the content.")
        )
        .then(
            content => content.text()
        )
        .then(
            newContent => {
                
                const newContentJSX = (
                    <div className="why-hire-me">
                        <ReactMarkdown source={ "------------------" } />
                        <h3> Why { companyName } Should Be Hiring Me: </h3>
                        <ReactMarkdown source={ newContent } />
                    </div>
                );

                this.setState( { shouldHireContent : newContentJSX }  )
            }
        )

        
    }
}


export default Home;