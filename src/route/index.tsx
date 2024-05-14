import React from 'react';
import {ToastComponent, AlertComponent, Spinner} from 'amis';
/**
 * BrowserRouter: history 路由模式
 * HashRouter: hash 路由模式
 */
import {Route, Switch, Redirect, HashRouter as Router} from 'react-router-dom';
import {observer} from 'mobx-react';
// import Preview from './Preview';
// import Editor from './Editor';
import '../renderer/MyRenderer';
const Editor = React.lazy(() => import('./Editor'));

export default observer(function ({}: {}) {
  return (
    <Router>
      <div className="routes-wrapper">
        <ToastComponent key="toast" position={'top-center'} closeButton={true} timeout={1000} />
        <AlertComponent key="alert" />
        <React.Suspense
          fallback={<Spinner overlay className="m-t-lg" size="lg" />}
        >
          <Switch>
            <Route component={Editor} />
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
});
