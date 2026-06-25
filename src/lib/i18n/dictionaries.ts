/**
 * Hardcoded website UI translations. English is the canonical shape and the
 * fallback for any language whose `translationKey` is missing here. Paper
 * languages are managed in the database; this only covers chrome/text shown by
 * the site itself.
 */

export const en = {
	site: {
		name: "Unserious Research",
		tagline: "Rigorous answers to questions nobody asked.",
	},
	nav: {
		home: "Home",
		about: "About",
		admin: "Admin",
		language: "Language",
	},
	home: {
		heading: "Unserious Research",
		intro: "A small pile of white papers I wrote going down rabbit holes.",
		empty: "No papers published yet. The rabbit holes are still being dug.",
		readMore: "Read paper",
		bannerTitle: "Please do not cite this.",
		bannerText:
			"These papers are not actually quotable. They are side quests, not science. Tap to find out what this place is.",
	},
	paper: {
		published: "Published",
		updated: "Updated",
		backToHome: "Back to all papers",
		notAvailable: "This paper is not available in the selected language.",
		availableIn: "Available in",
		tabs: {
			abstract: "Abstract",
			content: "Content",
			sources: "Sources",
			download: "Download",
		},
		content: {
			expand: "Read full paper",
			collapse: "Close",
			previewNote: "Preview — expand for the full paper.",
			empty: "There is no written content for this paper.",
		},
		sources: {
			empty: "No sources for this paper.",
		},
		download: {
			heading: "Download",
			pdf: "Download PDF",
			sha256: "SHA-256",
			language: "Language",
		},
	},
	reader: {
		theme: {
			system: "System",
			light: "Light",
			dark: "Dark",
		},
		close: "Close",
	},
	footer: {
		imprint: "Imprint",
		dataPolicy: "Data Policy",
		rights: "All rabbit holes reserved.",
	},
	vpn: {
		title: "Restricted area",
		text: "The admin area is only reachable from inside the VPN. Your connection is not recognised as part of it.",
		continue: "Try anyway",
		back: "Back to safety",
	},
	admin: {
		title: "Admin",
		papers: "Papers",
		addPaper: "Add paper",
		edit: "Edit",
		delete: "Delete",
		noPapers: "No papers yet.",
		languages: "Languages",
		manageLanguages: "Manage languages",
		pickLanguage: "Select the first language for this paper",
		pickLanguageHint: "You can add more languages afterwards.",
		continue: "Continue",
		newPaper: "New paper",
		editPaper: "Edit paper",
		addLanguageTab: "Add language",
		removeLanguageTab: "Remove this language",
		fields: {
			icon: "Icon (optional)",
			iconHint: "Shared across all languages.",
			title: "Title",
			description: "Description",
			abstract: "Abstract (Markdown)",
			content: "Content",
			contentUpload: "Upload .md file",
			contentType: "Type / paste content",
			contentModalTitle: "Paper content (Markdown)",
			pdf: "PDF file",
			bibtex: "BibTeX sources (optional, .bib)",
			pdfCurrent: "Current PDF",
			replace: "Replace",
		},
		save: "Save",
		cancel: "Cancel",
		saving: "Saving…",
		deleteConfirm: "Delete this paper and all its languages? This cannot be undone.",
		languageManager: {
			heading: "Paper languages",
			hint: "These are the languages papers can be published in. Website text is translated in code; the key maps a language to that text (English is the fallback).",
			code: "Code",
			name: "Display name",
			translationKey: "Translation key",
			add: "Add language",
			remove: "Remove",
			inUse: "In use — cannot remove.",
		},
	},
	common: {
		loading: "Loading…",
		none: "None",
		required: "required",
		optional: "optional",
	},
	about: {
		title: "About",
		lead: "Unserious Research is where I write up the side quests.",
		body: [
			"Sometimes a question grabs me by the collar. Not an important question — nobody is waiting for the answer, no grant depends on it, no one will be promoted. Just a question that refuses to leave until I have written several pages at it.",
			"I went down a rabbit hole and wrote it up. Then another. This site is the pile.",
			"Everything here is researched with genuine, slightly excessive rigour and absolutely no consequence. Think of it as a lab notebook for curiosity that escaped containment.",
			"So: rigorous answers to questions nobody asked. Please enjoy them, argue with them, share them — but do not cite them. They are not that kind of paper, and I am not that kind of researcher.",
		],
		quotableTitle: "Why \"not quotable\"?",
		quotableBody:
			"Because these are rabbit holes, not peer-reviewed work. The rigour is real; the stakes are imaginary. If you put one of these in a reference list, that is between you and your conscience.",
	},
	imprint: {
		title: "Imprint",
		representedBy: "Represented by:",
		contact: "Contact:",
		mail: "Mail:",
		disclaimerTitle: "Disclaimer",
	},
	dataPolicy: {
		title: "Data Policy",
		intro:
			"Using this website is generally possible without providing personal data. No tracking, no analytics, no advertising.",
		sections: [
			{
				title: "What is collected",
				body: "The site stores the white papers themselves (text, PDF and optional sources). It does not ask you for personal data and sets no tracking cookies. Only a small preference cookie may be stored to remember your chosen language.",
			},
			{
				title: "Server logs",
				body: "Like any web server, the hosting may keep technical access logs (IP address, time, requested page) for security and operation. These are not combined with other data and not used to identify you.",
			},
			{
				title: "Downloads",
				body: "PDF downloads are served directly from this server. No third party is involved and no download is tracked.",
			},
			{
				title: "Your rights",
				body: "Since effectively no personal data is processed, there is little to request — but you can always contact me using the address in the imprint.",
			},
		],
	},
};

