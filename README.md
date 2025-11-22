# Inventra - Inventory Management System

A full-stack inventory management application built with Flask and Next.js.

## Features

- User authentication (signup/login)
- Product management with categories
- Stock tracking and movements
- Warehouse management
- Receipts and deliveries
- Internal transfers
- Inventory adjustments
- Low stock alerts
- Dashboard analytics

## Tech Stack

**Backend:** Flask, SQLite, JWT
**Frontend:** Next.js 14, TypeScript, Tailwind CSS, Radix UI

## Deployment

- **Frontend:** Vercel (root: `inventra-frontend`)
- **Backend:** Railway (root: `backend`)

### Environment Variables

Frontend:
```
NEXT_PUBLIC_API_URL=<railway-backend-url>
```

## API Endpoints

- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/products` - Products
- `GET /api/dashboard` - Stats
- `GET /api/categories` - Categories
- `GET /api/warehouses` - Warehouses
- `GET /api/alerts` - Alerts

## Local Development

```bash
# Backend
cd backend && pip install -r requirements.txt && python app.py

# Frontend
cd inventra-frontend && pnpm install && pnpm dev
```

## License

MIT
