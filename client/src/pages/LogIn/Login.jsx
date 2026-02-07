import React, { useState } from "react";
import styles from '../../styles/AdminPanelCss/Login.module.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const toggleForm = () => {
    setFormData({ email: "", password: "", confirmPassword: "" });
    setErrors({});
    setMessage("");
    setIsLogin(!isLogin);
  };

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Determine which endpoint to hit
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          setMessage("✅ Login successful!");
          localStorage.setItem("isLoggedIn", "true");
          navigate("/admin");
        } else {
          setMessage("✅ Account created! You can now login.");
          setIsLogin(true); // Automatically switch to login mode
          setFormData({ email: "", password: "", confirmPassword: "" });
        }
      } else {
        setMessage(`❌ ${data.message || "Action failed"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server is not responding. Check your backend!");
    }
  };

  return (

    <div className={styles.login}>
      <div className={styles.outerform}>
        <h2 className={styles.line}>{isLogin ? "Welcome Back" : "Create Account"}</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            className={styles.inputField}
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <br />

          {/* Password */}
          <label htmlFor="password">Password</label>
          <input

            className={styles.password}

            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <br />

          {/* Confirm Password (Signup only) */}
          {!isLogin && (
            <>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input

                className={styles.password}

                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (

               <div>
                 <p className={styles.error}>{errors.confirmPassword}</p>
               </div>

              )}
          
            </>
          )}

          {/* Forgot Password (Login only) */}
          {isLogin && (

            <div className={styles.fgp}>

              <a href="#">Forgot Password</a>
            </div>
          )}


          <button className={styles.btn} type="submit">

            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {/* API response message */}

        {message && <p className={styles.msg}>{message}</p>}


        <p>
          {isLogin ? "Don't have an account?" : "Already have an account"}{" "}
          <a href="#" onClick={toggleForm}>
            {isLogin ? "Signup" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
