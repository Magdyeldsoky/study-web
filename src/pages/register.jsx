import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/data/fakeAuth";
import Logo from "../components/logo";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !firstName ||
      !lastName ||
      !usernameOrEmail ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const isEmail = usernameOrEmail.includes("@");

    const result = registerUser({
      firstName,
      lastName,
      username: isEmail ? usernameOrEmail.split("@")[0] : usernameOrEmail,
      email: isEmail ? usernameOrEmail : `${usernameOrEmail}@fake.com`,
      password,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/login");
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-background transition-colors">
      <div className="absolute top-50  ">
        <Logo size="40px" />
      </div>
      <div className="w-full max-w-md rounded-2xl bg-card text-card-foreground shadow-lg p-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Sign Up
        </h1>

        <p className="text-sm text-muted-foreground mb-5 text-center">
          Create your account by filling the information below.
        </p>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field className="relative">
              <FieldLabel className="absolute -top-2 left-4 bg-card px-2 text-xs text-muted-foreground">
                First Name
              </FieldLabel>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="bg-background border-border text-sm"
              />
            </Field>

            <Field className="relative">
              <FieldLabel className="absolute -top-2 left-4 bg-card px-2 text-xs text-muted-foreground">
                Last Name
              </FieldLabel>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="bg-background border-border text-sm"
              />
            </Field>
          </div>

          <Field className="relative">
            <FieldLabel className="absolute -top-2 left-4 bg-card px-2 text-xs text-muted-foreground">
              Username or Email
            </FieldLabel>
            <Input
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="Username or email"
              className="bg-background border-border text-sm"
            />
          </Field>

          <Field className="relative">
            <FieldLabel className="absolute -top-2 left-4 bg-card px-2 text-xs text-muted-foreground">
              Password
            </FieldLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-background border-border text-sm"
            />
          </Field>

          <Field className="relative">
            <FieldLabel className="absolute -top-2 left-4 bg-card px-2 text-xs text-muted-foreground">
              Confirm Password
            </FieldLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="bg-background border-border text-sm"
            />
          </Field>

          <Button className="w-full bg-primary text-primary-foreground hover:opacity-90 text-sm font-medium">
            Sign Up
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
