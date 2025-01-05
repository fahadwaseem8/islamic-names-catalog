# Islamic Names Catalog

A cross-platform application built with React Native and Expo that provides a comprehensive catalog of Islamic names, their meanings, and origins.

## Features

- 📱 Cross-platform support (iOS, Android, Web)
- 🌙 Dark/Light theme support with system preference detection
- 🔍 Search functionality for names
- 🎯 Filter names by gender and origin
- 📖 Detailed information for each name
- 💫 Smooth animations and transitions
- 🌐 Web-optimized interface
- 📱 Responsive design for all screen sizes

## Technologies Used

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/fahadwaseem8/islamic-names-catalog.git
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

### Running the App

- For iOS: Press `i` in the terminal or run on iOS simulator
- For Android: Press `a` in the terminal or run on Android emulator
- For Web: Press `w` in the terminal or visit `http://localhost:8081`

## Project Structure

```
islamic-names-catalog/
├── app/                    # Main application screens
│   ├── _layout.tsx        # Root layout component
│   ├── index.tsx          # Home screen
│   ├── name-list.tsx      # Names listing screen
│   ├── name-detail.tsx    # Name details screen
│   └── privacypolicy.tsx  # Privacy policy page (web only)
├── components/            # Reusable components
├── styles/               # Theme and styling
├── data/                 # Static data files
└── assets/              # Images and other static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Privacy Policy

Our privacy policy is available at `/privacypolicy` on the web version of the app. The application does not collect any personal information and functions completely offline.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Fahad Waseem - fahadwaseem8@gmail.com

Project Link: [https://github.com/fahadwaseem8/islamic-names-catalog](https://github.com/fahadwaseem8/islamic-names-catalog)

## Acknowledgments

- Thanks to all contributors who have helped with the Islamic names database
- Expo team for providing excellent development tools
- React Native community for continuous support
