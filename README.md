# Newton School – Placement Fast Lane

## Overview
Newton School – Placement Fast Lane is a product case study and demo platform designed to showcase innovative features that accelerate student placements. The project demonstrates how gamification, readiness scoring, peer pods, and data-driven motivation can transform online learning into a true placement engine.

## Features
- **Readiness Score Dashboard:** Unified metric combining resume, GitHub, mocks, and coins to signal job readiness.
- **Coin Motivation System:** Earn coins for consistent prep, peer reviews, and project submissions.
- **Skill-Matched Peer Pods:** Auto-generated groups for collaborative learning and accountability.
- **Daily Prep Tracker:** Structured daily questions and streaks to build consistent habits.
- **Client Preferences Visualization:** Data-driven insights into recruiter priorities.
- **Professional, Responsive UI:** Built with React, Tailwind CSS, and Chart.js.

## Tech Stack
- **Frontend:** React (TypeScript), Vite
- **Styling:** Tailwind CSS
- **Charts:** Chart.js, react-chartjs-2
- **Component Library:** Custom UI components (Radix UI, shadcn)

## Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/anishguruvelli/newton-school-placement-fastlane.git
   cd newton-school-placement-fastlane
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Folder Structure
```
newton-school-placement-fastlane/
├── public/                # Static assets (images, favicon, etc.)
├── src/
│   ├── components/        # UI components (accordion, button, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Main pages (Index, NotFound)
│   ├── App.tsx            # App root
│   ├── content.json       # All product/case study content (editable)
│   └── main.tsx           # Entry point
├── index.html             # Main HTML template
├── tailwind.config.ts     # Tailwind CSS config
├── package.json           # Project metadata and scripts
└── README.md              # This file
```

## Customization
- **Content:** All product copy, case study details, and chart data are in `src/content.json` for easy editing.
- **UI:** Components are modular and can be extended or replaced as needed.
- **Branding:** Update `index.html` and `public/` assets for your own branding.

## Deployment
- Static build via Vite: `npm run build` (output in `dist/`)
- Deploy to GitHub Pages or any static hosting provider.

## License
This project is for educational and demonstration purposes.

---
For questions or collaboration, connect on [LinkedIn](https://www.linkedin.com/in/anishguruvelli/). 