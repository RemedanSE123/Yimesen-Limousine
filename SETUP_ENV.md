# Environment Setup Instructions

## ⚠️ IMPORTANT: Create .env.local File

Since `.env.local` is in `.gitignore`, you need to create it manually:

### 1. Create `.env.local` file in the root directory

Create a new file named `.env.local` in `C:\Users\Remx\Desktop\car rent\`

### 2. Copy this content into `.env.local`:

```env
# Database Configuration - Neon PostgreSQL
DATABASE_URL=postgresql://neondb_owner:npg_ebDG7l2MovsF@ep-empty-wave-ahpg3lno-pooler.c-3.us-east-1.aws.neon.tech/car_rental_db?sslmode=require&channel_binding=require

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
ADMIN_SESSION_SECRET=car-rental-secret-key-2024

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Save the file

The file should be saved as `.env.local` (with the dot at the beginning)

### 4. After creating the file:

1. Run `npm install` to install dependencies
2. Run the database schema in your Neon database (copy `database/schema.sql` content)
3. Start the server with `npm run dev`
4. Login to admin dashboard at `/admin/login` with:
   - Username: `admin`
   - Password: `admin`

## Quick PowerShell Command

If you want to create it quickly via PowerShell:

```powershell
@"
# Database Configuration - Neon PostgreSQL
DATABASE_URL=postgresql://neondb_owner:npg_ebDG7l2MovsF@ep-empty-wave-ahpg3lno-pooler.c-3.us-east-1.aws.neon.tech/car_rental_db?sslmode=require&channel_binding=require

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
ADMIN_SESSION_SECRET=car-rental-secret-key-2024

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
"@ | Out-File -FilePath ".env.local" -Encoding utf8
```

Run this command in the project root directory.

