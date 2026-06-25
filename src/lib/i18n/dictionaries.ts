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
		contact: "Contact",
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
		contact: "Contact",
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
		lead: "Where a harmless question accidentally turns into a paper.",
		body: [
			"Every so often a question grabs me by the collar. Not an important one, heaven forbid. Nobody is waiting for the answer, no funding body is lurking in the background, no committee convenes, no one will ever be promoted for it. It is merely a question so outrageously stubborn that the only way to be rid of it is to write several pages at it until one of the two parties gives up. (Usually the question. Sometimes me.)",
			"So I let myself fall down a rabbit hole and write it all down. Then the next one. This site is the pile that accumulates along the way: meticulously kept, utterly purposeless. What is it all for? Nothing. That is not an accident, that is the concept.",
			"Everything here is researched with real, faintly intrusive thoroughness and a guaranteed zero consequences. Treat it as the lab notebook of a curiosity that broke out of quarantine at some point and was never recaptured. There are plenty of footnotes anyway, not because they are needed, but because they look so pretty.",
			"In short: over-thorough answers to questions nobody asked. Enjoy them, contradict them loudly, forward them to someone who also didn't ask. Just do not cite them. These are not that kind of paper, and I am, with all due respect, very much not that kind of researcher.",
		],
		quotableTitle: "Why \"not quotable\"?",
		quotableBody:
			"Peer-reviewed by no one, proofread by the question itself. The care is real; the significance is entirely made up. Should one of these documents ever end up in your bibliography, that is a matter solely between you and your conscience.",
	},
	contact: {
		title: "Contact",
		lead: "Found a flaw, have a question nobody asked, or just want to argue with a footnote? Write to me. To keep the spam bots out, the form mails you a short code first.",
		form: {
			name: "Name",
			namePlaceholder: "Your name",
			mail: "Mail",
			mailPlaceholder: "mail@example.com",
			subject: "Subject",
			subjectPlaceholder: "What is this about?",
			message: "Message",
			messagePlaceholder: "Your message",
			acceptTerms: "I accept that the information provided will be used to contact me.",
			bot: "I am a bot, I just want to send spam.",
			submit: "Send verification code",
			submitting: "Sending verification…",
		},
		verify: {
			title: "Check your inbox",
			description: "Enter the 6-digit code we just mailed to you. It expires in 15 minutes.",
			label: "Verification code",
			placeholder: "000000",
			submit: "Verify & send message",
			submitting: "Sending…",
			back: "Use a different mail address",
		},
		validation: {
			nameRequired: "Name is required",
			mailInvalid: "Invalid mail address",
			subjectRequired: "Subject is required",
			messageRequired: "Message is required",
			acceptTermsRequired: "You must accept the contact conditions",
			codeLength: "The verification code must be 6 digits",
		},
		status: {
			verificationSentTitle: "Verification mail sent",
			verificationSentBody: "We mailed a verification code to your address.",
			successTitle: "Message sent",
			successBody: "Thanks — your message is on its way.",
			errorTitle: "Something went wrong",
			bot: "Please uncheck the \"I am a bot\" field if you're human.",
			expired: "Verification failed. The code expired or is invalid.",
			invalidCode: "That verification code is not correct.",
			failed: "Failed to send the mail. Please try again later.",
			unexpected: "An unexpected error occurred.",
		},
	},
	imprint: {
		title: "Imprint",
		representedBy: "Represented by:",
		contact: "Contact:",
		mail: "Mail:",
		disclaimerTitle: "Disclaimer",
		disclaimers: [
			{
				title: "Liability for content",
				body: "The contents of this website have been created with the greatest care. However, I cannot assume any liability for the correctness, completeness and topicality of the contents. As the operator of this private website, I am responsible for my own content in accordance with general legislation. However, as a private individual, I am not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. As soon as I become aware of such infringements, I will remove this content immediately.",
			},
			{
				title: "Liability for links",
				body: "This website contains links to external websites of third parties over whose content I have no influence. Therefore, I cannot accept any liability for this third-party content. The respective provider or operator of the pages is always responsible for the content of the linked pages. If I become aware of any legal infringements, I will remove such links immediately.",
			},
			{
				title: "Copyright",
				body: "The content and works on this site created by me as the site operator are subject to German copyright law. Reproduction, editing, distribution and any kind of exploitation outside the limits of copyright law require my written consent. The white papers published here are explicitly not intended to be cited as academic sources.",
			},
		],
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
		tagline: "Übergründliche Antworten auf Fragen, die niemand gestellt hat.",
	},
	nav: {
		home: "Start",
		about: "Über",
		contact: "Kontakt",
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
		contact: "Kontakt",
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
		lead: "Wo aus einer harmlosen Frage versehentlich ein Paper wird.",
		body: [
			"Hin und wieder packt mich eine Frage am Kragen. Keine wichtige, Gott bewahre. Niemand wartet auf die Antwort, kein Drittmittelgeber lauert im Hintergrund, kein Gremium tagt, niemand wird dafür je befördert. Es ist bloß eine Frage, die so unverschämt stur ist, dass man sie nur loswird, indem man mehrere Seiten gegen sie schreibt, bis eine von beiden Parteien aufgibt. (Meistens die Frage. Manchmal ich.)",
			"Also lasse ich mich in ein rabbit hole fallen und schreibe alles mit. Dann das nächste. Diese Seite ist der Stapel, der dabei anfällt: penibel geführt, vollkommen zweckfrei. Wozu das Ganze? Zu nichts. Das ist kein Versehen, das ist das Konzept.",
			"Recherchiert wird hier mit echter, leicht übergriffiger Gründlichkeit und mit garantiert null Konsequenzen. Betrachte es als Laborbuch einer Neugier, die irgendwann aus der Quarantäne ausgebrochen und nie wieder eingefangen wurde. Fußnoten gibt es trotzdem reichlich, nicht weil sie nötig wären, sondern weil sie so hübsch aussehen.",
			"Kurz gesagt: übergründliche Antworten auf Fragen, die niemand gestellt hat. Genieße sie, widersprich ihnen lautstark, schick sie weiter an jemanden, der ebenfalls nicht gefragt hat. Nur zitieren solltest du sie nicht. Das sind nicht diese Art Paper, und ich bin, bei allem Respekt, erst recht nicht diese Art Forscher.",
		],
		quotableTitle: "Warum „nicht zitierfähig“?",
		quotableBody:
			"Peer-reviewed von niemandem, gegengelesen von der Frage selbst. Die Sorgfalt ist echt; die Bedeutung ist frei erfunden. Sollte eines dieser Dokumente jemals in deinem Literaturverzeichnis landen, ist das eine Angelegenheit ausschließlich zwischen dir und deinem Gewissen.",
	},
	contact: {
		title: "Kontakt",
		lead: "Einen Fehler entdeckt, eine Frage, die niemand gestellt hat, oder einfach Lust, mit einer Fußnote zu streiten? Schreib mir. Damit die Spam-Bots draußen bleiben, schickt dir das Formular zuerst einen kurzen Code.",
		form: {
			name: "Name",
			namePlaceholder: "Dein Name",
			mail: "Mail",
			mailPlaceholder: "mail@example.com",
			subject: "Betreff",
			subjectPlaceholder: "Worum geht es?",
			message: "Nachricht",
			messagePlaceholder: "Deine Nachricht",
			acceptTerms: "Ich akzeptiere, dass die angegebenen Daten zur Kontaktaufnahme verwendet werden.",
			bot: "Ich bin ein Bot und möchte nur Spam verschicken.",
			submit: "Bestätigungscode senden",
			submitting: "Bestätigung wird gesendet…",
		},
		verify: {
			title: "Sieh in dein Postfach",
			description: "Gib den 6-stelligen Code ein, den wir dir gerade gemailt haben. Er läuft in 15 Minuten ab.",
			label: "Bestätigungscode",
			placeholder: "000000",
			submit: "Bestätigen & Nachricht senden",
			submitting: "Wird gesendet…",
			back: "Andere Mail-Adresse verwenden",
		},
		validation: {
			nameRequired: "Name ist erforderlich",
			mailInvalid: "Ungültige Mail-Adresse",
			subjectRequired: "Betreff ist erforderlich",
			messageRequired: "Nachricht ist erforderlich",
			acceptTermsRequired: "Du musst den Kontaktbedingungen zustimmen",
			codeLength: "Der Bestätigungscode muss 6 Ziffern haben",
		},
		status: {
			verificationSentTitle: "Bestätigungsmail gesendet",
			verificationSentBody: "Wir haben einen Bestätigungscode an deine Adresse geschickt.",
			successTitle: "Nachricht gesendet",
			successBody: "Danke — deine Nachricht ist unterwegs.",
			errorTitle: "Etwas ist schiefgelaufen",
			bot: "Bitte entferne den Haken bei „Ich bin ein Bot“, wenn du ein Mensch bist.",
			expired: "Bestätigung fehlgeschlagen. Der Code ist abgelaufen oder ungültig.",
			invalidCode: "Dieser Bestätigungscode ist nicht korrekt.",
			failed: "Mail konnte nicht gesendet werden. Bitte versuche es später erneut.",
			unexpected: "Ein unerwarteter Fehler ist aufgetreten.",
		},
	},
	imprint: {
		title: "Impressum",
		representedBy: "Vertreten durch:",
		contact: "Kontakt:",
		mail: "Mail:",
		disclaimerTitle: "Haftungsausschluss",
		disclaimers: [
			{
				title: "Haftung für Inhalte",
				body: "Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Haftung übernehmen. Als Betreiber dieser privaten Website bin ich gemäß den allgemeinen Gesetzen für eigene Inhalte verantwortlich. Als Privatperson bin ich jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Sobald ich von solchen Rechtsverletzungen Kenntnis erlange, werde ich diese Inhalte umgehend entfernen.",
			},
			{
				title: "Haftung für Links",
				body: "Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Haftung übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Sobald ich von Rechtsverletzungen Kenntnis erlange, werde ich derartige Links umgehend entfernen.",
			},
			{
				title: "Urheberrecht",
				body: "Die von mir als Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen meiner schriftlichen Zustimmung. Die hier veröffentlichten White Paper sind ausdrücklich nicht dafür gedacht, als wissenschaftliche Quellen zitiert zu werden.",
			},
		],
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
