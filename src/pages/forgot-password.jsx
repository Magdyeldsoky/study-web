import { Field, FieldLabel } from "@/components/ui/field";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "../components/logo";
import React from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-screen items-center justify-center bg-background transition-colors"><div className="absolute top-8 sm:top-12 left-1/2 transform -translate-x-1/2">
        <Logo size="40px" />
    </div>
      <div className="w-full max-w-md rounded-2xl bg-card text-card-foreground shadow-lg p-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Forgot Password
        </h1>

        <p className="text-sm text-muted-foreground mb-5 text-center">
          Enter your email or username and we will send you a confirmation link.
        </p>

        <form className="space-y-5">
          <Field className="relative">
            <FieldLabel
              htmlFor="input-field-username"
              className="absolute -top-2 left-4 bg-card px-2 text-xs text-muted-foreground"
            >
              Email or Username
            </FieldLabel>
            <Input
              id="input-field-username"
              type="text"
              placeholder="Enter your email or username"
              className="bg-background border-border focus:ring-ring text-sm"
            />
          </Field>

          <Button className="w-full bg-primary text-primary-foreground hover:opacity-90 text-sm font-medium">
            Send Confirmation
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground text-sm font-medium"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
