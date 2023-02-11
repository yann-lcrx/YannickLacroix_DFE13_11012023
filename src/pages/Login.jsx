import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth";

function Login() {
  const dispatch = useDispatch();

  const authError = useSelector((state) => state.auth.error);

  const submitForm = (event) => {
    event.preventDefault();

    dispatch(
      login(
        event.target.elements.username.value,
        event.target.elements.password.value
      )
    );
  };

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={submitForm}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            {authError && <p className="error-text">{authError}</p>}
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Login;
