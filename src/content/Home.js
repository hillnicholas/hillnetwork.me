import React from 'react';
import ContentManager from './Content';

class Home extends React.Component {
    render() {
        return (
            <div className="content-section">
                <ContentManager content="homeContent" />
            </div>
        );
    }
}


export default Home;