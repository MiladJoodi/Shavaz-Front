"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import Container from "@/components/container/container";
import { useAuthStore } from "@/stores/auth-store";

const registerSchema = z
  .object({
    name: z.string().min(3, "نام باید حداقل ۳ کاراکتر باشد"),
    email: z.string().email("ایمیل معتبر وارد کنید"),
    phone: z
      .string()
      .min(11, "شماره تلفن باید ۱۱ رقم باشد")
      .max(11, "شماره تلفن باید ۱۱ رقم باشد"),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن مطابقت ندارند",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setError("");
    const success = await registerUser({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });
    if (success) {
      router.push("/profile");
    } else {
      setError("ثبت‌نام ناموفق بود. لطفاً دوباره تلاش کنید.");
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
                ثبت‌نام در شاواز
              </h1>
              <p className="text-sm text-gray-400 text-center mb-6">
                حساب کاربری جدید ایجاد کنید
              </p>

              {error && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">نام و نام خانوادگی</label>
                  <input
                    {...register("name")}
                    className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary"
                    placeholder="نام کامل خود را وارد کنید"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

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
                  <label className="block text-sm text-gray-500 mb-1">شماره تلفن</label>
                  <input
                    {...register("phone")}
                    className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    dir="ltr"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">رمز عبور</label>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary pl-10"
                      placeholder="حداقل ۶ کاراکتر"
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

                <div>
                  <label className="block text-sm text-gray-500 mb-1">تکرار رمز عبور</label>
                  <input
                    {...register("confirmPassword")}
                    type={showPassword ? "text" : "password"}
                    className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary"
                    placeholder="رمز عبور را تکرار کنید"
                    dir="ltr"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
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
                      در حال ثبت‌نام...
                    </span>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      ثبت‌نام
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  قبلاً ثبت‌نام کرده‌اید؟{" "}
                  <Link href="/auth/login" className="text-primary hover:underline">
                    وارد شوید
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
