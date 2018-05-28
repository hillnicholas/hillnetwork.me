import React from 'react';
import ReactMarkdown from 'react-markdown';



class ContentManager extends React.Component {
    constructor( props ) {
        super( props );
        this.state = { 
            home : "",
            aboutContent : "",
            blogContent : "",
            portfolioContent : "",
            contactContent : "",
        }

        this.getContent();
    }

    render() {
        console.log( this.state );
    return ( <ReactMarkdown source={ this.state[ this.props.content ] } /> );
    }

    getContent() {
        var page = "home"
        //["home", "about", "portfolio"].forEach( page =>
            fetch("/content/" + page )
            .then( 
                success => success ? success : console.log("There was an error getting the content.")
            )
            .then(
                content => content.text()
            )
            .then(
                function(newContent ) {
                    var tmp = {};
                    tmp[ page ] = newContent;
                    console.log( this.state );
                    this.setState( tmp );
                }
            )
        //)
    }
    /*
    getRemoteContent() {
        fetch("http://192.168.2.28:4000/rest/content")
        .then( result => result.status === 200 ? result.json() : null )
        .then(
            result => {
                if (result !== null) {
                        this.setState( { 
                            homeContent : result.homeContent,
                            aboutContent : result.aboutContent,
                            blogContent : result.blogContent,
                            portfolioContent : result.portfolioContent,
                            contactContent : result.contactContent,
                        }
                    );
                } else {
                    console.log("There was an error getting the content for \"home\".") 
                }
            }
        );
    }*/

}

/*class Home extends React.Component {

    constructor( props ){
        super(props);
    }

    render() {
        return ( 
            <p> {this.props.content } </p>
        );
    }
}*/
//export default { ContentManager };
export default ContentManager;
