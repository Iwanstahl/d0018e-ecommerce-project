import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const { login } = useContext(ShopContext);
  const navigate = useNavigate();

  // State to keep track if its Login or Sign Up
  const [currentState, setCurrentState] = useState("Login");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be atleast 6 chars");
      return;
    }
    setLoading(true);

    try {
      if (currentState === "Sign Up") {
        await authService.register(username, email, password);
        setSuccessMessage("Account created successfully!");
        setCurrentState("Login");
      } else {
        // Logic for login
        const data = await authService.login(email, password);
        localStorage.setItem("token", data.access_token);
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-(--main-text-color)"
    >
      {/* HEADER */}
      <div className="inline-flex items-center gap-2 mb-10 mt-10">
        <hr className="border-none h-[1.5px] w-8 bg-(--main-text-color)" />
        <p className="text-3xl uppercase font-semibold tracking-tighter">
          {currentState}
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-(--main-text-color)" />
      </div>

      {/* INPUT FIELD */}
      {/* Only show Name input when creating account */}
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 border border-(--main-text-color) bg-transparent outline-none placeholder:uppercase placeholder:text-xs placeholder:tracking-widest"
          placeholder="Name"
          required
        />
      )}

      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 border border-(--main-text-color) bg-transparent outline-none placeholder:uppercase placeholder:text-xs placeholder:tracking-widest"
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 border border-(--main-text-color) bg-transparent outline-none placeholder:uppercase placeholder:text-xs placeholder:tracking-widest"
        placeholder="Password"
        required
      />

      {/* HELP TEXT */}
      <div className="w-full flex justify-between text-xs -mt-2 uppercase tracking-tighter opacity-70">
        <p className="cursor-pointer hover:text-(--hover-color)">
          Forgot password?
        </p>

        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer hover:text-(--hover-color) font-bold"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer hover:text-(--hover-color) font-bold "
          >
            Login
          </p>
        )}
      </div>

      {/* ERROR MESSAGE */}
      {errorMessage && (
        <p className="text-red-500 text-sm uppercase tracking-widest text-center">
          {errorMessage}
        </p>
      )}

      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <p className="text-green-500 text-sm uppercase tracking-widest text-center">
          {successMessage}
        </p>
      )}

      {/* SIGN IN BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className={`bg-(--main-text-color) text-(--second-text-color) font-bold uppercase px-10 py-3 mt-4 w-full transition-all active:scale-[0.98]
        ${loading ? "opacity-50 cursor-not-allowed" : "hover:text-(--hover-color)"}`}
      >
        {loading
          ? "Please wait..."
          : currentState === "Login"
            ? "Sign In"
            : "Create Account"}
      </button>
    </form>
  );
};

export default Login;
