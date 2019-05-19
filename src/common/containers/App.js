import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Components
// import Helmet from 'react-helmet';
// import AppBar from './components/AppBar';

// Import Actions
import { fetchAppData } from '../actions/AppActions';
// import { switchLanguage } from '../../modules/Intl/IntlActions';

let DevTools;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  DevTools = require('../components/DevTools').default;
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({ isMounted: true }); // eslint-disable-line
    dispatch(fetchAppData()).then(() => {
      console.log('fetched app data');
    });
  }

  render() {
    const { isMounted } = this.state;
    const { children } = this.props;
    return (
      <div>
        {isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          {/* <Helmet
            title="Minty"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          /> */}
          {/* <AppBar /> */}
          <div>
            {children}
          </div>
        </div>
      </div>
    );
  }
}


// // Retrieve data from store as props
// function mapStateToProps(store) {
//   return {
//     hello: store.hello
//   };
// }

// export default connect(mapStateToProps)(App);
export default App;
