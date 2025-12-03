import AuthProvider from "./context/AuthContext";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-pink-50 flex flex-col items-center pt-10">
        <h1 className="text-3xl font-bold text-pink-700">
          lcome to my Next.js App 
        </h1>

        <SignupForm />
        <LoginForm />
      </div>
    </AuthProvider>
  );
}
