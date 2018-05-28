import React from 'react';
import ReactMarkdown from 'react-markdown';


/* Component is implemented as a new react component. It's state is managed
   by the parent (Blog) class. 
*/


class ViewPost extends React.Component {

    // This is a little unconventional with 2 return statements.
    render() { 
        if(! this.props.currentPost ) {
            return ( 
                <div className="post-view-section">
                    <p> There was an error retrieving the blog content. </p>
                </div>
            );
        }
        else {
            return (
                <div className="post-view-section"> 
                    <button className="blog-prev-button" 
                            disabled={this.props.currentPost.index >= this.props.posts.length - 1} 
                            onClick={ () => this.props.goBackInTime() }>
                            Previous Post
                            </button>
                    <button className="blog-next-button" 
                            disabled={ this.props.currentPost.index <= 0 } 
                            onClick={ () => this.props.goForwardInTime() }>
                            Next Post
                    </button>
                    <div className="blog-post-content" key={ this.props.currentPost.post_id }>
                        <h2> { this.props.currentPost.title } 
                            <span className="blog-date"> 
                                { new Date(this.props.currentPost.datetime * 1000 ).toDateString() }
                            </span>
                        </h2> 
                        <ReactMarkdown source={ this.props.currentPost.content  } escapeHtml={false}/>  
                    </div>       
                </div>
            );
        }
    }
}

class Blog extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
                posts : [],
                currentPost : null,
            };
        this.offset = 5;
        this.getInitialPosts();
    }
    render() {
        return (
            <div className="content-section">
            
                <div className="blog-container">

                    <ViewPost   currentPost={ this.state.currentPost } 
                                posts={ this.state.posts }
                                goBackInTime={ () => this.goBackInTime() }
                                goForwardInTime={ () => this.goForwardInTime() }
                    />

                    <div className="post-explorer-section">
                        { this.state.posts.map(
                            post => 
                                    <button className="fake-blog-link" 
                                            onClick={ () => this.setState( { currentPost : post } ) }
                                            key={ post.post_id }
                                    >
                                    { this.getPostSideTitle( post )   }
                                    <span className="post-explorer-section-date">
                                    { this.getPostSideDate( post ) }
                                    </span>           
                                    </button>
                        )
                        }
                        <div id="no-more-posts"> There are no more posts. </div>
                        <button className="fake-blog-link"
                                onClick={ () => this.requestMoreExplorer() }
                        >
                        Retrieve older posts...
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // used to be goNext, but that got confusing.
    goBackInTime() {
        console.log( this.state.currentPost.index );
        if( this.state.currentPost.index >= this.state.posts.length - 2 ) {
            this.requestMoreExplorer();
            console.log("retrieving more");
        }
        this.setState( { currentPost : this.state.posts[ this.state.currentPost.index + 1 ] });
    }

    // used to be goPrev, but that got confusing.
    goForwardInTime() {
        this.setState( { currentPost : this.state.posts[ this.state.currentPost.index - 1 ] });
    }

    requestMoreExplorer = () => {
        fetch("https://api.hillnetwork.me/blog?limit=5&offset=" + this.offset.toString() )
        .then( 
            success => success ? success : console.log("There was an error getting the content.")
        )
        .then(
            posts => posts.json()
        )
        .then(
            (fetchedPosts) => { 
                let index = this.state.posts.length;
                let fpindex = 0;
                for(; index < this.state.posts.length + fetchedPosts.length; index ++ ) {
                    console.log(fpindex);
                    console.log( index );
                    fetchedPosts[fpindex].index = index;
                    fpindex ++;
                }
                
                if( fetchedPosts.length > 0 ) {             
                    this.setState( { 
                        posts : this.state.posts.concat( fetchedPosts )
                    } )
                    this.offset += fetchedPosts.length;
                }
                else {
                    document.getElementById("no-more-posts").style.display = "block";
                }
            }
        )
    }
    getPostSideTitle = ( post ) => {
        let title = (post.title.length > 20) ?
        post.title.substr(0,20) + "..." :
        post.title;
        return title;
    }

    getPostSideDate = ( post ) => {
        let d = new Date( post.datetime * 1000 );
        return d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
    }

    // initially, retrieve blog stuff
    getInitialPosts() {

        fetch("https://api.hillnetwork.me/blog")
        .then( 
            success => success ? success : console.log("There was an error fulfilling this promise.")
        )
        .then(
            posts => posts.json()
        )
        .then(
            fetchedPosts => {
                                // attach an index to each post
                                let index = 0;
                                console.log( fetchedPosts );
                                for(; index < fetchedPosts.length; index ++ ) {
                                    fetchedPosts[index].index = index;
                                }
                                // assign to state
                                this.setState( 
                                            { 
                                                posts : fetchedPosts,
                                                currentPost : fetchedPosts[0]
                                            });
                            }
        )
    }       
}              




export default Blog;
