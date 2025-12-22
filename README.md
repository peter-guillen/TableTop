# TableTop

# Global

[x] Fix issue with Logout
[] Create conditionals for what a user can view
[] Remove the Role on register page when finished testing
[] Add a delete confirmation modal in articles and other crud files
[] Create a user panel for hovering over user icon

# Portfolio

[] Demo video of RBAC + CRUD
[] Demo video of AUTH (discussing JWT & cookies)
[] Demo video of drag and drop - displaying realtime changes to the player stats
[] Demo video of dice rolling
[] Demo video of search, filter and sort

# Article Fixes

[] Fix CSS of ArticleCard to ensure they all remain the same size
[] Add a cleaner response to articleCreate when a user fails to fill in inputs
[] Create a form template for articles create and edit - this could also apply to spells, armors etc.
[] Add better naviagtion to adminArticleDetails, when clicking back it doesn't return to home
[] Consolidate the create and edit form

# Tabletop

A custom TTRPG web application built as a full-stack portfolio project, featuring a comprehensive magic system and game mechanics tied to an original fantasy novel universe.

## Overview

Tabletop is a web-based tabletop RPG management system that allows users to browse and explore custom spells, weapons, and armor from a unique fantasy setting. The platform includes full CRUD operations for administrators and a read-only library experience for standard users.

## Features

- **Spell Library** - Browse and search through custom spells with detailed descriptions
- **Weapons & Armor Catalogs** - Explore equipment with full statistics and lore
- **Admin Panel** - Complete CRUD operations for game content management
- **User Authentication** - Secure JWT-based authentication with session cookies
- **Dark/Light Theme** - Theme preference stored via cookies

### Planned Features

- Character creation and management
- Campaign management tools
- Additional game mechanics implementation

## Tech Stack

### Frontend

- **React** with Vite
- **Tailwind CSS** for styling
- **Feature-driven architecture** for scalability
- Theme management via cookies

### Backend

- **Node.js** with Express
- **MongoDB** with Mongoose
- **MVC architecture**
- **JWT** authentication
- **Session cookies** for auth persistence

### Deployment

- **MongoDB Atlas** for database hosting
- **Netlify** for frontend deployment
- **Railway** for backend deployment

## Project Structure

```
src/
├── app/
│   ├── contexts/
│   ├── pages/
│   ├── layouts/
│   └── routes/
├── features/
│   ├── admin/
│   ├── articles/
│   ├── armors/
│   ├── weapons/
│   └── spells/
│       ├── api/
│       ├── contexts/
│       └── pages/
│           ├── spellForm/
│           ├── spellPreview/
│           └── SpellPage/
└── shared/
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/tabletop.git
cd tabletop
```

2. Install dependencies for both frontend and backend

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PEPPER=your_pepper_value
```

4. Start the development servers

```bash
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory)
npm run dev
```

The application should now be running on `http://localhost:5173` (frontend) and `http://localhost:5000` (backend).

## API Documentation

### Authentication Endpoints

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/auth/register` | Register new user | No            |
| POST   | `/api/auth/login`    | Login user        | No            |
| POST   | `/api/auth/logout`   | Logout user       | Yes           |
| GET    | `/api/auth/me`       | Get current user  | Yes           |

### Spells Endpoints

| Method | Endpoint          | Description      | Auth Required |
| ------ | ----------------- | ---------------- | ------------- |
| GET    | `/api/spells`     | Get all spells   | No            |
| GET    | `/api/spells/:id` | Get single spell | No            |
| POST   | `/api/spells`     | Create spell     | Admin         |
| PUT    | `/api/spells/:id` | Update spell     | Admin         |
| DELETE | `/api/spells/:id` | Delete spell     | Admin         |

### Weapons Endpoints

| Method | Endpoint           | Description       | Auth Required |
| ------ | ------------------ | ----------------- | ------------- |
| GET    | `/api/weapons`     | Get all weapons   | No            |
| GET    | `/api/weapons/:id` | Get single weapon | No            |
| POST   | `/api/weapons`     | Create weapon     | Admin         |
| PUT    | `/api/weapons/:id` | Update weapon     | Admin         |
| DELETE | `/api/weapons/:id` | Delete weapon     | Admin         |

### Armors Endpoints

| Method | Endpoint          | Description      | Auth Required |
| ------ | ----------------- | ---------------- | ------------- |
| GET    | `/api/armors`     | Get all armors   | No            |
| GET    | `/api/armors/:id` | Get single armor | No            |
| POST   | `/api/armors`     | Create armor     | Admin         |
| PUT    | `/api/armors/:id` | Update armor     | Admin         |
| DELETE | `/api/armors/:id` | Delete armor     | Admin         |

## User Roles

- **Admin** - Full CRUD access to all game content
- **User** - Read-only access to browse spells, weapons, and armor

## Development Status

Currently in active development with plans for production deployment. The core CRUD functionality and authentication system are complete. Future updates will include character creation and campaign management features.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Screenshots

_Screenshots will be added here_

## Contact

For questions or feedback, please open an issue on GitHub.

## License

License to be determined.

---

**Note:** This project is a portfolio piece demonstrating full-stack development capabilities with the MERN stack, implementing authentication, authorization, and CRUD operations in a feature-driven architecture.
