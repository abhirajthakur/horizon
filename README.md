## Horizon

Horizon is a modern banking platform for everyone

### Preview

![Screenshot (1)](https://github.com/abhirajthakur/horizon/assets/72484943/1de56be8-2922-40ff-82b8-0a499b46a759)
![Screenshot (2)](https://github.com/abhirajthakur/horizon/assets/72484943/aaf29b03-9e04-4733-86ba-319a9107b5bc)
![Screenshot (3)](https://github.com/abhirajthakur/horizon/assets/72484943/f4138e67-4f79-4429-9e83-556ed1820bd4)
![Screenshot (4)](https://github.com/abhirajthakur/horizon/assets/72484943/414dbe53-844f-42c3-9010-de5dc4f73cdd)
![Screenshot (5)](https://github.com/abhirajthakur/horizon/assets/72484943/59f37a54-0803-45b8-9c86-8388d04d9448)
![Screenshot (6)](https://github.com/abhirajthakur/horizon/assets/72484943/fcac566e-414d-4d56-aa71-a94e2c07463b)
![Screenshot (7)](https://github.com/abhirajthakur/horizon/assets/72484943/b9c475ed-0a9d-4a10-ba62-9f20b153bbc7)

You can visit the site by visiting this link [https://horizon-three-gamma.vercel.app](https://horizon-three-gamma.vercel.app)

### Technologies Used:

- Next.js - Frontend framework
- Typescript as the language
- Prisma - ORM
- Postgres - Database for storing the user's data
- Tailwind CSS - Styling framework
- zod - Input validation, type inference for the frontend types
- NextAuth - Authentication
- Plaid - connecting user's bank accounts
- Chart.js - JavaScript charting library
- shadcn - Beautifully designed components

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/abhirajthakur/horizon
```

### 2. Navigate to the project directory:

```bash
cd horizon
```

### 3. Get Database (Prisma), Dwolla and Plaid keys,

- Get your connection url from [Neon](https://neon.tech/) or [Aiven](https://aiven.io/).
- Get your Plaid client id and secret from [Plaid dashboard](https://dashboard.plaid.com/signin).
- Get your Dwolla key and secret from [Dwolla Account](https://accounts-sandbox.dwolla.com).

### 4. Create a .env file based on the .env.example file and configure the given content

```bash
# Prisma
DATABASE_URL="postgres://avnadmin:password@host/db" # Replace with the url you got back from Neon or Aiven

# Next Auth
AUTH_SECRET= # Enter next auth secret here
AUTH_TRUST_HOST=http://localhost:3000

# Plaid
PLAID_CLIENT_ID= # Enter your plaid client id here
PLAID_SECRET= # Enter your plaid client id here
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions,identity
PLAID_COUNTRY_CODES=US

# Dwolla
DWOLLA_KEY= # Enter your dwolla key here
DWOLLA_SECRET= # Enter your dwolla secret here
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox

```

### 5. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install

```

### 6. Run database migrations:

```bash
npm run prisma:migrate
# or
yarn run prisma:migrate
# or
pnpm run prisma:migrate
# or
bun run prisma:migrate

```

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Access the aplication in your browser at `http://localhost:3000`
