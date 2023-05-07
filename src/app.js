import {page} from './middlewares/lib.js';
import { renderContentMiddleware, renderNavigationMiddleware } from './middlewares/renderMiddleware.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import * as api from './services/requester.js'
import { authMiddleware } from './middlewares/authMiddleware.js';
import { registerView } from './views/registerView.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { searchView } from './views/searchView.js';
page(authMiddleware)
page(renderNavigationMiddleware);
page(renderContentMiddleware);
page('/', homeView);
page('/login', loginView);
page('/search', searchView);
page('/register', registerView);
page('/catalog', catalogView);
page('/create', createView);
page('/albums/:id', detailsView);
page('/details/:id/edit', editView)
page.start()

window.api = api