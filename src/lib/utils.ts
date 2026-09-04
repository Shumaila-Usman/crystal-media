export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return num.toLocaleString();
}

export function formatFollowers(num: number): string {
  return formatNumber(num);
}

export function formatFollowersLong(num: number): string {
  if (num >= 1_000_000) {
    const value = num / 1_000_000;
    const formatted =
      value >= 10
        ? Math.round(value).toString()
        : value.toFixed(1).replace(/\.0$/, "");
    return `${formatted} Million`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return num.toLocaleString();
}

export function getWhatsAppLink(number: string, message?: string): string {
  const cleaned = number.replace(/\D/g, "");
  const base = `https://wa.me/${cleaned}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "");
}

export function getPlaceholderGradient(name: string): string {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue1 = (hash * 7) % 360;
  const hue2 = (hash * 13 + 120) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 45%, 25%) 0%, hsl(${hue2}, 55%, 35%) 50%, hsl(${(hue1 + 60) % 360}, 40%, 20%) 100%)`;
}

export function getTalentPlaceholderFilename(slug: string): string {
  return `${slug}.webp`;
}
