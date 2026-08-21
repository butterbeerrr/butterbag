import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Authentication from "../components/auth/Authentication";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
          navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Authentication title="Sign in" description="Welcome back to ButterBag.">
      <form className="mt-10" onSubmit={handleLogin}>
        <div>
          <label className="text-xs font-medium ">Email Address</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-2 w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-black"
          />
        </div>
        <div className="mt-5">
          <label className="text-xs font-medium">Password</label>

          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full border border-neutral-300 bg-transparent px-4 py-3 pr-12 text-sm outline-none transition focus:border-black"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
            >
              {showPassword ? (
                <EyeOff size={18} strokeWidth={1.5} />
              ) : (
                <Eye size={18} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-3 text-right">
          <button
            type="button"
            className="text-xs text-neutral-500 hover:text-black"
          >
            Forgot password?
          </button>
        </div>

        {/* Login */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-black px-5 py-3 text-sm text-white transition hover:bg-neutral-800 disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="mt-8 text-center text-xs text-neutral-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-black underline underline-offset-4"
          >
            Create Account
          </Link>
        </p>
      </form>
    </Authentication>
  );
}

export default Login;
