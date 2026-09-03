import { useState } from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../features/auth/authSchema";
import { Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import FeedbackModal from "../../components/feedback/FeedbackModal";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (formData: LoginFormData) => {
    setLoginError("");
    try {
      await login(formData).unwrap();
      console.log("Login successful");
      navigate("/dashboard");
    } catch (error: any) {
      setLoginError(error?.data?.message || "Unable to sign in");
      console.log("Login failed:", error);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <h1>Welcome back</h1>
          <p>Sign in to continue to TeamSync</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-field">
            <label htmlFor="email">Email</label>

            <div className="input-wrapper">
              <Mail size={18} aria-hidden="true" />

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="form-error" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>

            <div className="input-wrapper">
              <Lock size={18} aria-hidden="true" />

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="form-error" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
          <button type="submit" className="auth-submit-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create account</Link>
        </p>
      </section>
      {isLoading && (
        <FeedbackModal
          type="loading"
          title="Signing you in..."
          message="Please wait while we sign you in."
        />
      )}
      {loginError && (
        <FeedbackModal
          type="error"
          title="Sign in failed"
          message={loginError}
          onClose={() => setLoginError("")}
        />
      )}
    </main>
  );
}

export default Login;
