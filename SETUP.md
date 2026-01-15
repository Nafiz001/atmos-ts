# Atmos Weather App - Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A modern web browser

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd atmos
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Get Your OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to your API keys section
4. Copy your API key

### 4. Configure the API Key

Open `src/services/weatherService.ts` and replace the placeholder:

```typescript
const API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  API_KEY: 'YOUR_API_KEY_HERE', // Replace with your actual API key
  DEFAULT_UNITS: 'metric',
} as const;
```

### 5. Build the Project

```bash
npm run build
```

This compiles TypeScript files from `src/` to JavaScript in `dist/`.

### 6. Serve the Application

Option A: Using npm serve (recommended)
```bash
npm run serve
```

Option B: Using Python's built-in server
```bash
python -m http.server 8000
```

Option C: Using VS Code Live Server extension
- Install "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

### 7. Open in Browser

Navigate to:
- `http://localhost:3000` (if using npm serve)
- `http://localhost:8000` (if using Python server)
- Or the port shown by your server

## Development

### Watch Mode

To automatically recompile TypeScript on changes:

```bash
npm run watch
```

Keep this running in one terminal while developing.

## Features to Try

1. **Search for Weather**: Enter any city name and press Search
2. **Toggle Temperature Units**: Click "Switch to °F/°C" button
3. **Change Theme**: Click the moon/sun icon to toggle dark/light mode
4. **Persistent Settings**: Your last search and preferences are saved

## Troubleshooting

### API Key Issues

If you see "API key not configured":
- Make sure you replaced `YOUR_API_KEY_HERE` with your actual key
- Rebuild the project: `npm run build`

### City Not Found

- Check spelling of city name
- Try adding country code: "London,UK"
- Some smaller cities may not be in the database

### Network Errors

- Check your internet connection
- Verify the API key is valid
- Check if you've exceeded the free tier limit (60 calls/minute)

## Project Structure

```
atmos/
├── index.html              # Main HTML file
├── style.css               # All CSS styles
├── package.json            # Project configuration
├── tsconfig.json           # TypeScript configuration
├── src/                    # TypeScript source files
│   ├── main.ts            # Application entry point
│   ├── types/             # TypeScript type definitions
│   ├── services/          # API service layer
│   ├── components/        # UI components
│   └── utils/             # Utility functions
└── dist/                  # Compiled JavaScript (generated)
```

## Browser Compatibility

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android latest

## License

MIT License - Feel free to use this project for learning and personal use.
