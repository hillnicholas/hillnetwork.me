import React from 'react';
//import ContentManager from './Content';
import ReactMarkdown from 'react-markdown';


class Portfolio extends React.Component {

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
                <ReactMarkdown source={ this.state.content } />
            </div>
        );
    }

    getLocalContent() {
        fetch("/content/portfolio.md")
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


export default Portfolio;