import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import "./Register.css";
import { registerSchema, type RegisterFormData } from "../../features/auth/authSchema";
import FeedbackModal from "../../components/feedback/FeedbackModal";

function Register() {
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (formData: RegisterFormData) => {
    setServerError("");

    try {
      await register(formData).unwrap();

      navigate("/login");
    } catch (error: any) {
      setServerError(error?.data?.message || "Unable to create your account. Please try again.");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand">
          <div className="auth-brand-mark">
            <span />
            <span />
            <span />
          </div>

          <span className="auth-brand-name">TeamSync</span>
        </div>

        <div className="auth-header">
          <h1>Create your account</h1>

          <p>Start collaborating with your team</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          {serverError && (
            <p className="form-error" role="alert">
              {serverError}
            </p>
          )}
          <div className="form-field">
            <label htmlFor="name">Full name</label>

            <div className="input-wrapper">
              <User size={18} aria-hidden="true" />

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                {...registerField("name")}
              />
            </div>
            {errors.name && (
              <p className="form-error" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>

            <div className="input-wrapper">
              <Mail size={18} aria-hidden="true" />

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                {...registerField("email")}
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
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                autoComplete="new-password"
                {...registerField("password")}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="password-requirements">
            {errors.password && (
              <p className="form-error" role="alert">
                {errors.password.message}
              </p>
            )}
            <div>✓ At least 8 characters</div>
            <div>✓ Contains a number</div>
            <div>✓ Contains an uppercase letter</div>
          </div>

          <button type="submit" className="auth-submit-button" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>

      <p className="auth-footer">
        By creating an account, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>
      </p>

      {isLoading && (
        <FeedbackModal type="loading" title="Creating your account..." message="Please wait..." />
      )}
      {serverError && (
        <FeedbackModal
          type="error"
          title="Registration failed"
          message={serverError}
          onClose={() => setServerError("")}
        />
      )}
    </main>
  );
}

export default Register;
