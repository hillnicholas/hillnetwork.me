import React from 'react';
import ContentManager from './Content';

class Contact extends React.Component {
    render() {
        return (
            <div className="content-section">
                
                <p className="contact-msg"> Feel free to contact me at <a href="mailto:nick@hillnetwork.me">nick@hillnetwork.me</a> or by using the form below. </p>
                <form className="contact" action="https://formspree.io/nick@hillnetwork.me" method="POST">
                    <input className="field" type="text" name="name" placeholder="Your name" />
                    <input className="field" type="text" name="email" placeholder="Your email" />
                    <textarea className="field" type="text" name="name" placeholder="Your message" />
                    <input className="bottom-button" type="submit" value="submit" />
                    <input className="bottom-button" type="button" value="Copy Public key" onClick={ () => this.copyPubKey() } />
                </form>
            </div>
        );
    }

    copyPubKey() {
        alert( "copying public key ");
    }
}


export default Contact;