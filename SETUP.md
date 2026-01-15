# Atmos Weather App - Setup Guide

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A modern web browser

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/Nafiz001/atmos-ts.git
cd atmos
```

**2. Install dependencies:**
```bash
npm install
```

**3. Get your WeatherAPI.com API key:**
- Sign up at [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)
- Copy your API key from the dashboard

**4. Configure your API key:**
```bash
# Copy the example config
cp src/config.example.ts src/config.ts
```

Edit `src/config.ts` and add your API key:
```typescript
export const config = {
  weatherApiKey: 'your-actual-api-key-here',
} as const;
```

⚠️ **Important:** `src/config.ts` is gitignored to keep your API key secure!

**5. Build and run:**
```bash
npm run build
npm run serve
```

Open http://localhost:3000 in your browser.

## ✨ Features

### 🔍 Dynamic City Search (NEW!)
- **Live API-based autocomplete** - Real-time city suggestions as you type
- **Global coverage** - Search cities from around the world
- **Smart suggestions** - Shows city name, region, and country
- **Keyboard navigation** - Use arrow keys and Enter to select

### 🌤️ Weather Information
- Current temperature with °C/°F toggle
- Feels like temperature
- Humidity and wind speed
- Weather condition with icon
- City and country information

### 🎨 UI Features
- Dark/Light theme toggle
- Responsive design (mobile & desktop)
- Smooth animations
- LocalStorage for preferences
- Clean, modern interface

## 🔧 Development

**Watch mode** (auto-recompile on changes):
```bash
npm run watch
```

**Manual build:**
```bash
npm run build
```

## 📡 API Integration

This app uses **WeatherAPI.com** which provides:

### Endpoints Used

1. **Search/Autocomplete API** (`/v1/search.json`)
   - Real-time city search suggestions
   - Returns city name, region, country, coordinates
   - Triggered when typing 2+ characters
   - Debounced to avoid excessive API calls

2. **Current Weather API** (`/v1/current.json`)
   - Real-time weather data
   - Temperature, humidity, wind speed
   - Weather conditions and icons

### API Benefits
- ✅ 1 million free calls per month
- ✅ No credit card required
- ✅ Real-time data updates
- ✅ Global coverage

## 🛠️ Troubleshooting

**No autocomplete suggestions?**
- Type at least 2 characters
- Check internet connection
- Verify API key in `src/config.ts`

**City not found?**
- Try selecting from autocomplete suggestions
- Check spelling
- Try adding more specific location details

**API key errors?**
- Ensure `src/config.ts` exists (copy from `config.example.ts`)
- Verify key is correct
- Rebuild: `npm run build`

**Build errors?**
- Delete `node_modules` and `dist` folders
- Run `npm install` again
- Run `npm run build`

## 📂 Project Structure

```
atmos/
├── src/
│   ├── config.example.ts      # Example config (safe to commit)
│   ├── config.ts              # Your config (NEVER commit!)
│   ├── main.ts                # App entry point
│   ├── types/weather.ts       # TypeScript types
│   ├── services/
│   │   └── weatherService.ts  # Weather & search API
│   ├── components/
│   │   ├── WeatherCard.ts     # Weather display
│   │   └── Autocomplete.ts    # Dynamic search
│   ├── utils/                 # Helper functions
│   └── data/cities.ts         # Fallback city list
├── dist/                      # Compiled JS (auto-generated)
├── index.html
├── style.css
└── package.json
```

## 🔒 Security

**Best Practices:**
- ✅ API key stored in `src/config.ts` (gitignored)
- ✅ Example config provided for setup
- ✅ Never commit actual API keys
- ⚠️ For production: Use backend proxy with environment variables

**If you accidentally commit your API key:**
1. Regenerate it at WeatherAPI.com
2. Update `src/config.ts`
3. Remove from git history
4. Push the fix

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 12+, Chrome Android)

## 📝 License

MIT License - Free to use for learning and personal projects

## 🙏 Credits

- Weather data: [WeatherAPI.com](https://www.weatherapi.com/)
- Built with: Vanilla TypeScript (no frameworks!)
- Icons: WeatherAPI.com weather icons
