"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import Container from "@/components/container/container";
import Breadcrumb from "@/components/shared/Breadcrumb";
import SectionTitle from "@/components/shared/SectionTitle";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <main>
      <Container>
        <Breadcrumb items={[{ label: "تماس با ما" }]} />
        <SectionTitle title="تماس با ما" subtitle="ما اینجاییم تا به شما کمک کنیم" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-4">
              <div className="border border-gray-100 rounded-lg p-5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#646464] mb-1">شماره تماس</h3>
                  <p className="text-sm text-gray-400" dir="ltr">021-12345678</p>
                  <p className="text-sm text-gray-400" dir="ltr">0912-1234567</p>
                </div>
              </div>

              <div className="border border-gray-100 rounded-lg p-5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#646464] mb-1">ایمیل</h3>
                  <p className="text-sm text-gray-400" dir="ltr">info@shavaz.ir</p>
                  <p className="text-sm text-gray-400" dir="ltr">support@shavaz.ir</p>
                </div>
              </div>

              <div className="border border-gray-100 rounded-lg p-5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#646464] mb-1">آدرس</h3>
                  <p className="text-sm text-gray-400">تهران، خیابان ولیعصر، بالاتر از میدان ونک</p>
                </div>
              </div>

              <div className="border border-gray-100 rounded-lg p-5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#646464] mb-1">ساعت کاری</h3>
                  <p className="text-sm text-gray-400">شنبه تا پنجشنبه: ۹ صبح تا ۶ عصر</p>
                  <p className="text-sm text-gray-400">جمعه: تعطیل</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="border border-gray-100 rounded-lg p-6 bg-white">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <CheckCircle size={48} className="text-green-500" />
                  <h3 className="text-lg font-bold text-[#646464]">پیام شما ارسال شد!</h3>
                  <p className="text-sm text-gray-400 text-center">
                    با تشکر از پیام شما. تیم ما در اسرع وقت پاسخگوی شما خواهد بود.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary text-sm hover:underline"
                  >
                    ارسال پیام جدید
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-bold text-[#646464] mb-4">فرم تماس</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">نام و نام خانوادگی</label>
                        <input
                          type="text"
                          required
                          className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary"
                          placeholder="نام خود را وارد کنید"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">ایمیل</label>
                        <input
                          type="email"
                          required
                          className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary"
                          placeholder="example@email.com"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">موضوع</label>
                      <input
                        type="text"
                        required
                        className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary"
                        placeholder="موضوع پیام خود را وارد کنید"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">پیام</label>
                      <textarea
                        required
                        rows={5}
                        className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary resize-none"
                        placeholder="متن پیام خود را بنویسید..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          در حال ارسال...
                        </span>
                      ) : (
                        <>
                          <Send size={16} />
                          ارسال پیام
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
