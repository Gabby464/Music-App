import { html } from "../middlewares/lib.js";
import { register } from "../services/authService.js";


const registerTemplate = (onSubmit) => html`       
<!--Registration-->
        <section id="registerPage">
            <form @submit =${onSubmit}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section> 
`

export const registerView = (ctx) => {
    const onSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const entries = Object.fromEntries(formData.entries());
      if (Object.values(entries).some((value) => !value)) {
        alert("Please fill out all fields.");
      }else if(entries['conf-pass'] !== entries.password){
        alert("Passwords don't match!");
      }
      else{
        const { email, password } = entries;
        await register(email, password);
        ctx.page.redirect("/");
      }
    };
    ctx.render(registerTemplate(onSubmit));
  };
  