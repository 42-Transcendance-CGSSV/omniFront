export function getLangFromCookie(): string | undefined {
	const match = document.cookie.match(/(?:^|;\s*)lang=([^;]+)/);
	return match ? decodeURIComponent(match[1]) : undefined;
  }

export function setLangCookie(lang: string): void {
	document.cookie = `lang=${encodeURIComponent(lang)}; path=/; max-age=31536000`;
}