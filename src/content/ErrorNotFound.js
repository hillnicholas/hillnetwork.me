import React from 'react';
import ContentManager from './Content';
import ReactMarkdown from 'react-markdown';

class ErrorNotFound extends React.Component {

    constructor( props ) {
        super( props )
        this.state = {
            content : "",
        }
        this.getLocalContent();
    }
    render() {
        return (
            <div className="content-section">
                <img className="coyote-404-img" src="/img/coyote404.png" />
                <ReactMarkdown source={ this.state.content } />
            </div>
        );
    }

    getLocalContent() {
        fetch("/content/404.md")
        .then( 
            success => success ? success : console.log("There was an error getting the content.")
        )
        .then(
            content => content.text()
        )
        .then(
            newContent => this.setState( { content : newContent,
                                         } )
        )
    }
}


export default ErrorNotFound;