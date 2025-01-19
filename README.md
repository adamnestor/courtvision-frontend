# CourtVision Frontend

## Demo & Links

🔗 [Live Demo](https://courtvision-demo.com)
📝 [Backend Repository](https://github.com/yourusername/courtvision-backend)

![Dashboard Preview](./docs/assets/dashboard-preview.png)

## Project Overview

CourtVision is a full-stack web application that demonstrates modern React development practices and advanced frontend concepts. Built as a portfolio project to showcase:

- **Advanced State Management** - Implementation of complex client/server state handling
- **Security Best Practices** - Robust authentication and data protection
- **Modern React Patterns** - Custom hooks, context, and component composition
- **TypeScript** - Strong typing and type safety throughout the application
- **Performance Optimization** - Efficient data fetching and caching strategies

## Key Technical Achievements

- Implemented real-time data updates using React Query
- Built a responsive, accessible UI with TailwindCSS
- Developed a secure authentication system with JWT
- Created a modular, maintainable codebase with TypeScript
- Achieved 95+ Lighthouse performance score

A React-based dashboard for basketball statistics and predictions. Track player performance, create picks, and manage your predictions in real-time.

## Features

- 🏀 Real-time basketball statistics tracking
- 🔐 User authentication and authorization
- 📊 Admin dashboard for system monitoring
- 🎯 Pick creation and management
- 🌓 Dark/Light theme support
- 📱 Responsive design

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **State Management:**
  - React Query for server state
  - Zustand for client state
- **Routing:** React Router v7
- **Authentication:** JWT with secure token handling

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/courtvision-frontend.git
cd courtvision-frontend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api
```

4. Start the development server

```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/        # React components
│   ├── common/       # Reusable components
│   ├── features/     # Feature-specific components
│   └── layouts/      # Layout components
├── hooks/            # Custom React hooks
├── services/         # API services
├── stores/           # Zustand stores
├── types/            # TypeScript types
└── utils/            # Utility functions
```

## Security Features

- CSRF Protection
- Rate Limiting
- Secure Token Handling
- Input Validation
- XSS Prevention
- Content Security Policy
- Session Management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Documentation](https://react.dev)
- [Vite](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
