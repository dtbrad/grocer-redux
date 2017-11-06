import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => (
  <div>

    <div className="jumbotron" style={{ backgroundColor: 'rgb(3,34,81)', color: '#f2f4f7' }}>
      <p>
        Grocer-React-Client is a React translation of <a target="blank" href="https://www.my-grocer.com">Grocer</a>, a full stack rails app.
        For full functionality, including the ability to import and view your own shopping history,
        visit that app at <a target="blank" href="https://www.my-grocer.com">www.my-grocer.com</a>.
        Grocer-React-Client currently has basket index and show views, along with JWT authentication.
        There are three demo accounts you can choose from - login info is at the top of the screen.
        Visit its GitHub repository at
        <a target="blank" href="https://github.com/dtbrad/grocer-react-client"> https://github.com/dtbrad/grocer-react-client</a>.
      </p>
    </div>

    <Link className="btn btn-default btn-lg btn-block" href="/login" to="/login">Log In (credentials at top of screen)</Link>

  </div>
);
export default Welcome;
