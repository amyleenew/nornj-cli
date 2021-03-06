import React from 'react';
import Bundle from './Bundle';
import { withRouter, Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { observer, Provider, inject } from 'mobx-react';
import loadPage1 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page1/page1.jsx';
import loadPage2 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page2/page2.jsx';
import loadFormExample from 'bundle-loader?lazy&name=[name]!./src/web/pages/formExample/formExample.jsx';
//{importLoadPage}//
import Header from './src/web/components/header';
import Sider from './src/web/components/sider';

const HeaderWithRouter = withRouter(Header);
const SiderWithRouter = withRouter(Sider);
const loadBundles = {
  loadPage1,
  loadPage2,
  loadFormExample,
  //{loadPage}//
};

/**
 * 页面page1
 */
const Page1 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage1} store={store} isPc loadBundles={loadBundles}>
        {(_Page1) => {
          const Page1 = withRouter(_Page1);
          return <Page1 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page2
 */
const Page2 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage2} store={store} isPc loadBundles={loadBundles}>
        {(_Page2) => {
          const Page2 = withRouter(_Page2);
          return <Page2 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面formExample
 */
const FormExample = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadFormExample} store={store} isPc loadBundles={loadBundles}>
        {(_FormExample) => {
          const FormExample = withRouter(_FormExample);
          return <FormExample />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

//{pageComponent}//

const PageWrap = inject('store')(
  observer(({ store, children }) => (
    <div>
      <SiderWithRouter />
      <HeaderWithRouter />
      <div id="page-wrap" className={store.sider.isOpen ? 'isMenuOpen' : ''}>
        {children}
      </div>
    </div>
  ))
);

const routes = () => (
  <Switch>
    <Route exact path="/" component={Page1} />
    <Route exact path="/Page1" component={Page1} />
    <Route exact path="/Page2" component={Page2} />
    <Route exact path="/FormExample" component={FormExample} />
    {/*//{route}//*/}
    <Redirect from="*" to="/" />
  </Switch>
);

export default routes;