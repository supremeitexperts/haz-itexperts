"use client";

import { track } from "@/lib/track";
import { site } from "@/lib/siteConfig";

export default function TrackedPhoneLink({
  phone,
  href,
  source = "unknown",
  eventName = "call_click",
  className = "",
  children,
  ...props
}) {
  const phoneHref = (href || phone || "")
    .toString()
    .replace("tel:", "")
    .replace(/[^\d+]/g, "");

  const finalHref = phoneHref ? `tel:${phoneHref}` : "#";
  if (site?.hidePhone) return null;

  return (
    <a
      {...props}
      href={finalHref}
      className={className}
      onClick={(e) => {
        track(eventName, {
          source,
          page_path: typeof window !== "undefined" ? window.location.pathname : "",
          page_url: typeof window !== "undefined" ? window.location.href : "",
        });
        props?.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
