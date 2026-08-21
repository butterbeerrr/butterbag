import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Authentication from "../components/auth/Authentication";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Authentication
      title="Create Account"
      description="Join ButterBag and discover luxury."
    >
      <form onSubmit={handleRegister} className="mt-8">
        <div>
          <label className="text-xs font-medium tracking-wider">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="mt-2 w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-black"
          />
        </div>

        <div className="mt-5">
          <label className="text-xs font-medium">Email Address</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-2 w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-black"
          />
        </div>

        <div className="mt-5">
          <label className="text-xs font-medium">Password</label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            className="mt-2 w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-black"
          />
        </div>

        <div className="mt-5">
          <label className="text-xs font-medium ">Confirm Password</label>

          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            className="mt-2 w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-black"
          />
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-7 w-full bg-black px-5 py-3 text-sm text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="mt-6 text-center text-xs text-neutral-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-black underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </form>
    </Authentication>
  );
}

export default Register;
