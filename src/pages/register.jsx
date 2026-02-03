import React from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-background transition-colors">
      <div className="w-full max-w-md rounded-2xl bg-card text-card-foreground shadow-lg p-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Sign Up
        </h1>

        <p className="text-sm text-muted-foreground mb-5 text-center">
          Create your account by filling the information below.
        </p>

        <form className="space-y-5">
          <Field className="relative">
            <FieldLabel
              htmlFor="input-field-username"
              className="absolute -top-2 left-4 bg-card px-2 text-xs text-muted-foreground"
            >
              Username or Email
            </FieldLabel>
            <Input
              id="input-field-username"
              type="text"
              placeholder="Enter your username or email"
              className="bg-background border-border focus:ring-ring text-sm"
            />
          </Field>

          <Field className="relative">
            <FieldLabel
              htmlFor="input-field-password"
              className="absolute -top-2 left-4 bg-card px-2 text-xs text-muted-foreground"
            >
              Password
            </FieldLabel>
            <Input
              id="input-field-password"
              type="password"
              placeholder="Enter your password"
              className="bg-background border-border focus:ring-ring text-sm"
            />
          </Field>

          <Field className="relative">
            <FieldLabel
              htmlFor="input-field-confirm-password"
              className="absolute -top-2 left-4 bg-card px-2 text-xs text-muted-foreground"
            >
              Confirm Password
            </FieldLabel>
            <Input
              id="input-field-confirm-password"
              type="password"
              placeholder="Confirm your password"
              className="bg-background border-border focus:ring-ring text-sm"
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
