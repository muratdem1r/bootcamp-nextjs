import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import {
  useForgotPassMutation,
  useResetPassMutation,
} from "../../services/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router";

function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailSent, setEmailSent] = useState(false);
  const [forgotPass] = useForgotPassMutation();
  const [resetPass] = useResetPassMutation();

  const sendMailHandler = async (e) => {
    e.preventDefault();
    console.log(email);

    const res = await forgotPass(email);
    if (res.error) {
      toast.error(res.error.data.error);
    } else {
      setEmailSent(true);
      toast.success("Email sent.");
    }
  };

  const resetPassHandler = async (e) => {
    e.preventDefault();
    console.log(token);
    console.log(password);
    const res = await resetPass({ token: token, password: password });
    if (res.error) {
      toast.error(res.error.data.error);
    } else {
      toast.success("Please sign in with your new password.");
      router.push("/signin-signup");
    }
  };

  return (
    <>
      <div className="w-full md:w-1/2 md:mx-auto">
        <form
          className="flex flex-col sm:flex-row sm:items-center"
          onSubmit={sendMailHandler}
        >
          <div className="my-5 flex flex-col sm:flex-row sm:items-center gap-3">
            <label htmlFor="email">Email:</label>
            <input
              className="border-2 rounded p-2 focus:outline-none border-slate-100 focus:border-slate-300"
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <Button
            className={` p-2 sm:ml-2 ${
              emailSent ? "bg-slate-400" : "bg-green-700"
            }`}
          >
            {emailSent ? "Send Again" : "Send Mail"}
          </Button>
        </form>

        {emailSent && (
          <form
            className="flex flex-col gap-5 p-5 shadow my-10"
            onSubmit={resetPassHandler}
          >
            <div className="my-2 flex flex-col sm:flex-row sm:items-center gap-3">
              <label htmlFor="password">New Password:</label>
              <div>
                <input
                  className="border-2 rounded p-2 focus:outline-none border-slate-100 focus:border-slate-300"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  minLength={6}
                  placeholder="123456"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    className="inline ml-2 cursor-pointer"
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPassword(!showPassword)}
                    className="inline ml-2 cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="my-2 flex flex-col">
              <label htmlFor="token">Token:</label>
              <label className="text-black/20 text-sm font-bold mb-2">
                Please enter the token received in your email
              </label>
              <input
                className="border-2 rounded p-2 focus:outline-none border-slate-100 focus:border-slate-300"
                type="text"
                name="token"
                id="token"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <Button className="bg-green-700 py-2 sm:w-1/2">
              Change Password
            </Button>
          </form>
        )}
      </div>
    </>
  );
}

export default ForgotPasswordPage;
