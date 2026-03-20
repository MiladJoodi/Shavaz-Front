"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LogIn, Eye, EyeOff } from "lucide-react";
import Container from "@/components/container/container";
import { useAuthStore } from "@/stores/auth-store";

const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر وارد کنید"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError("");
    const success = await login(data.email, data.password);
    if (success) {
      router.push("/profile");
    } else {
      setError("ورود ناموفق بود. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <main>
      <Container>
        <div className="flex items-center justify-center min-h-[70vh] py-12">
          <div className="w-full max-w-md">
            <div className="border border-gray-100 rounded-lg p-8 bg-white">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <Image src="/logo.svg" width={100} height={50} alt="شاواز" />
              </div>

              <h1 className="text-xl font-bold text-[#646464] text-center mb-2">
                ورود به حساب کاربری
              </h1>
              <p className="text-sm text-gray-400 text-center mb-6">
                به شاواز خوش آمدید
              </p>

              {error && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">ایمیل</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary"
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">رمز عبور</label>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary pl-10"
                      placeholder="رمز عبور خود را وارد کنید"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      در حال ورود...
                    </span>
                  ) : (
                    <>
                      <LogIn size={18} />
                      ورود
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  حساب کاربری ندارید؟{" "}
                  <Link href="/auth/register" className="text-primary hover:underline">
                    ثبت نام کنید
                  </Link>
                </p>
              </div>

              <div className="mt-4 bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-600 text-center">
                  این یک پروژه نمونه است. هر ایمیل و رمزی وارد کنید ورود انجام می‌شود.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
