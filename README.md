# Nivin J K — Full Stack Developer Portfolio

A responsive, single-page portfolio built with React and Vite. It presents Nivin's experience, selected products, technical skills, education, and contact options in a dark emerald interface with a persistent light theme option.

## Stack

- React + Vite
- CSS with responsive layouts, reduced-motion support, and theme tokens
- EmailJS REST API for the optional contact form
- Vercel hosting

No extra runtime dependencies are needed beyond the packages already in `package.json`.

## Local development

```sh
npm install
npm run dev
```

## Contact form configuration

Copy `.env.example` to `.env.local` and fill in the public values from your EmailJS account:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Configure the EmailJS template to use `from_name`, `reply_to`, and `message`. The public key is intended for browser use; never put a private key in a `VITE_` variable. Without all three values, the form clearly directs visitors to the email address instead of claiming a message was sent.

Add the same three variables in the Vercel project settings before deploying.

## Build and preview

```sh
npm run lint
npm run build
npm run preview
```

## Deploy to Vercel

Import the repository into Vercel and keep the framework preset as Vite. Vercel detects the build command (`npm run build`) and output folder (`dist`). `vercel.json` includes long-lived caching for the versioned resume asset. Update `public/robots.txt` and `public/sitemap.xml` to your assigned domain after deployment.

## Content updates

- **Projects and experience:** edit the data arrays near the top of `src/App.jsx`. Only add live demo links when a real URL is available.
- **Certificates:** replace the honest empty-state card in the certifications section when verified certificates are supplied.
- **Profile photo:** the hero currently uses an original CSS illustration, so no portrait asset is required. Add a centrally referenced image only when a photo is available.
- **Resume:** replace `public/resume/nivin-jk-resume.pdf`; the hero download points to that path.
- **Theme and styling:** design tokens live in `src/index.css`; layout and responsive styles live in `src/App.css`.

## Analytics

Vercel Analytics is not enabled in this source yet. Enable it from the Vercel project dashboard or add the official `@vercel/analytics` package and `<Analytics />` component when the project is connected to Vercel.
