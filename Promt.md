# Unserious Research

i have recently create a few white papers over some for me interested questions.
i would like to publish those "white papers" on a new website running on my vps, the domain for the website is ur.luis-st.net.
the name of the website should be "Unserious Research" since i'm not a person how can really publish something that is important for research.

## Gerneral
the website should be built using next.js and typescript.
you are allowed to use shadcn ui for components, please do only use simple 

the website should be split into two parts, one public part with a overview of all papers and then the detailed page for each paper
and a vpn protected admin page where i can upload/edit/remove white papers.

### VPN Protection
the admin route should be vpn protected, for this the /admin route will be restricted in nginx to the subdomain of my vpn (10.2.0.0/16).
when someone tries to access the admin route the application should pre-check if the user has access to this page.
if not he should get a warning page where a vpn icon is rendered in the center and a text point out that the user has no permission to enter the admin route, there should be a option to continue.


### White Paper
a white paper is considered to be a required pdf file a markdown string and a optional bibtex file for sources.
the white paper should be stored in a postgres db, use prisma orm for data handling in the application.
the pdf file should be stored in binary, the markdown as a string, the sources should be extracted into a separate table.
each paper should have the following additional properties:
optional icon, name, description, publish timestamp, nullable update timestamp, sha 256 hash of the pdf file, abstract as markdown.
the timestamp and hash of the pdf are auto determine and the user should never be able to set them

### Translation
i want the page to be available in english and german.
papers might be available only in one langange.

**Edit** this section was added later:
make sure this is extensible for other languages added later
when adding a paper, i have to select an language from a drop-down in a pop-up (before i get redirected to the adding page).
in the adding page there should then be the option to add a language this should be rendered like tabs with a +.
it should also be possible to add languages later in the admin section. the website translations must not be loaded from there, just the languages that should be supported for the papers, including a key that is used to load translations of text displayed in the website.
translations of website text can be hardcoded, english should the default fallback

## Pages

### Header
The header should contain a link to home and about.
as well as a button to enter admin page and a drop-down to change the langauge

### Home Page:
The home page should contain a overview of all papers i have published. 
the overview should render the title and the description of the paper, if present an icon as well.
when clicking on the paper i should get redirected to the paper page.

### Individual Page for a Paper:
on the top of that page the icon, title, description, the timestamps (update only if present),
download button for the pdf file with the sha-256 hash displayed (this should be moved to a dowload tab, since there might be more that one download because of multiple lanagues)

then there should tabs, abstract, content and sources.

#### Abstract Tab
the abstract tab is the default tab, it renders the markdown abstract into html

#### Content Tab
in the content tab a preview of the content is rendered (the first few lines, then the content should fade out).
the user should have the option to expand this section. then the full screen is covered and the user can scroll through the full paper
the view should support the browsers reader mode, this page should also have a dark/white mode support (only this full screen page), default mode should be system.

#### Sources Tab
the sources tab should list all sources from the parsed bibtex file,
if there are no sources the tab should be grayed out and not selectable

### Admin Page:
this page and sub pages should be vpn protected.
in the admin page there should be a item list of all papers published, there should be a button above the list to add a new paper.
each paper item should have a option to edit the paper

#### Upload Paper
When upload a new paper, i should get a form to enter/upload all information.
icon as optional upload field,
title, description as required text fields,
the abstract should be entered markdown formatted into a text area (should keep line breaks),
the pdf field required for only .pdf file uploads,

the markdown content can either be uploaded as markdown file (.md) or
the user should be able to click on that upload field to enter text.
this might be complicated since i also want the button to be clickable to open the user explorer for file selection
when clicking for entering markdown text, a popup should be opened where the user can pass in text into text area that keeps line breaks

the bibtex file should be optional file upload for .bib files

#### Edit Paper
in the edit view, i should be able to edit all user fields of a paper.
do not auto save after changing one field, the user must click on a cave button

## Markdown rendering
markdown should be rendered to html, there should be support for headings, bold, italic, crossed-out, equations, quote blocks and code blocks.
code should be syntax highlighted 

## Website style/design
the website should be modern, clean and simple structured.
use #FBFAF8 as base color for the website,.

## Imprint and Data Policy
Look at ../main-website for content details.

## funny things
the papers i published are not actually quotable, for this a banner should be rendered on the home page that explains this page.
when clicking on the banner the user should get redirected to a page called about, where i explain as rhetorical as possible what this website is for.

the about page should be funny, use phrases like "Side Quests", "Unserious Research", "Rabbit Holes", "I went down a rabbit hole and wrote it up.", "Rigorous answers to questions nobody asked.", ....




