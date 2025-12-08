
# Movie Browser - React + TypeScript + Vite

A simple movie browser application built with React, TypeScript, and Vite, using the OMDb API.

## Features

- Search movies by title
- View movie details including poster, year, genre, runtime, director, writer, actors, plot, and ratings
- Animated poster and year digits
- Mobile-friendly layout with interactive poster expansion
- Smooth transitions and hover effects

## Tech Stack

- React 19
- TypeScript
- Vite 5
- Redux Toolkit for state management
- Tailwind CSS for styling
- GSAP for animations
- OMDb API for movie data


## Folder Structure

```
src/
├─ components/          # Reusable components (Poster, Movie Details, Search Item, etc.)
├─ redux/               # Redux slices and store
├─ pages/               # App pages (SearchPage, MovieDetailsPage)
├─ App.tsx              # App routing
├─ main.tsx             # React entry point
```

## Notes

* Pagination is included for search results.
* Animations are mobile-friendly and enhance user experience.
* Placeholder images are used when movie posters are missing.

