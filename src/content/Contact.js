import React from 'react';
import JSEncrypt from 'jsencrypt';

//import ContentManager from './Content';

class Contact extends React.Component {
    render() {
        return (
            <div className="content-section">
                
                <p className="contact-msg"> Feel free to contact me at <a href="mailto:nick@hillnetwork.me">nick@hillnetwork.me</a> or by using the form below. </p>
                <form className="contact" action="https://formspree.io/nick@hillnetwork.me" method="POST">
                    <input className="field" type="text" name="name" placeholder="Your name" />
                    <input className="field" type="text" name="email" placeholder="Your email" />
                    <textarea className="field" type="text" id="message" name="message" placeholder="Your message" />
                    <input className="bottom-button" type="submit" value="submit" />
                    <input className="bottom-button" type="button" value="Encrypt message" onClick={ () => this.copyPubKey() } />
                </form>
            </div>
        );
    }

    copyPubKey() {
        fetch("/content/nick@hillnetwork.me.pem.pub")
        .then( 
            success => success ? success.text() : ""
        )
        .then( 
            pubkey => {

                if( ! pubkey ) {
                    alert("There was an error retrieving the public key.");
                }
                else {
                    console.log("public key:\n" + pubkey );
                    var encrypt = new JSEncrypt();
                    encrypt.setPublicKey( pubkey );
                    var encrypted = encrypt.encrypt( "asdf ");
                    document.getElementById("message").value = encrypted;
                }
            }
        );
    }
}


export default Contact;