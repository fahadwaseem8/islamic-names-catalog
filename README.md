# Islamic Names Catalog

A cross-platform application built with React Native and Expo that provides a comprehensive catalog of Islamic names and their meanings.

## Download

### Official Release
[![Get it on Google Play](https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white)](https://play.google.com/store/apps/details?id=com.fahadw9.islamicnamescatalog)

Download the official app from Google Play Store: [Islamic Names Catalog](https://play.google.com/store/apps/details?id=com.fahadw9.islamicnamescatalog)

### Testing Builds
For testing the latest features, download APK files from the [Releases](https://github.com/fahadwaseem8/islamic-names-catalog/releases) tab. Each commit to the `main` branch automatically generates a new Android APK build.

## Features

- 📱 Cross-platform support (iOS, Android, Web)
- 🌙 Dark/Light theme support with system preference detection
- 🔍 Search functionality for names
- 🎯 Filter names by gender
- 📖 Detailed information for each name
- 💫 Smooth animations and transitions
- 🌐 Web-optimized interface
- 📱 Responsive design for all screen sizes

## Technologies Used

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- TypeScript

## Development

### Prerequisites

- Node.js v22 or newer
- npm (package manager)

### Setup

1. Clone the repository

   ```bash
   git clone https://github.com/fahadwaseem8/islamic-names-catalog.git
   cd islamic-names-catalog
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

## Project Structure

```
islamic-names-catalog/
├── app/                    # Main application screens
│   ├── _layout.tsx        # Root layout component
│   ├── index.tsx          # Home screen
│   ├── name-list.tsx      # Names listing screen
│   └── name-detail.tsx    # Name details screen
├── components/            # Reusable components
│   ├── NameCard.tsx      # Name card component
│   └── NameDetailCard.tsx # Name detail card component
├── styles/               # Theme and styling
├── data/                 # Static data files
├── assets/              # Images and other static assets
└── .github/workflows/   # CI/CD automation
```

## CI/CD

This project uses GitHub Actions for continuous integration and deployment:
- **Automatic Builds**: Every commit to the `main` branch triggers an Android APK build
- **Release Publishing**: Built APKs are automatically published to the [Releases](https://github.com/fahadwaseem8/islamic-names-catalog/releases) tab
- **Version Management**: Each build is tagged and versioned automatically

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Privacy Policy

The application does not collect any personal information and functions completely offline. All data is stored locally on your device.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Fahad Waseem - fahadwaseem8@gmail.com

Project Link: [https://github.com/fahadwaseem8/islamic-names-catalog](https://github.com/fahadwaseem8/islamic-names-catalog)

## Acknowledgments

- Thanks to all contributors who have helped with the Islamic names database
- Expo team for providing excellent development tools
- React Native community for continuous support
