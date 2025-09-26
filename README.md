# Random Movie 🎬

<div align="center">
  <img src="public/apple-touch-icon.png" alt="Random Movie Logo" width="128" height="128">
  
  **Discover your next favorite movie with Random Movie!**
  
  A modern Vue 3 application that helps you find random movies to watch, built with TypeScript and modern web technologies.
</div>

## ✨ Features

- 🎲 **Random Movie Discovery** - Find new movies to watch with intelligent randomization
- 🌍 **Multi-language Support** - Available in multiple languages with Vue i18n
- 🎬 **Movie Details** - View comprehensive movie information and trailers
- 🔍 **Advanced Filters** - Filter movies by genre, year, rating, and more
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Internationalization**: Vue i18n
- **HTTP Client**: Axios
- **Styling**: SCSS

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd random-movie
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## 📁 Project Structure

```
random-movie/
├── public/                 # Static assets
├── src/
│   ├── api/               # API endpoints and configurations
│   ├── assets/            # Application assets (styles, images)
│   ├── components/        # Vue components
│   │   ├── app/          # App-level components
│   │   └── movie/        # Movie-related components
│   ├── composables/       # Vue composables
│   ├── layouts/           # Layout components
│   ├── locales/           # Internationalization files
│   ├── plugins/           # Vue plugins
│   ├── services/          # Business logic services
│   ├── stores/            # Pinia stores
│   ├── ts/                # TypeScript definitions
│   ├── utils/             # Utility functions
│   └── views/             # Page components
├── index.html
├── package.json
└── vite.config.ts
```

## 🌐 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
