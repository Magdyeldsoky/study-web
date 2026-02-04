import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "../components/logo";

const Login = () => {
  const navigate = useNavigate();
  const [inputEmailOrUsername, setInputEmailOrUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUsers = JSON.parse(localStorage.getItem("fake_users")) || [];

    const user = savedUsers.find(
      (u) =>
        u.email === inputEmailOrUsername || u.username === inputEmailOrUsername
    );

    if (!user) {
      setErrorMessage("This account does not exist");
      return;
    }

    if (user.password !== inputPassword) {
      setErrorMessage("Incorrect password");
      return;
    }

    localStorage.setItem("current_user", JSON.stringify(user));

    navigate("/home");
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-background transition-colors">
      <div className="absolute top-50  ">
        <Logo size="40px" />
      </div>
      <div className="w-full max-w-md rounded-2xl bg-card text-card-foreground shadow-lg p-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Login
        </h1>

        <form className="space-y-5" onSubmit={handleLogin}>
          <Field className="relative">
            <FieldLabel
              htmlFor="username"
              className="absolute -top-2 left-4 bg-card px-2 text-xs text-muted-foreground"
            >
              Username or Email
            </FieldLabel>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username or email"
              className="bg-background border-border focus:ring-ring text-sm"
              value={inputEmailOrUsername}
              onChange={(e) => setInputEmailOrUsername(e.target.value)}
            />
          </Field>

          <Field className="relative">
            <FieldLabel
              htmlFor="password"
              className="absolute -top-2 left-4 bg-card px-2 text-xs text-muted-foreground"
            >
              Password
            </FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="bg-background border-border focus:ring-ring text-sm"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </Field>

          {errorMessage && (
            <p className="text-sm text-destructive text-center">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:opacity-90 text-sm font-medium"
          >
            Login
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground text-sm font-medium"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
