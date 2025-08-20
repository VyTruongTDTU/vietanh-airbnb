"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
      const router = useRouter();
      const searchParams = useSearchParams();

      useEffect(() => {
            // Redirect to student login with any redirect parameters
            const redirectUrl = searchParams.get('redirect');
            const targetUrl = redirectUrl
                  ? `/student-login?redirect=${encodeURIComponent(redirectUrl)}`
                  : '/student-login';

            router.replace(targetUrl);
      }, [router, searchParams]);

      return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Đang chuyển hướng...</p>
                  </div>
            </div>
      );
}
