# Apex Motors

Apex Motors is my personal full-stack automotive dealership project built to showcase a premium car showroom experience with a modern React frontend and a future-ready Spring Boot backend.

This project is a solo build, created by me for my own learning, portfolio, and future expansion. It is not a group project and is designed to evolve as a personal automotive brand experience.

## Overview

The goal of this project is to build a polished dealership website that feels premium and conversion-focused. The current version includes a modern landing page with:

- vehicle inventory showcase
- dealership services section
- customer testimonials
- story/about section
- contact and inquiry forms
- responsive layout for desktop and mobile devices

## Current Status

The frontend is already implemented and running as a React + Vite application. The UI is built to look like a real premium dealership website, with mock inventory and service data used for presentation.

The next phase is to connect this frontend to a backend built in IntelliJ using Spring Boot. The app is structured so that it can later fetch real vehicle data, reviews, and customer inquiry data from a proper API.

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Lucide React icons

### Backend (planned)
- Java
- Spring Boot
- IntelliJ IDEA
- REST APIs

### Database (planned)
I am considering either:

- Supabase (PostgreSQL-based)
- MongoDB

Both are good options depending on the final architecture. Supabase is a clean choice for structured dealership data such as vehicles, customers, and inquiries, while MongoDB is a good option for flexible document-based data and future scalability.

## Project Structure

```text
ApexMotors/
├── frontend/
│   ├── components/
│   ├── data/
│   ├── services/
│   ├── styles.css
│   ├── App.jsx
│   ├── main.jsx
│   └── package.json
├── README.md
├── .gitignore
└── (future backend folder to be added in IntelliJ / Spring Boot)
```

## Features Planned

- Premium home page with hero section and dealership branding
- Inventory browsing with vehicle categories
- Vehicle detail cards with specifications
- Reviews/testimonials section
- Test-drive and inquiry form handling
- Contact information and dealership location details
- Spring Boot API integration for all dealership data
- Database-backed vehicle and customer records

## Local Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Then open the local URL shown by Vite in the browser.

## Environment Variable

The frontend is prepared to connect to a backend using a configurable API base URL. If a backend is added later, set:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

## Future Backend Ideas

The backend will likely expose endpoints such as:

- GET /api/vehicles
- GET /api/reviews
- POST /api/inquiries
- POST /api/test-drive-requests
- GET /api/services

These endpoints will be implemented in Spring Boot and connected to the chosen database system.

## Personal Note

This is my own project and my own vision. I am building it step by step to sharpen my frontend, backend, and full-stack development skills. The long-term goal is to turn it into a real-world dealership application with a scalable backend and a reliable database architecture.

## GitHub / Repository

This project is intended to be tracked as a personal repository on GitHub. Once I am ready to publish it, I can push this work to my own GitHub profile and continue developing it as a standalone project.
