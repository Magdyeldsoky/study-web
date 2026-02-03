import React from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import ThemTuggle from "@/components/ui/ThemTuggle";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-background transition-colors">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <ThemTuggle />
      </div>

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-card text-card-foreground shadow-lg p-8">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Login
        </h1>

        {/* Form */}
        <form className="space-y-5">
          {/* Username / Email */}
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
            />
          </Field>

          {/* Password */}
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
            />
          </Field>

          {/* Login Button */}
          <Button className="w-full bg-primary text-primary-foreground hover:opacity-90 text-sm font-medium">
            Login
          </Button>

          {/* Forgot Password */}
          <Button
            type="button"
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground text-sm font-medium"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </Button>

          {/* Register */}
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
