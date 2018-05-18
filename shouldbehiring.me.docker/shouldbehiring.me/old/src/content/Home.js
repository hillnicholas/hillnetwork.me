import React from 'react';
//import ContentManager from './Content';
import ReactMarkdown from 'react-markdown';



var CONFIG = {};

CONFIG.docsURL = "https://docs.hillnetwork.me/";
CONFIG.githubURL = "https://github.com/hillnicholas/";


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
                <img className="centered" alt="it's me!" src="/img/picofme.jpg"/>
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

        var match = /^http[s]*:\/\/why-([a-zA-Z0-9-]+).shouldbehiring.me/.exec(document.location);
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
                
        // check to make sure we dont have any prank kiddys making me look bad
        fetch("https://www.purgomalum.com/service/containsprofanity?text=" + companyName )
        .then(
            success => success ? success : console.log("There was an error getting the content.")
        )
        .then(
            result => result ? result.text() : "false"
        )
        .then( 
            result => { 
                if (result === "true" ) {
                    this.companyName = "You";
                    window.location = "http://why-you.shouldbehiring.me"; 
                }
                document.title="Why " + companyName + "Should Be Hiring Me";
            }
        ).then( () => {
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
                        //                                 

                        const newContentJSX = (
                            <div className="why-hire-me-container">
                                <ReactMarkdown source={ "------------------" } />
                                <div className="why-hire-me">
                                    <h3> Why { companyName } Should Be Hiring Me: </h3>
                                    <ReactMarkdown source={ newContent } />
                                </div>
                                <div className="split-hire-me">
                                    <input type="button" value="View My Github" onClick={ () => window.open( CONFIG.githubURL, "_blank" ) } />
                                    <input type="button" value="Read My Docs" onClick={ () => window.open( CONFIG.docsURL, "_blank" ) } />
                                </div>
                            </div>
                        );

                        this.setState( { shouldHireContent : newContentJSX }  )
                    }
                );
            }
        );      
    }
}


export default Home;