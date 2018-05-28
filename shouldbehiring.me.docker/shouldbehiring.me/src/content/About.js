import React from 'react';
//import ContentManager from './Content';
import ReactMarkdown from 'react-markdown';


class About extends React.Component {

    constructor( props ) {
        super( props )
        this.state = {
            content : "",
        }
        this.getLocalContent();
    }
    render() {
        // I like to live dangerously dangerouslySetInnerHTML="true"
        return (
            <div className="content-section">
                <ReactMarkdown source={ this.state.content } escapeHtml={false} />
            </div>
        );
    }

    getLocalContent() {
        fetch("/content/about.md")
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


export default About;