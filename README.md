# Personal Portfolio Website

## Getting Started

These instructions will help you set up and run the portfolio website locally, as well as customize it for your own use.

### 1. Clone the Repository

```
git clone <your-fork-or-this-repo-url>
cd ash0904.github.io
```

### 2. Folder Structure

- `index.html` — Main HTML file
- `styles/` — All CSS files
- `scripts/` — All JavaScript files
- `data/` — JSON files for content (about, experience, education, skills, contact, projects)
- `resources/` — Images, favicon, and other static assets

### 3. Running Locally

This is a static website, but due to browser security restrictions (CORS), you need to use a local server to load JSON data.

#### Recommended: Use a Local Server (Python)
If you have Python 3 installed, run:

```
python3 -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

#### Other Options
You can use any static server (such as [http-server](https://www.npmjs.com/package/http-server) via npm, or similar tools) to serve the site locally.

### 4. Customizing Your Portfolio

All your content is in the `data/` folder as JSON files:
- `about.json` — About Me section
- `experience.json` — Work experience
- `education.json` — Education
- `skills.json` — Skills
- `projects.json` — Projects
- `contact.json` — Contact info and social links

Edit these files to update your details. The site will automatically load the new content.

#### To use your own images:
- Place your images in the `resources/` folder.
- Update the image paths in the relevant files (e.g., `styles/home-hero.css` for the hero background).

### 5. Making It Your Own

If you want to use this as your own portfolio:
1. **Fork this repository** to your own GitHub account.
2. **Clone your fork**:
   ```
   git clone <your-fork-url>
   cd ash0904.github.io
   ```
3. **Update the content** in the `data/` folder and any images in `resources/`.
4. **Change the site title and meta tags** in `index.html`.
5. **Customize styles** in the `styles/` folder as desired.
6. **Test locally** as described above.
7. **Push your changes** to your forked repo:
   ```
   git add .
   git commit -m "Update my portfolio details"
   git push
   ```
8. **Deploy with GitHub Pages** (or any static host):
   - On GitHub, go to your repo Settings > Pages and set the source to the main branch.
   - Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

---

**Enjoy your new portfolio!**

---

> **Credit/Warning:**
> This portfolio was made by vibe coding using [Cursor](https://www.cursor.com/). If you fork or reuse, be aware that the code and structure may be highly optimized for rapid iteration and AI-assisted workflows.
