import React from 'react';
import ContentManager from './Content';

class About extends React.Component {
    render() {
        return (
            <div className="content-section">
                <ContentManager content="aboutContent" />
            </div>
        );
    }
}


export default About;