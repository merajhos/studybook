import MyBookingsClient from "@/components/bookings/MyBookingsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "StudyNook – My Bookings",
};

export default async function MyBookingsPage() {
  const reqHeaders = await headers();

  // Better Auth session
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  // Login না থাকলে login page
  if (!session?.user) {
    redirect("/login");
  }

  // Better Auth JWT token
  let token = "";

  try {
    const tokenData = await auth.api.getToken({
      headers: reqHeaders,
    });

    console.log("Token data:", tokenData);

    if (typeof tokenData === "string") {
      token = tokenData;
    } else if (tokenData?.token) {
      token = tokenData.token;
    }
  } catch (error) {
    console.error("Failed to get JWT token:", error);
  }

  let initialBookings = [];

  // Backend থেকে bookings fetch
  if (token) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is missing");
      } else {
        const res = await fetch(
          `${apiUrl}/bookings/my-bookings`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        console.log(
          "My bookings API status:",
          res.status
        );

        if (res.ok) {
          const data = await res.json();

          initialBookings = Array.isArray(data)
            ? data
            : data?.bookings || [];
        } else {
          const errorText = await res.text();

          console.error(
            "Bookings API error:",
            res.status,
            errorText
          );
        }
      }
    } catch (error) {
      console.error(
        "Failed to fetch initial bookings:",
        error
      );
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          My Bookings
        </h1>

        <p className="text-slate-600 dark:text-slate-400 mt-1">
          View your booked rooms and manage your reservations.
        </p>
      </div>

      <MyBookingsClient
        initialBookings={initialBookings}
        token={token}
        userProfile={session.user}
      />
    </main>
  );
}