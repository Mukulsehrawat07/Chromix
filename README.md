# Chromix | Color Scheme Generator

A simple, interactive web tool that generates beautiful color schemes from any seed color. Pick a color, choose a scheme mode, and instantly explore harmonious palettes while copying hex codes effortlessly.

## Features

- 🎨 **Multiple Color Scheme Modes**: Generate palettes using different color theory approaches
  - Monochrome
  - Monochrome Dark
  - Monochrome Light
  - Analogic
  - Complement
  - Analogic Complement
  - Triad
- 🎯 **Easy to Use**: Simple, intuitive interface with a color picker and dropdown selector
- 💾 **Copy Hex Codes**: Click any color to copy its hex value
- ⚡ **Instant Generation**: Real-time palette generation powered by The Color API
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Live Demo

🚀 **Try it now**: [https://chromix-mk.netlify.app/](https://chromix-mk.netlify.app/)

## How to Use

1. **Pick a Seed Color**: Use the color picker input to select your base color
2. **Choose a Scheme Mode**: Select a color harmony mode from the dropdown
3. **Generate Palette**: Click "Get Color Scheme" to generate 6 complementary colors
4. **Copy Colors**: Click on any color box to copy its hex value to your clipboard

## Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Styling and responsive design
- **JavaScript** - Dynamic functionality and API integration
- **[The Color API](https://www.thecolorapi.com)** - Color scheme generation

## Project Structure

```
Chromix/
├── index.html      # Main HTML file with form and UI
├── index.css       # Styling and layout
├── index.js        # JavaScript logic and API integration
└── README.md       # This file
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/chromix.git
   cd chromix
   ```

2. Open `index.html` in your web browser or serve it with a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. Visit `http://localhost:8000` in your browser and start generating color schemes!

## API Reference

This project uses **The Color API** to generate color schemes. The API endpoint called:
```
https://www.thecolorapi.com/scheme?hex={seedColor}&mode={colorSchemeMode}&count=6
```

For more information, visit [thecolorapi.com](https://www.thecolorapi.com)

## Author

**Mukul Sehrawat** - © 2026

## License

Feel free to use this project for personal and commercial purposes.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests to help improve Chromix.
