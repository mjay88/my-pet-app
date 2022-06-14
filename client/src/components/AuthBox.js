import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormState } from "react-hook-form";

const AuthBox = ({ registration }) => {
  //setting state from form input
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");
  //form stuff
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log("RESULT", data);
    setEmail(data.Email);
    setPassword(data.password);
    setConfirmPassword(data.password);
    setName(data.name);
  };

  return (
    <div className="auth">
      <div className="auth__box">
        <div className="auth__header">
          <h1>{registration ? "Register" : "Login"}</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/**if registration is true... */}
          {registration && (
            <div className="auth__field">
              <label className="authbox__label">Name</label>
              <input
                className="authbox__input"
                type="text"
                {...register("name", {
                  required: "Please enter your user name",
                  maxLength: 80,
                })}
              />
              {errors.name && (
                <p style={{ color: "white" }}>{errors.password.name}</p>
              )}
            </div>
          )}

          <div className="auth__field">
            <label className="authbox__label">Email</label>
            <input
              className="authbox__input"
              type="text"
              {...register("Email", {
                required: "Please enter a valid email",
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.Email && (
              <p style={{ color: "white" }}>{errors.Email.message}</p>
            )}
          </div>

          <div className="auth__field">
            <label className="authbox__label">Password: </label>
            <input
              className="authbox__input"
              type="password"
              {...register("password", { required: "Password is required!" })}
            />
            {errors.password && (
              <p style={{ color: "black" }}>{errors.password.message}</p>
            )}
          </div>

          {registration && (
            <div className="auth__field">
              <label className="authbox__label">Confirm Password: </label>
              <input
                className="authbox__input"
                type="password"
                {...register("passwordConfirmation", {
                  required: "Please confirm password!",
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password } = getValues();
                      return password === value || "Passwords should match!";
                    },
                  },
                })}
              />
              {errors.passwordConfirmation && (
                <p style={{ color: "black" }}>
                  {errors.passwordConfirmation.message}
                </p>
              )}
            </div>
          )}

          <div className="auth__footer">
            <button className="btn" type="submit">
              {registration ? "Login" : "Register"}
            </button>
            {/*if register is not true link to register now, else link to login now */}
            {!registration ? (
              <div className="auth__register">
                <p>
                  Not a member? <Link to="/register">Register now</Link>
                </p>
              </div>
            ) : (
              <div className="auth__register">
                <p>
                  Already a member? <Link to="/login">Login now</Link>
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthBox;
