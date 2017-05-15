import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Import from './components/ImportComponent';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()
// Render the main component into the dom
ReactDOM.render(<MuiThemeProvider><Import /></MuiThemeProvider>,
document.getElementById('app'));
