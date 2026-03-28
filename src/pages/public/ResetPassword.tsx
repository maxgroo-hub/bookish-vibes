import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Library, Mail, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});
type FormData = z.infer<typeof schema>;

const ResetPassword = () => {
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Reset:", data);
    setSent(true);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <Library className="w-8 h-8" />
          <span className="font-heading text-2xl font-bold">LibraVault</span>
        </Link>

        <div className="brutal-card p-8 rounded-lg">
          {!sent ? (
            <>
              <h1 className="font-heading text-3xl font-black mb-2">Reset Password</h1>
              <p className="text-muted-foreground mb-6">Enter your email to receive a reset link</p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="font-heading font-bold text-sm mb-1 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input {...register("email")} type="email" placeholder="you@example.com" className="brutal-input w-full pl-11 rounded-md" />
                  </div>
                  {errors.email && <p className="text-destructive text-sm mt-1 font-semibold">{errors.email.message}</p>}
                </div>
                <button type="submit" className="brutal-btn w-full bg-primary text-primary-foreground rounded-md font-heading text-lg">
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-success brutal-border rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="font-heading text-2xl font-black mb-2">Check Your Email</h2>
              <p className="text-muted-foreground mb-4">We've sent a password reset link to your email.</p>
              {countdown > 0 && (
                <p className="text-sm text-muted-foreground">
                  Resend in <span className="font-bold text-foreground">{countdown}s</span>
                </p>
              )}
              {countdown === 0 && (
                <button onClick={() => { setSent(false); setCountdown(60); }} className="brutal-btn bg-primary text-primary-foreground rounded-md font-heading text-sm">
                  Resend Email
                </button>
              )}
            </div>
          )}

          <Link to="/signin" className="flex items-center gap-2 justify-center mt-6 text-sm font-semibold text-accent hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
