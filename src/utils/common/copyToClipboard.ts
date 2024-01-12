export const copyToClipboard = async (text: string): Promise<boolean> => {

	const fallbackCopyTextToClipboard = (text: string): boolean => {
		let textArea = document.createElement("textarea");
		textArea.value = text;

		// Avoid scrolling to bottom
		textArea.style.top = "-200";
		textArea.style.left = "0";
		textArea.style.position = "fixed";
		textArea.style.opacity = "0"

		document.body.appendChild(textArea);
		textArea.select();
		let successful = false;
		try {
			successful = document.execCommand("copy");
		} catch (err) {
			successful = false;
		}
		document.body.removeChild(textArea);
		return successful;
	};

	const copyTextToClipboard = async (text: string): Promise<boolean> => {
		if (!navigator.clipboard || !window.isSecureContext) {
			return fallbackCopyTextToClipboard(text);
		}

		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch (error) {
			return fallbackCopyTextToClipboard(text);
		}
	};

	return await copyTextToClipboard(text);
};
