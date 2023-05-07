import {render, html} from "./lib.js";
import { navigationView } from "../views/navigationView.js";
const header = document.querySelector("#navigation-header");
const content = document.querySelector('#main-content');

export const renderNavigationMiddleware = (ctx, next) => {
  // render navigation
    render(navigationView(ctx), header);
  next();
};

export const renderContentMiddleware = (ctx, next) => {
    ctx.render = (templateResult) => {
        render(templateResult, content)
    } 
    next()
}