import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { App } from './containers';
import {
    PageHome,
    PageCatalogue,
    PagePaper,
    PageEditPaper,
    PageUser,
    PageActivate,
} from './pages';

import store from './reducers';

import './app.scss';

const history = syncHistoryWithStore(browserHistory, store);
const router = (
    <Router history={ history }>
        <Route path="/" component={ App }>
            <IndexRoute component={ PageHome }/>
            <Route path="/catalogue" component={ PageCatalogue }/>
            <Route path="/catalogue/:filterType" component={ PageCatalogue }/>
            <Route path="/catalogue/:filterType/:filterParam" component={ PageCatalogue }/>
            <Route path="/paper/:paperId" component={ PagePaper }/>
            <Route path="/user/:uuid" component={ PageUser }/>
            <Route path="/util/activate/:uuid" component={ PageActivate }/>
            <Route path="/admin/add-paper" component={ PageEditPaper }/>
            <Route path="/admin/edit-paper/:paperId" component={ PageEditPaper }/>
        </Route>
    </Router>
);
const initLink = () => {
    const $rootDOM = document.querySelector('#root');

    if ($rootDOM) {
        $rootDOM.addEventListener('click', function(evt) {
            const $targetLink = evt.target.closest('a');
            const href = $targetLink ? $targetLink.getAttribute('href') : '';
            const ignoreReg = /^((http(s)?:)?\/\/|#)/;

            if (!ignoreReg.test(href)) {
                if (href && href !== 'javascript:;') {
                    evt.preventDefault();
                    evt.stopPropagation();

                    history.push(href);

                    return false;
                }
            }
        });
    }
};
const render = () => {
    ReactDOM.render((
        <Provider store={ store }>
            { router }
        </Provider>
    ), document.getElementById('root'));
};
const initDataDOM = () => {
    const $initData = $('#initData');

    if (!$initData.val().trim()) {
        $initData.remove();
    }
};

initDataDOM();
render();
initLink();