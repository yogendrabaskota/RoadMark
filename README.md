# 🛣️ Pothole Reporter

A community-driven platform for reporting and tracking potholes to help make roads safer for everyone.

![React](https://img.shields.io/badge/React-18.2.0-blue)

![Vite](https://img.shields.io/badge/Vite-4.4.x-purple)

![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.x-38B2AC)

![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Features

- **Report Potholes**: Easy-to-use form for reporting potholes with location, size, and severity details
- **Interactive Map**: Visual representation of reported potholes with filtering options
- **User Authentication**: Secure login and registration system
- **Voting System**: Community voting on reported potholes to prioritize repairs
- **Admin Dashboard**: Management interface for authorities to track and update pothole status
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yogendrabaskota/FixMyRoadF
   cd FixMyRoadF
   ```
2. **Install dependencies**

```bash
npm install

```

3. **Start Frontend**

```bash
npm run dev
```

## 🛠️ Built With

- **React** (v18.2.0) - Frontend framework
- **Vite** (v4.4.x) - Build tool and development server
- **React Router DOM** (v6.x) - Navigation and routing
- **Tailwind CSS** (v3.3.x) - Utility-first CSS framework
- **React Leaflet** (v4.x) - Interactive maps component
- **React Icons** (v4.x) - Icon library
- **React Hook Form** (v7.x) - Form handling

## 🎨 Pages & Components

### Pages

- **Home** (`/`) - Landing page with features, statistics, and pothole listing
- **About** (`/about`) - Information about the project and mission
- **Report** (`/report`) - Form to report new potholes
- **Feedback** (`/feedback`) - User feedback and rating system
- **Contact** (`/contact`) - Contact information with interactive map
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration

### Components

- **Navbar** - Navigation header with responsive menu
- **Footer** - Site footer with links and information
- **useAuth** - Custom hook for authentication state management

## 🎨 Color Scheme

The application uses a consistent color scheme throughout:

- **Primary Blue**: `#1e40af` (blue-800)
- **Dark Blue**: `#1e3a8a` (blue-900)
- **Accent Amber**: `#f59e0b` (amber-500)
- **Background**: `#f9fafb` (gray-50)

## 🔌 API Integration

The frontend is designed to connect with a backend API. The expected endpoints include:

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| GET    | `/api/potholes`      | Fetch all potholes        |
| GET    | `/api/potholes/:id`  | Get single pothole        |
| POST   | `/api/potholes`      | Create new pothole report |
| POST   | `/api/auth/login`    | User login                |
| POST   | `/api/auth/register` | User registration         |
| POST   | `/api/feedback`      | Submit feedback           |

Update the `VITE_API_BASE_URL` in your `.env` file to point to your backend server.

## 📱 Responsive Design

The application is fully responsive with breakpoints for:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

We welcome contributions to the frontend! Please follow these steps:

1. **Fork the project**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow React best practices
- Use functional components with hooks
- Maintain consistent styling with Tailwind CSS
- Ensure responsive design for all components
- Test across different browsers and devices

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- Maps by [Leaflet](https://leafletjs.com/) and [OpenStreetMap](https://www.openstreetmap.org/)
- UI components inspired by various open source projects

## 📞 Support

If you have any questions or issues with the frontend, please contact us at:

- Email: support@potholereporter.com
- Create an issue in the GitHub repository

---

Made with ❤️ for safer roads

## Feedback

If you have any feedback, please reach out to me at yogendrabaskota18@gmail.com
