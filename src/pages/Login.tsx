import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const submitForm = async (event) => {
    console.log("ça part");
    event?.preventDefault();

    const reqBody = JSON.stringify({
      email: event.target.elements.username.value,
      password: event.target.elements.password.value,
    });

    // console.log(reqBody);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_PATH}/user/login`,
      {
        method: "POST",
        body: reqBody,
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    if (res.ok) {
      navigate("/profile");
    }
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
