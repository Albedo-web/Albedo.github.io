# Your 3D + Motion portfolio

Five files, no build step, free hosting on GitHub Pages (your address will be `https://YOUR-USERNAME.github.io`).

## Put it online (about 5 minutes)
1. Create a free account at github.com.
2. Click **New repository**. Name it exactly `YOUR-USERNAME.github.io`, set it to **Public**, and create it.
3. Click **uploading an existing file**, drag in all five files (`index.html`, `style.css`, `script.js`, `content.js`, `README.md`), then **Commit changes**.
4. Open **Settings > Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, and Save.
5. Wait 1 to 2 minutes, then open `https://YOUR-USERNAME.github.io`.

## Edit it later
Only `content.js` needs editing: your name, titles, about text, accent color, projects, email and links.
- On github.com, open `content.js`, click the pencil icon, edit, then **Commit changes**. The live site updates in about a minute (hard refresh with Ctrl+Shift+R if you still see the old version).
- To add a project, copy one `{ type: ... }` line in `projects` and change it. Delete a line to remove one.

## Add your own work
1. In your repository click **Add file > Upload files**, and upload into a folder named `assets` (typing `assets/` before the file name creates it).
2. In `content.js`, set `media` to the path, for example `"assets/chair-render.jpg"` or `"assets/logo-loop.mp4"`.
3. Your own 3D model in the hero: export a `.glb`, upload it to `assets`, and set `model: "assets/model.glb"`.

## File size tips
- Images: use `.webp` or `.jpg` under 500 KB. Videos: short muted loops under 5 MB. Keep `.glb` under 10 MB.
- For long showreels, upload to YouTube or Vimeo and put the video URL in `link`.
- GitHub rejects files over 100 MB.

## Preview on your computer
Double-click `index.html` to preview. A `.glb` model will not load that way, so use VS Code with the *Live Server* extension, or run `python -m http.server` in the folder and open `http://localhost:8000`.

## Change the look
Colors and fonts are at the top of `style.css`. Animation timings are in the `3. Scroll animations` part of `script.js`.
