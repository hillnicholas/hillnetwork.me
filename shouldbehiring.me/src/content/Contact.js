import React from 'react';
import JSEncrypt from 'jsencrypt';

//import ContentManager from './Content';

class Contact extends React.Component {
    
    alreadyEncrypted = false;
    unencryptedHistory = "";
    render() {
        return (
            <div className="content-section">
                
                <p className="contact-msg"> Feel free to contact me at <a href="mailto:nick@hillnetwork.me">nick@hillnetwork.me</a> or by using the form below. </p>
                <form className="contact" action="https://formspree.io/nick@hillnetwork.me" method="POST">
                    <input className="field" type="text" name="name" placeholder="Your name" />
                    <input className="field" type="text" name="email" placeholder="Your email" required/>
                    <textarea className="field" type="text" id="message" name="message" placeholder="Your message" required/>
                    <input className="bottom-button" type="submit" value="submit" />
                    <input className="bottom-button" type="button" id="encrypt-button" value="Encrypt message" onClick={ () => this.copyPubKey() } />
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
                    if( ! this.alreadyEncrypted ) {
                        var encrypt = new JSEncrypt();
                        document.getElementById("message").readOnly = true;
                        document.getElementById("message").style.backgroundColor = "#e8e8e8";
                        var msg = document.getElementById("message").value;
                        this.unencryptedHistory = msg;
                        encrypt.setPublicKey( pubkey );
                        var encrypted = encrypt.encrypt( msg );
                        document.getElementById("message").value = encrypted;
                        this.alreadyEncrypted = true;
                        document.getElementById("encrypt-button").style.backgroundColor = "gray";
                    }
                    else {
                        document.getElementById("message").value = this.unencryptedHistory;
                        document.getElementById("message").readOnly = false;
                        document.getElementById("message").style.backgroundColor = "white";
                        document.getElementById("encrypt-button").style.backgroundColor = "#428bca";
                        this.alreadyEncrypted = false;
                    }
                }
            }
        );
    }
}


export default Contact;