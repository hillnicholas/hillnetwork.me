import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './content/Home';
import About from './content/About';
import Contact from './content/Contact';
import Portfolio from './content/Portfolio.js';

// debugging
const Blog = () => ( <h3> blog content </h3> );


// defines the routes for the application.
class Routes extends React.Component {
    render() {
        return (
            <div className="routes">
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/contact" component={Contact} />
            <Route path="/blog" component={Blog} />
            </div>
        );
    }
}


// The navigation bar components
class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <Link to="/"> Home </Link>
                <Link to="/about"> About </Link>
                <Link to="/portfolio"> Portfolio </Link>
                <Link to="/contact"> Contact </Link>
                <Link to="/blog"> Blog </Link>
            </div>
        );
    }
}

// the header content
class Header extends React.Component {
    render() {
        return (
            <div className="header-wrapper">
                <div className="header">
                    <img className="header-bg" src="/img/logo.png" alt="I like this icon a lot" />
                    <div className="title">
                        <h1> Nicholas Hill </h1>
                        <span>
                            <p> Virtualization <span className="separator" /> Networking <span className="separator" /> Security </p> 
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}


/* the main frame. Defines the header, the navbar and the content. */
class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <Header />
                <NavBar />
                <Routes />
            </div>
        );
    }
}



class MainWrapper extends React.Component {
    render() {
      return (
        <div className="main-wrapper">
            <BrowserRouter>
                <Main/>
            </BrowserRouter>
        </div>
      );
    }
  }




  export default MainWrapper;