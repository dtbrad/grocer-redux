import React, { Component }from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

class App extends Component {
  render() {
    return (
      <div>
        <h3 className="text-center">Empty React Application</h3>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
