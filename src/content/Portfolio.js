import React from 'react';
import ContentManager from './Content'
class Portfolio extends React.Component {
    render() {
        return (
            <div className="content-section">
                
                <h3> Project Documentation Page </h3>
                An in-depth description of my work projects, personal projects, and overall experience can be found <a href="https://cloudproject.hillnetwork.me"> here</a>.
                <h3> Github </h3>
                You can find some of the scripts I've made on my github <a href="https://github.com/hillnicholas/">here</a>. Most of what I've been doing the last year has been 
                learning systems administration, so it's a little dry. My goal for this summer is to get involved in some open source projects, particularly Openstack. As I begin contributing 
                more open source code, I'll begin to add it to this page.
                <h3> About This Site </h3>
                As you could probably tell by now, I'm not the best graphics/web designer. I can build the system to interact with the server and deploy it effieciently. This 
                simple website actually has a pretty scalable framework that would allow easy expansion. I've also automated the build process and created it with a modular design.
                The backend can be powered by a traditional PHP/MySQL stack or a Python/couchDB stack. The python/couchDB backend has been "dockerized" as well, allowing for CI engines
                like Jenkins can automatically build and test any code that I push up.  
              
            </div>      
        );
    }

}


export default Portfolio;