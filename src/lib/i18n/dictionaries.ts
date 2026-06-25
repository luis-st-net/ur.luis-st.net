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
		intro: "A growing pile of white papers I wrote instead of sleeping, each one a question that did not deserve this much effort.",
		empty: "Nothing published yet. The rabbit holes are still under construction.",
		readMore: "Read paper",
		bannerTitle: "Please do not cite this.",
		bannerText:
			"None of this is actually quotable. It's side quests, not science. Tap to find out why you're here.",
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
			previewNote: "Preview. Expand for the full paper.",
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
		text: "The admin area only opens the door for the VPN. Your connection knocked; nobody recognised it.",
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
			abstractHint: "Just the abstract text, no title or heading. The “Abstract” title is added automatically.",
			content: "Content",
			contentUpload: "Upload .md file",
			contentType: "Type / paste content",
			contentModalTitle: "Paper content (Markdown)",
			pdf: "PDF file",
			bibtex: "BibTeX sources (optional, .bib)",
			pdfCurrent: "Current PDF",
			replace: "Replace",
		},
		abstractWarning: {
			title: "Remove the heading",
			body: "The abstract field should contain only the abstract text. A Markdown heading (# or ##) was found — remove it. The “Abstract” title is rendered automatically.",
			dismiss: "Got it",
		},
		save: "Save",
		cancel: "Cancel",
		saving: "Saving…",
		deleteConfirm: "Delete this paper and all its languages? This cannot be undone.",
		languageManager: {
			heading: "Languages",
			hint: "These are the languages papers can be published in. Website text is translated in code, the key maps a language to that text (English is the fallback).",
			code: "Code",
			name: "Display name",
			translationKey: "Translation key",
			add: "Add language",
			remove: "Remove",
			inUse: "In use, cannot be removed.",
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
		lead: "Unserious Research is where the side quests get written down at unreasonable length.",
		body: [
			"Every so often a question grabs me by the collar. Not an important one. Nobody is waiting for the answer, no grant depends on it, no one gets promoted. Just a question stubborn enough that the only way to make it leave is to write several pages at it.",
			"So I go down a rabbit hole and write it up. Then another. This site is the pile that results.",
			"Everything here is researched with real, faintly excessive rigour and absolutely zero consequence. Treat it as a lab notebook for curiosity that escaped containment and was never recaptured.",
			"In short: rigorous answers to questions nobody asked. Enjoy them, argue with them, send them to a friend who also didn't ask. Just do not cite them. They are not that kind of paper, and I am very much not that kind of researcher.",
		],
		quotableTitle: "Why \"not quotable\"?",
		quotableBody:
			"Because these are rabbit holes, not peer review. The rigour is real; the stakes are imaginary. If one of these ends up in your reference list, that is a matter between you and your conscience.",
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
				body: "Since effectively no personal data is processed, there is little to request, but you can always contact me using the address in the imprint.",
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
		intro: "Ein wachsender Stapel White Paper, geschrieben statt zu schlafen. Jedes davon eine Frage, die so viel Mühe eigentlich nicht verdient hatte.",
		empty: "Noch nichts veröffentlicht. Die rabbit holes werden noch gegraben.",
		readMore: "Paper lesen",
		bannerTitle: "Bitte nicht zitieren.",
		bannerText:
			"Nichts davon ist wirklich zitierfähig. Das hier sind side quests, keine Wissenschaft. Tippen, um herauszufinden, warum du hier bist.",
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
			previewNote: "Vorschau. Zum vollständigen Paper aufklappen.",
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
		rights: "Alle rabbit holes vorbehalten.",
	},
	vpn: {
		title: "Geschützter Bereich",
		text: "Der Admin-Bereich öffnet nur dem VPN die Tür. Deine Verbindung hat geklopft; erkannt hat sie niemand.",
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
			abstractHint: "Nur der Abstract-Text, kein Titel und keine Überschrift. Der Titel „Abstract“ wird automatisch hinzugefügt.",
			content: "Inhalt",
			contentUpload: ".md-Datei hochladen",
			contentType: "Inhalt eingeben / einfügen",
			contentModalTitle: "Paper-Inhalt (Markdown)",
			pdf: "PDF-Datei",
			bibtex: "BibTeX-Quellen (optional, .bib)",
			pdfCurrent: "Aktuelles PDF",
			replace: "Ersetzen",
		},
		abstractWarning: {
			title: "Überschrift entfernen",
			body: "Das Abstract-Feld sollte nur den Abstract-Text enthalten. Es wurde eine Markdown-Überschrift (# oder ##) gefunden — bitte entfernen. Der Titel „Abstract“ wird automatisch gerendert.",
			dismiss: "Verstanden",
		},
		save: "Speichern",
		cancel: "Abbrechen",
		saving: "Speichern…",
		deleteConfirm: "Dieses Paper und alle Sprachen löschen? Das kann nicht rückgängig gemacht werden.",
		languageManager: {
			heading: "Sprachen",
			hint: "Das sind die Sprachen, in denen Paper veröffentlicht werden können. Website-Text wird im Code übersetzt, der Schlüssel ordnet eine Sprache diesem Text zu (Englisch ist der Fallback).",
			code: "Code",
			name: "Anzeigename",
			translationKey: "Übersetzungsschlüssel",
			add: "Sprache hinzufügen",
			remove: "Entfernen",
			inUse: "In Verwendung, nicht entfernbar.",
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
		lead: "Unserious Research ist der Ort, an dem die side quests in unangemessener Länge aufgeschrieben werden.",
		body: [
			"Hin und wieder packt mich eine Frage am Kragen. Keine wichtige. Niemand wartet auf die Antwort, kein Fördergeld hängt daran, niemand wird befördert. Nur eine Frage, die so stur ist, dass man sie nur loswird, indem man mehrere Seiten gegen sie schreibt.",
			"Also falle ich in ein rabbit hole und schreibe es auf. Dann noch eins. Diese Seite ist der Stapel, der dabei herauskommt.",
			"Alles hier ist mit echter, leicht übertriebener Sorgfalt recherchiert und völlig folgenlos. Betrachte es als Laborbuch für Neugier, die aus der Quarantäne ausgebrochen und nie wieder eingefangen wurde.",
			"Kurz gesagt: rigorose Antworten auf Fragen, die niemand gestellt hat. Genieße sie, streite mit ihnen, schick sie an jemanden, der auch nicht gefragt hat. Nur zitieren solltest du sie nicht. Es sind nicht diese Art Paper, und ich bin erst recht nicht diese Art Forscher.",
		],
		quotableTitle: "Warum „nicht zitierfähig“?",
		quotableBody:
			"Weil das rabbit holes sind, kein Peer Review. Die Sorgfalt ist echt; der Einsatz ist eingebildet. Wenn eines davon in deinem Literaturverzeichnis landet, ist das eine Sache zwischen dir und deinem Gewissen.",
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
				body: "Da praktisch keine personenbezogenen Daten verarbeitet werden, gibt es wenig zu beantragen. Du kannst mich aber jederzeit über die Adresse im Impressum kontaktieren.",
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
