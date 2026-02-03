import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CodePage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    alert(`Verifying code: ${code}`);
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-background transition-colors">
      <div className="w-full max-w-md rounded-2xl bg-card text-card-foreground shadow-lg p-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-4">
          Verify Code
        </h1>

        <p className="text-sm text-muted-foreground mb-6 text-center">
          Enter the code sent to your email or phone.
        </p>

        <form className="space-y-5" onSubmit={handleVerify}>
          <Field className="relative">
            <FieldLabel
              htmlFor="input-code"
              className="absolute -top-2 left-4 bg-card px-2 text-xs text-muted-foreground"
            >
              Verification Code
            </FieldLabel>
            <Input
              id="input-code"
              type="text"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-background border-border focus:ring-ring text-sm"
            />
          </Field>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:opacity-90 text-sm font-medium"
          >
            Verify Code
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground text-sm font-medium"
            onClick={() => alert("Code resent!")}
          >
            Resend Code
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default CodePage;
