import React from 'react';
import ContentManager from './Content';

class Contact extends React.Component {
    render() {
        return (
            <div className="content-section">
            <p> Feel free to contact me at <a href="mailto:nick@hillnetwork.me">nick@hillnetwork.me</a> or by using the form below. </p>
                <form>
                    <input className="field" type="text" name="name" placeholder="Your name" />
                    <input className="field" type="text" name="email" placeholder="Your email" />
                    <textarea className="field" type="text" name="name" placeholder="Your message" />
                    <input className="bottom-button" type="button" value="submit" onClick={ () => alert("test") } />
                    <input className="bottom-button" type="button" value="Copy GPG key" onClick={ () => alert("test") } />
                </form>
            </div>
        );
    }
}


export default Contact;