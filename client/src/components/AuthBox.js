import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";



//register is a just prop set to true if we are on the register route. set in layout. That is how all the conditional statements on this page work
const AuthBox = ({ register }) => {
  const { getCurrentUser, user } = useGlobalContext();
  console.log(user, 'user authbox')
  const navigate = useNavigate();
  //setting state from form input
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");
  //when we hit the login or register button this changes to true
  const [loading, setLoading] = React.useState(false);
  //this is our error object
  const [errors, setErrors] = React.useState({});
  

  React.useEffect(() => {
    //if user is true and navigate is not null
    if (user && navigate) {
      navigate("/favorites");
    }
  }, [user, navigate]);


  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let data = {};

    if (register) {
      //data to be sent to server
      data = {
        name,
        email,
        password,
        confirmPassword,
      };
    } else {
      data = {
        email,
        password,
      };
    }

    axios
    //if register is true send to our register route, otherwise send data to login routes
      .post(register ? "/api/auth/register" : "/api/auth/login", data)
      .then(() => {
        //repeats our request from Global context to get our current user and gets our favorites 
        getCurrentUser();
      })
      
      .catch((err) => {
        setLoading(false);
//if the property of response exists on error and data property exists on response
        if (err?.response?.data) {
          //set state
          setErrors(err.response.data);
        }
      });
  };

  return (
    <div className="auth">
      <div className="auth__box">
        <div className="auth__header">
          <h1>{register ? "Register" : "Login"}</h1>
        </div>

        <form onSubmit={onSubmit}>
          {register && (
            <div className="auth__field">
              <label>Name</label>
              <input
                type="text"
                //set name from form input
                value={name}
                //set name from form input
                onChange={(e) => setName(e.target.value)}
              />
{/*display errors */}
              {errors.name && <p className="auth__error">{errors.name}</p>}
            </div>
          )}

          <div className="auth__field">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errors.email && <p className="auth__error">{errors.email}</p>}
          </div>

          <div className="auth__field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errors.password && (
              <p className="auth__error">{errors.password}</p>
            )}
          </div>

          {register && (
            <div className="auth__field">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {errors.confirmPassword && (
                <p className="auth__error">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <div className="auth__footer">
            {Object.keys(errors).length > 0 && (
              <p className="auth__error">
                
                {register ? "You have some validation errors" : errors.error}
              </p>
            )}

            <button className="btn" type="submit" disabled={loading}>
              {register ? "Register" : "Login"}
            </button>
 {/*if register is not true link to register now, else link to login now */}
            {!register ? (
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
