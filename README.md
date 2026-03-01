wedding-website/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx                → Home
│   ├── story/
│   │   └── page.tsx
│   ├── events/
│   │   └── page.tsx
│   ├── gallery/
│   │   └── page.tsx
│   ├── rsvp/
│   │   └── page.tsx
│   ├── travel/
│   │   └── page.tsx
│   ├── gifts/
│   │   └── page.tsx
│   └── api/
│       └── rsvp/route.ts       → RSVP backend
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Countdown.tsx
│   │   ├── LoveStory.tsx
│   │   ├── EventTimeline.tsx
│   │   ├── GalleryGrid.tsx
│   │   └── RSVPForm.tsx
│
├── lib/
│   ├── metadata.ts
│   ├── utils.ts
│   └── db.ts (if using DB)
│
├── public/
│   ├── images/
│   ├── fonts/
│   └── og-image.jpg
│
├── styles/
│   └── globals.css
│
└── types/
    └── index.ts

    1️⃣ Home Page (/)

Goal: Emotional + Visual impact

Sections:
	•	Hero (Couple name + Date)
	•	Countdown timer
	•	Short love story preview
	•	Event preview
	•	CTA → RSVP

    2️⃣ Story Page (/story)
	•	Timeline style layout
	•	How they met
	•	Proposal
	•	Engagement
	•	Photos between sections

    3️⃣ Events Page (/events)
	•	Ceremony details
	•	Reception details
	•	Map embed
	•	Dress code
	•	Schedule timeline
4️⃣ Gallery Page (/gallery)
	•	Masonry layout
	•	Lightbox modal
	•	Lazy loaded images
	•	Optimized <Image />

5️⃣ RSVP Page (/rsvp)
	•	Name
	•	Email
	•	Number of guests
	•	Meal preference
	•	Submit → API route

You can connect this to:
	•	PostgreSQL (since you already use it)
	•	Or simple Google Sheets API

6️⃣ Travel Page (/travel)
	•	Hotel suggestions
	•	Airport info
	•	Map
	•	Local attractions
