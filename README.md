# starthack-2025-dardev

A modern web application built with Next.js frontend and Python FastAPI backend.

## Project Structure

```
├── frontend/    # Next.js frontend application
└── backend/     # Python FastAPI backend
```

## Technologies Used

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- React

### Backend

- Python
- FastAPI
- Prisma (Database ORM)

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- Python 3.x
- pip (Python package manager)

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on the example provided

4. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Start the backend server:

```bash
python app.py
```

The API will be available at `http://localhost:8000`

## Project Features

- User authentication and authorization
- Company management
- RESTful API endpoints
- Modern UI with responsive design
- Database integration with Prisma

## Development

### Frontend Development

- Built with Next.js 13+ featuring the new App Router
- Styled using Tailwind CSS
- TypeScript for type safety
- Component-driven development

### Backend Development

- FastAPI for high-performance API endpoints
- Prisma for database operations
- Modular architecture with controllers and services
- Dependency injection pattern

## Directory Structure Details

### Frontend

```
frontend/
├── app/           # Next.js pages and routing
├── components/    # Reusable React components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
└── public/        # Static assets
```

### Backend

```
backend/
├── controllers/   # API route handlers
├── database/      # Database configurations and models
├── services/      # Business logic layer
└── utils/         # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[Add your license here]

## Contact

[Add your contact information here]
