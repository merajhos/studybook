import Link from "next/link";
import { ArrowUpRight, BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";
import { BsInstagram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        
        
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500 text-white">
                <BookOpen size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Study<span className="text-cyan-400">Nook</span>
                </h2>

                <p className="text-[10px] uppercase tracking-widest text-slate-500">
                  Study Room Booking
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
              Find quiet, comfortable study rooms and reserve the perfect
              space for focused learning.
            </p>

        
            <div className="mt-6 flex items-center gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 transition hover:border-cyan-500 hover:bg-cyan-500 hover:text-white"
              >
                <FaFacebook size={17} />
              </a>

              <a
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-sm font-bold transition hover:border-cyan-500 hover:bg-cyan-500 hover:text-white"
              >
               <FaXTwitter size={17} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 transition hover:border-cyan-500 hover:bg-cyan-500 hover:text-white"
              >
                <LiaLinkedin size={17} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 transition hover:border-cyan-500 hover:bg-cyan-500 hover:text-white"
              >
                <BsInstagram size={17} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-cyan-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/rooms"
                  className="transition hover:text-cyan-400"
                >
                  All Rooms
                </Link>
              </li>

              <li>
                <Link
                  href="/#about"
                  className="transition hover:text-cyan-400"
                >
                  About StudyNook
                </Link>
              </li>
            </ul>
          </div>

       
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Account
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/login"
                  className="transition hover:text-cyan-400"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="transition hover:text-cyan-400"
                >
                  Create Account
                </Link>
              </li>

              <li>
                <Link
                  href="/my-bookings"
                  className="transition hover:text-cyan-400"
                >
                  My Bookings
                </Link>
              </li>

              <li>
                <Link
                  href="/my-listings"
                  className="transition hover:text-cyan-400"
                >
                  My Listings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-cyan-400"
                />

                <a
                  href="mailto:hello@studynook.com"
                  className="transition hover:text-white"
                >
                  hello@studynook.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-cyan-400"
                />

                <a
                  href="tel:+8801700000000"
                  className="transition hover:text-white"
                >
                  +880 1700-000000
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-cyan-400"
                />

                <span>
                  University Library
                  <br />
                  Dhaka, Bangladesh
                </span>
              </li>
            </ul>
          </div>
        </div>

    
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            © 2026 StudyNook. All rights reserved.
          </p>

          <Link
            href="/rooms"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition hover:text-cyan-400"
          >
            Find a study room
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;