export type Dictionary = typeof en;

// German translation. Must mirror the English shape.
export const de: Dictionary = {
	site: {
		name: "Unserious Research",
		tagline: "Rigorose Antworten auf Fragen, die niemand gestellt hat.",
	},
	nav: {
		home: "Start",
		about: "Über",
		admin: "Admin",
		language: "Sprache",
	},
	home: {
		heading: "Unserious Research",
		intro: "Ein kleiner Stapel White Paper, geschrieben in diversen Kaninchenbauten.",
		empty: "Noch keine Paper veröffentlicht. Die Kaninchenbauten werden noch gegraben.",
		readMore: "Paper lesen",
		bannerTitle: "Bitte nicht zitieren.",
		bannerText:
			"Diese Paper sind nicht wirklich zitierfähig. Es sind Side Quests, keine Wissenschaft. Tippen, um zu erfahren, was das hier ist.",
	},
	paper: {
		published: "Veröffentlicht",
		updated: "Aktualisiert",
		backToHome: "Zurück zu allen Papern",
		notAvailable: "Dieses Paper ist in der gewählten Sprache nicht verfügbar.",
		availableIn: "Verfügbar in",
		tabs: {
			abstract: "Abstract",
			content: "Inhalt",
			sources: "Quellen",
			download: "Download",
		},
		content: {
			expand: "Ganzes Paper lesen",
			collapse: "Schließen",
			previewNote: "Vorschau — zum vollständigen Paper aufklappen.",
			empty: "Für dieses Paper gibt es keinen geschriebenen Inhalt.",
		},
		sources: {
			empty: "Keine Quellen für dieses Paper.",
		},
		download: {
			heading: "Download",
			pdf: "PDF herunterladen",
			sha256: "SHA-256",
			language: "Sprache",
		},
	},
	reader: {
		theme: {
			system: "System",
			light: "Hell",
			dark: "Dunkel",
		},
		close: "Schließen",
	},
	footer: {
		imprint: "Impressum",
		dataPolicy: "Datenschutz",
		rights: "Alle Kaninchenbauten vorbehalten.",
	},
	vpn: {
		title: "Geschützter Bereich",
		text: "Der Admin-Bereich ist nur aus dem VPN erreichbar. Deine Verbindung wird nicht als Teil davon erkannt.",
		continue: "Trotzdem versuchen",
		back: "Zurück in Sicherheit",
	},
	admin: {
		title: "Admin",
		papers: "Paper",
		addPaper: "Paper hinzufügen",
		edit: "Bearbeiten",
		delete: "Löschen",
		noPapers: "Noch keine Paper.",
		languages: "Sprachen",
		manageLanguages: "Sprachen verwalten",
		pickLanguage: "Wähle die erste Sprache für dieses Paper",
		pickLanguageHint: "Weitere Sprachen kannst du danach hinzufügen.",
		continue: "Weiter",
		newPaper: "Neues Paper",
		editPaper: "Paper bearbeiten",
		addLanguageTab: "Sprache hinzufügen",
		removeLanguageTab: "Diese Sprache entfernen",
		fields: {
			icon: "Icon (optional)",
			iconHint: "Für alle Sprachen gemeinsam.",
			title: "Titel",
			description: "Beschreibung",
			abstract: "Abstract (Markdown)",
			content: "Inhalt",
			contentUpload: ".md-Datei hochladen",
			contentType: "Inhalt eingeben / einfügen",
			contentModalTitle: "Paper-Inhalt (Markdown)",
			pdf: "PDF-Datei",
			bibtex: "BibTeX-Quellen (optional, .bib)",
			pdfCurrent: "Aktuelles PDF",
			replace: "Ersetzen",
		},
		save: "Speichern",
		cancel: "Abbrechen",
		saving: "Speichern…",
		deleteConfirm: "Dieses Paper und alle Sprachen löschen? Das kann nicht rückgängig gemacht werden.",
		languageManager: {
			heading: "Paper-Sprachen",
			hint: "Das sind die Sprachen, in denen Paper veröffentlicht werden können. Website-Text wird im Code übersetzt; der Schlüssel ordnet eine Sprache diesem Text zu (Englisch ist der Fallback).",
			code: "Code",
			name: "Anzeigename",
			translationKey: "Übersetzungsschlüssel",
			add: "Sprache hinzufügen",
			remove: "Entfernen",
			inUse: "In Verwendung — nicht entfernbar.",
		},
	},
	common: {
		loading: "Lädt…",
		none: "Keine",
		required: "erforderlich",
		optional: "optional",
	},
	about: {
		title: "Über",
		lead: "Unserious Research ist der Ort, an dem ich die Side Quests aufschreibe.",
		body: [
			"Manchmal packt mich eine Frage am Kragen. Keine wichtige Frage — niemand wartet auf die Antwort, kein Fördergeld hängt daran, niemand wird befördert. Nur eine Frage, die nicht weggeht, bis ich mehrere Seiten gegen sie geschrieben habe.",
			"Ich bin in einen Kaninchenbau gefallen und habe es aufgeschrieben. Dann noch einen. Diese Seite ist der Stapel.",
			"Alles hier ist mit ehrlicher, leicht übertriebener Sorgfalt recherchiert und völlig folgenlos. Eine Art Laborbuch für Neugier, die aus der Quarantäne ausgebrochen ist.",
			"Also: rigorose Antworten auf Fragen, die niemand gestellt hat. Genieße sie, streite mit ihnen, teile sie — aber zitiere sie nicht. Es sind nicht diese Art Paper, und ich bin nicht diese Art Forscher.",
		],
		quotableTitle: "Warum „nicht zitierfähig“?",
		quotableBody:
			"Weil das Kaninchenbauten sind, keine begutachtete Arbeit. Die Sorgfalt ist echt; der Einsatz ist eingebildet. Wenn du eines davon in ein Literaturverzeichnis setzt, ist das zwischen dir und deinem Gewissen.",
	},
	imprint: {
		title: "Impressum",
		representedBy: "Vertreten durch:",
		contact: "Kontakt:",
		mail: "Mail:",
		disclaimerTitle: "Haftungsausschluss",
	},
	dataPolicy: {
		title: "Datenschutz",
		intro:
			"Die Nutzung dieser Website ist grundsätzlich ohne Angabe personenbezogener Daten möglich. Kein Tracking, keine Analyse, keine Werbung.",
		sections: [
			{
				title: "Was erhoben wird",
				body: "Die Seite speichert die White Paper selbst (Text, PDF und optionale Quellen). Sie fragt keine personenbezogenen Daten ab und setzt keine Tracking-Cookies. Es kann lediglich ein kleines Präferenz-Cookie gespeichert werden, um deine gewählte Sprache zu merken.",
			},
			{
				title: "Server-Logs",
				body: "Wie jeder Webserver kann das Hosting technische Zugriffsprotokolle (IP-Adresse, Zeit, aufgerufene Seite) zu Sicherheits- und Betriebszwecken führen. Diese werden nicht mit anderen Daten zusammengeführt und nicht zur Identifizierung genutzt.",
			},
			{
				title: "Downloads",
				body: "PDF-Downloads werden direkt von diesem Server ausgeliefert. Es ist kein Dritter beteiligt und kein Download wird nachverfolgt.",
			},
			{
				title: "Deine Rechte",
				body: "Da praktisch keine personenbezogenen Daten verarbeitet werden, gibt es wenig zu beantragen — du kannst mich aber jederzeit über die Adresse im Impressum kontaktieren.",
			},
		],
	},
};

export const dictionaries: Record<string, Dictionary> = { en, de };

export const DEFAULT_LOCALE = "en";

/** Returns the dictionary for a translation key, falling back to English. */
export function getDictionary(key: string | undefined | null): Dictionary {
	if (key && dictionaries[key]) {
		return dictionaries[key];
	}
	return dictionaries[DEFAULT_LOCALE];
}

/** Website display languages we actually have translations for. */
export const websiteLocales: { key: string; name: string }[] = [
	{ key: "en", name: "English" },
	{ key: "de", name: "Deutsch" },
];
