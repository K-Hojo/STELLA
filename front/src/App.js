import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import Search from './search';
import ClassComponent from "./sample";

function App() {
  return (
    <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Stella</a>
            <div className="collapse navbar-collapse" id="navbarSupportContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><p>page1</p></li>
                <li className="nav-item"><p>page2</p></li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">Sign Up</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Log In</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      <main>
        <div className="main-container">
           <ClassComponent />
           <Search />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
