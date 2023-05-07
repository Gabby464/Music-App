import { html } from "../middlewares/lib.js";
import { logOut } from "../services/authService.js";
const guestLinks = () => html` <!--Only guest-->
  <li><a href="/login">Login</a></li>
  <li><a href="/register">Register</a></li>`;

const userLinks = (logOutUser) => html` <!--Only user-->
  <li><a href='/create'>Create Album</a></li>
  <li><a href= javascript:void(0) @click = ${logOutUser}>Logout</a></li>`;

const navigationTemplate = (isAuthenticated, logOutUser) => html`
  <nav>
    <img src="/images/headphones.png" />
    <a href="/">Home is home</a>
    <ul>
      <!--All user-->
      <li><a href="/catalog">Catalog</a></li>
      <li><a href="/search">Search</a></li>
      ${isAuthenticated ? userLinks(logOutUser) : guestLinks()}
    </ul>
  </nav>
`;
export const navigationView = (ctx) => {
  return navigationTemplate(ctx.user, logOutUser);
  
  async function logOutUser() {
    await logOut();
    console.log('success');
    ctx.page.redirect('/');
  }
};

