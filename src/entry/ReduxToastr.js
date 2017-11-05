import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';

import 'react-redux-toastr/src/styles/index.scss';

export default class Toastr extends Component {
  render() {
    return (
      <ReduxToastr
        timeOut={2000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    )
  }
}
