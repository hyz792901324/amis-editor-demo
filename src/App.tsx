import React from 'react';
import {Provider} from 'mobx-react';
import RootRoute from './route/index';

export default function (): JSX.Element {
  return (
    <Provider >
      <RootRoute/>
    </Provider>
  );
}
