function getLangFromCookie(): string | undefined {
	const match = document.cookie.match(/(?:^|;\s*)lang=([^;]+)/);
	return match ? decodeURIComponent(match[1]) : undefined;
  }

