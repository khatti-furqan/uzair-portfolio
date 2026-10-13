# Uzair Amin — Portfolio

A responsive, four-page portfolio for a video editor, videographer, and content creator. Plain HTML, CSS, and JavaScript. No installation, build, paid service, or API key required.

## Start here

Open `index.html` to view it on your computer. The four visitor pages are Home, Work, About, and Contact. All links use relative paths so the site works in a GitHub Pages project repository.

**Before sharing publicly:** replace the clearly marked sample projects in `content.js`, add Uzair’s real social links and email, and review the About copy with him. The included SVG artwork is original illustrative placeholder artwork, not his actual work. No client claims or testimonials have been invented.

## Update everything in one file

Open **content.js** in GitHub and click the pencil icon. Edit the values, then choose Commit changes. GitHub Pages will update after deployment. Keep the first line `window.PORTFOLIO =` and the final semicolon. Use double quotes for strings; put commas between items, but not after the last item. Use `\"` for quotes within a string.

### Profile

- `email`: his real email address. Enables an email link and opens the visitor’s email app with the completed project brief.
- `instagram`: full Instagram profile URL.
- `youtube`: full YouTube channel URL.
- `whatsapp`: international number using digits only, e.g. Pakistan starts with `92`; no spaces or plus sign.
- `portrait`: add a photo to assets and use `assets/uzair.jpg`, or leave blank for the monogram.
- `about`, `intro`, `availability`, `title`: editable page text.
- `name` and `tagline` are retained as reference fields; page headlines and the visible brand name are designed in HTML. Change these directly in the HTML if desired.

### Add a project

Add this object to the `projects` array (put a comma between this and the previous object):

```js
{
  "id": "my-first-film",
  "title": "My first film",
  "category": "Films",
  "year": "2026",
  "description": "A short description of this real project.",
  "role": "Videography & editing",
  "url": "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  "thumbnail": "assets/my-first-film.jpg",
  "featured": true,
  "demo": false,
  "comments": []
}
```

Upload the cover image into `assets/`. Use a landscape JPG or WebP, ideally 1200px wide. Use a unique id for each project. Set `featured` to true to include it among the first three featured projects on Home. New category names become filter buttons automatically. Remove sample projects once you add real ones.

YouTube watch, youtu.be, and Shorts links support optional embedded playback. Visitors choose to load the YouTube player. A link to the original video is also shown in case embedding is disabled by the owner. Instagram Reel/post links open on Instagram; they do not depend on Instagram’s embed script. Any other full HTTPS video link opens on its original platform.

### Comments and testimonials

Project `comments` are curated quotes added by Uzair, not an open public comment feed:

```js
"comments": [
  { "author": "Client name (with permission)", "text": "Their real approved comment." }
]
```

Global `testimonials` appear on About only when added:

```js
"testimonials": [
  { "author": "Client name", "role": "Project or role", "text": "A real approved testimonial." }
]
```

Never add invented feedback. Public visitor comments would require an external commenting service or backend; they are not part of this static version.

## Publish on GitHub Pages — easiest method

1. Create a GitHub repository, for example `uzair-portfolio`. A public repository is the simplest option for free Pages hosting.
2. Extract the downloaded ZIP. Upload the **contents** of the `uzair-amin` folder to the repository root, so `index.html` sits at the root rather than inside a second folder. Include assets.
3. Open repository **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**.
5. Choose **main** and **/(root)**, then Save.
6. Wait for the Pages deployment to finish. Use the URL shown in Settings → Pages; typically `https://USERNAME.github.io/uzair-portfolio/`.

No special hosting configuration is needed. `.nojekyll` disables Jekyll processing.

### Optional GitHub Actions deployment

If uploading through Git or a method that preserves hidden directories, an optional `.github/workflows/pages.yml` is included. In Settings → Pages, choose **GitHub Actions** instead of branch deployment. The workflow publishes the root static website on pushes to main. Use one deployment method. If the GitHub web uploader doesn’t include hidden files, branch deployment is fine.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Contact form behavior

The form opens a drafted message in the visitor’s email app when Uzair’s email is configured. It does not automatically send anything. Without an email address, it copies the brief (with a manual-copy fallback). There is no server, inbox database, visitor account, or storage of submitted details.

## Files

- `index.html`, `work.html`, `about.html`, `contact.html`: the four pages.
- `content.js`: profile, links, projects, services, and approved comments.
- `style.css`: responsive design.
- `app.js`: filters, project dialog, video player, and contact brief.
- `assets/`: original SVG sample illustrations, favicon, and your uploaded images.

## Verification

JavaScript syntax and local file/link integrity were checked. Browser visual QA was unavailable in the creation environment. Verify the appearance on mobile and desktop, test your real video links, and send yourself a project enquiry before sharing the site.

## Director’s cut: motion & filmmaker identity

The redesigned opening uses three gently moving scenes, large kinetic typography, a recording timecode, and an animated editing timeline. Projects also appear in a continuous filmstrip; choosing a frame opens the corresponding project on Work. Project cards tilt subtly with a desktop pointer. Sections reveal as you scroll, with a page progress line and a subtle pointer glow. The colour-grade demo has a keyboard-accessible slider.

**Motion on / Motion off** is available on all four pages and remembered in the visitor’s browser. Motion starts off when the visitor requests reduced motion in their device settings. Turning motion off stops continuous animation and any hero video. No audio autoplays.

### Use your own opening footage

In `content.js`, edit the profile fields:

- `heroImages`: three image paths for the animated backdrop. Replace illustrated scenes with your real film stills.
- `heroVideo`: optional local video path, e.g. `assets/showreel.mp4`. Leave empty to use the moving stills.

For footage, upload a short, muted MP4 or WebM into assets. Keep it compact (ideally under 10 MB), export in landscape format, and test on a mobile connection. It loops muted and plays inline; failure falls back to stills. The opening footage is decorative: portfolio projects remain the place for full videos. Update the “ILLUSTRATED SCENES / PREVIEW” label in index.html when replacing sample artwork with your actual footage.

The grade comparison uses the same illustrated image with two CSS colour treatments. It is a design demonstration rather than a claimed example of Uzair’s editing. Replace both `assets/quiet.svg` images in the grade-lab section of index.html with an appropriate real still and revise the accompanying copy when ready.


## Google Drive videos

The updated site recognizes individual Google Drive video-file links in a project’s `url`. It adds a “Load Google Drive video” button and embeds the Drive preview player after the visitor chooses to load it. An “Open on Google Drive” fallback remains available. No video upload to GitHub is needed for this method.

1. Upload the video to Google Drive if it is not already there.
2. Open Share → General access → Anyone with the link → Viewer.
3. Copy the individual file link, such as `https://drive.google.com/file/d/FILE_ID/view`.
4. Paste it into that project’s `url` field in content.js, then commit the update.
5. Test the published page in a signed-out/private browser window.

Use file links, not links to a Drive folder. Upload a separate project thumbnail to assets; a Drive video link does not automatically supply a cover image. The player still depends on Drive sharing permissions, video processing, browser support, and playback limits. Test your actual video before sharing the site. This is not a guaranteed unlimited streaming service.

For the animated hero background, `heroVideo` still requires a local MP4/WebM in assets. A Drive sharing-page URL is not a direct video file and cannot be used there.

Drive help: https://support.google.com/drive/answer/2494822
Video playback help: https://support.google.com/drive/answer/2423694
