'use client';

import { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaLink } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [open, setOpen] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Discover this on The Spirit Hub: ${title}`,
          url
        });
      } catch (err) {
        console.warn('Share cancelled or failed', err);
      }
    } else {
      setOpen(!open);
    }
  };

  // Base styles for all buttons
  const baseBtn =
    'flex items-center gap-2 px-3 py-2 rounded font-medium transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2';

  // Main "Share the Spirit" button — vivid magenta with gold hover
  const mainBtn =
    'bg-[#E60073] text-white hover:bg-[#D4AF37] hover:text-[#1A1A1A] active:bg-[#B8005C]';

  // Platform buttons keep their brand color but gold hover for Spirit Hub unity
  const platformBtn = (bg: string) =>
    `${baseBtn} ${bg} hover:bg-[#D4AF37] hover:text-[#1A1A1A]`;

  return (
    <div className="mt-6">
      {/* Main Share Button */}
      <button
        onClick={handleShare}
        className={`${baseBtn} ${mainBtn} px-4 py-2`}
      >
        <FiShare2 /> Share
      </button>

      {/* Expanded Share Options */}
      {open && (
        <div className="mt-3 grid grid-cols-2 gap-2 bg-gray-100 p-3 rounded shadow">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={platformBtn('bg-blue-600')}
          >
            <FaFacebookF /> Share the Spirit on Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Discover this on The Spirit Hub: ${title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={platformBtn('bg-sky-500')}
          >
            <FaTwitter /> Spread the Word on Twitter / X
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={platformBtn('bg-blue-700')}
          >
            <FaLinkedinIn /> Share with Your Network on LinkedIn
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
              `Hi there,

            I just found something on The Spirit Hub that I think you'll really enjoy: "${title}".

            You can check it out here: ${url}

            Let me know what you think!`
            )}`}
            className={platformBtn('bg-red-500')}
          >
            <FaEnvelope /> Send a Personal Invite via Email
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(url);
              alert('Link copied to clipboard!');
            }}
            className={`${platformBtn('bg-gray-600')} col-span-2`}
          >
            <FaLink /> Copy Link to Share the Spirit
          </button>
        </div>
      )}
    </div>
  );
}