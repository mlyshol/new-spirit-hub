import { FaFacebookSquare, FaYoutubeSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral text-white text-center py-6 text-sm">
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <span>
          © {new Date().getFullYear()} The Spirit Hub — All rights reserved.
        </span>
        <a
          href="https://www.facebook.com/profile.php?id=61577753076153"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-gray-500 hover:text-gray-300"
        >
          <FaFacebookSquare size={20} />
        </a>
        <a
          href="https://www.youtube.com/@thespirithubyt"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="text-gray-500 hover:text-gray-300"
        >
          <FaYoutubeSquare size={20} />
        </a>
      </div>
    </footer>
  );
}