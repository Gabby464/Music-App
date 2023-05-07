import { html } from "../middlewares/lib.js";
import { login } from "../services/authService.js";


const loginTemplate = (onSubmit) => html`       
<!--Login-->
<section id="loginPage">
    <form @submit = ${onSubmit}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="#">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`

export const loginView = (ctx) => {
    const  onSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = Object.fromEntries(new FormData(e.currentTarget));
        await login(email, password);
        ctx.page.redirect('/')
    }

    ctx.render(loginTemplate(onSubmit))
}