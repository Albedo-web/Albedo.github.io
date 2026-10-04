// ✏️ THE ONLY FILE YOU NEED TO EDIT.
// Change any text between the "quotes", save, and the site updates.
// Keep the commas and brackets exactly where they are.

window.SITE = {
  name:  "Your Name",
  role:  "3D Generalist",          // big hero line 1 (3D comes first)
  role2: "& Motion Designer",      // big hero line 2
  about: "I model, sculpt, light, render and animate. I also design motion graphics.",

  accent: "#2b35ff",               // main color: 3D object + motion section. Try #ff4d2e or #00a676

  // Optional: your own 3D model in the hero. Put a .glb in /assets and write its path.
  // Example: "assets/model.glb"   (leave "" to keep the demo shape)
  model: "",

  skills3d:     "Modelling, sculpting, lighting, rendering and animation.",
  skillsMotion: "Motion graphics, typography and compositing.",

  email: "you@email.com",
  links: [
    { label: "ArtStation", url: "https://www.artstation.com/" },
    { label: "Instagram",  url: "https://www.instagram.com/" },
    { label: "Behance",    url: "https://www.behance.net/" }
  ],

  // type: "3d" or "motion".  media: an image (.jpg .png .webp) or a short loop (.mp4 .webm).
  // Leave media "" for a color placeholder.  link: optional page to open on click ("" = none).
  // To add a project, copy one line and paste it below. To remove one, delete its line.
  projects: [
    { type: "3d", title: "Project name", tag: "Modelling, lighting", media: "", link: "" },
    { type: "3d", title: "Project name", tag: "Sculpting, rendering", media: "", link: "" },
    { type: "3d", title: "Project name", tag: "Animation",           media: "", link: "" },
    { type: "motion", title: "Project name", tag: "Title sequence",   media: "", link: "" },
    { type: "motion", title: "Project name", tag: "Logo animation",   media: "", link: "" },
    { type: "motion", title: "Project name", tag: "Explainer",        media: "", link: "" }
  ]
};
