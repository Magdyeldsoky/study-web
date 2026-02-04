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

        if (!firstName || !lastName || !usernameOrEmail || !password || !confirmPassword) {
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
        <section className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8 transition-colors">
            <div className="absolute top-8 sm:top-12 left-1/2 transform -translate-x-1/2">
                <Logo size="40px" />
            </div>

            <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-2xl bg-card text-card-foreground shadow-lg p-6 sm:p-8 md:p-10 mx-auto">
                <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
                    Sign Up
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground mb-6 text-center">
                    Create your account by filling the information below.
                </p>

                {error && (
                    <p className="text-sm text-red-500 text-center mb-4">{error}</p>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field className="relative">
                            <FieldLabel className="absolute -top-2 left-4 bg-card px-2 text-xs sm:text-sm text-muted-foreground">
                                First Name
                            </FieldLabel>
                            <Input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First name"
                                className="bg-background border-border text-sm sm:text-base"
                            />
                        </Field>

                        <Field className="relative">
                            <FieldLabel className="absolute -top-2 left-4 bg-card px-2 text-xs sm:text-sm text-muted-foreground">
                                Last Name
                            </FieldLabel>
                            <Input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last name"
                                className="bg-background border-border text-sm sm:text-base"
                            />
                        </Field>
                    </div>

                    <Field className="relative">
                        <FieldLabel className="absolute -top-2 left-4 bg-card px-2 text-xs sm:text-sm text-muted-foreground">
                            Username or Email
                        </FieldLabel>
                        <Input
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            placeholder="Username or email"
                            className="bg-background border-border text-sm sm:text-base"
                        />
                    </Field>

                    <Field className="relative">
                        <FieldLabel className="absolute -top-2 left-4 bg-card px-2 text-xs sm:text-sm text-muted-foreground">
                            Password
                        </FieldLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="bg-background border-border text-sm sm:text-base"
                        />
                    </Field>

                    <Field className="relative">
                        <FieldLabel className="absolute -top-2 left-4 bg-card px-2 text-xs sm:text-sm text-muted-foreground">
                            Confirm Password
                        </FieldLabel>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            className="bg-background border-border text-sm sm:text-base"
                        />
                    </Field>

                    <Button className="w-full bg-primary text-primary-foreground hover:opacity-90 text-sm sm:text-base font-medium py-3 sm:py-4">
                        Sign Up
                    </Button>

                    <p className="text-sm sm:text-base text-muted-foreground text-center mt-2">
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
