import React from 'react';
import ContentManager from './Content';
import ReactMarkdown from 'react-markdown';

// This isn't currently used. It's here for future development.

class Home extends React.Component {

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

    // initially, retrieve blog stuff
    getInitialPosts() {
        fetch("http://api.hillnetwork.me/blog")
        .then( 
            success => success ? success : console.log("There was an error getting the content.")
        )
        .then(
            content => content.json();
        )
        .then(
            newContent => this.setState( { content : newContent,
                                         } )
        )
    }
}


export default Home;