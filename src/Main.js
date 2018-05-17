import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './content/Home';
import About from './content/About';
import Contact from './content/Contact';
import Portfolio from './content/Portfolio.js';
import IosTethering from './content/IosTethering.js';
import ErrorNotFound from './content/ErrorNotFound.js';

// defines the routes for the application.
class Routes extends React.Component {
    render() {
        return (
            <div className="routes">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/home" component={Home}/>
                <Route path="/about" component={About} />
                <Route path="/portfolio" component={Portfolio} />
                <Route path="/contact" component={Contact} />
                <Route path="/ios-tethering" component={IosTethering} />
                <Route component={ErrorNotFound} />
            </Switch>
            </div>
        );
    }
}


// The navigation bar components
// patch - blog has been removed
class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <Link to="/"> Home </Link>
                <Link to="/about"> About </Link>
                <Link to="/portfolio"> Portfolio </Link>
                <Link to="/contact"> Contact </Link>
            </div>
        );
    }
}



class Header extends React.Component {
    render() {
        return (
            <div className="header">
            <img src="/img/logo.png" alt="I like this icon a lot" />
                <h1> Nicholas Hill </h1>
                <span>
                    <p> Virtualization <span className="separator" /> Networking <span className="separator" /> Security </p> 
                </span>
            </div>   
        );
    }
}


// the header content
class HeaderBackground extends React.Component {
    render() {
        return (
            <div className="header-background">
            </div>
        );
    }
}
/*
<img className="header-bg" src="/img/logo.png" alt="I like this icon a lot" />
                    <div className="title">
                        <h1> Nicholas Hill </h1>
                        <span>
                            <p> Virtualization <span className="separator" /> Networking <span className="separator" /> Security </p> 
                        </span>
                    </div>*/

/* the main frame. Defines the header, the navbar and the content. */
class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <Header />
                <HeaderBackground />
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