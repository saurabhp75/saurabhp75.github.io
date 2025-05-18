---
title: "RWSDK speedrun"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["rwsdk"]
draft: false
description: "RWSDK speedrun"
---

# RWSDK tutorial speedrun

## 1. Initialize the project and run dev server

```bash
npx degit redwoodjs/sdk/starters/standard applywize
cd applywize
pnpm install
pnpm dev
```

## 2. Setting up Tailwind

```bash
pnpm install tailwindcss @tailwindcss/vite
```

- Copy the contents below to `vite.config.mts`

```jsx
// vite.config.mts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { redwood } from "rwsdk/vite";

export default defineConfig({
  environments: {
    ssr: {},
  },
  plugins: [redwood(), tailwindcss()],
});
```

- Create `src/app/styles/css` file with following contents

```jsx
// src/app/styles.css
@import "tailwindcss";
```

- Add link tag to the head section in file `src/app/Document.tsx`

```tsx
// src/app/Document.tsx
import styles from "./styles.css?url";
...
<head>
  ...
  <link rel="stylesheet" href={styles} /> // <-- Add this line
  ...
</head>
```

## 3. **Setting up Custom Fonts and themes**

- Copy the contents of `src/app/styles/css` file in your project. As shown below.

```tsx
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

@import "tailwindcss";

@theme {
  --font-display: "Poppins", sans-serif;
  --font-body: "Inter", sans-serif;

  --color-bg: #e4e3d4;
  --color-border: #eeeef0;

  --color-primary: #f7b736;
  --color-secondary: #f1f1e8;
  --color-destructive: #ef533f;

  --color-tag-applied: #b1c7c0;
  --color-tag-interview: #da9b7c;
  --color-tag-new: #db9a9f;
  --color-tag-rejected: #e4e3d4;
  --color-tag-offer: #aae198;
}

```

- Change the contents of `src/app/headers.ts` as shown below. We are modifying security headers for google fonts.

```bash
import { RouteMiddleware } from "rwsdk/router";
import { IS_DEV } from "rwsdk/constants";

export const setCommonHeaders =
(): RouteMiddleware =>
({ headers, rw: { nonce } }) => {
  if (!IS_DEV) {
    // Forces browsers to always use HTTPS for a specified time period (2 years)
    headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  // Forces browser to use the declared content-type instead of trying to guess/sniff it
  headers.set("X-Content-Type-Options", "nosniff");

  // Stops browsers from sending the referring webpage URL in HTTP headers
  headers.set("Referrer-Policy", "no-referrer");

  // Explicitly disables access to specific browser features/APIs
  headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );

  // Defines trusted sources for content loading and script execution:
  headers.set(
    "Content-Security-Policy",
    `default-src 'self'; script-src 'self' 'nonce-${nonce}' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; frame-src https://challenges.cloudflare.com; object-src 'none';`
  );
};
```

## 4. Setting up Shadcn

- Initialize Shadcn in your project.

```bash
pnpx shadcn@latest init
```

- Change aliases in file `src/app/components/ui` as shown below

```json
...
"aliases": {
  "components": "@/app/components",
  "utils": "@/app/lib/utils",
  "ui": "@/app/components/ui",
  "lib": "@/app/lib",
  "hooks": "@/app/hooks"
},
```

- Add path aliases to `tsconfig.json`

```json
// tsconfig.json
{
  "compilerOptions": {
    ...
   "baseUrl": ".",  // <-- Add this line
    ...
  }
}
```

- Add resolve alias config to `vite.config.mts`

```tsx
// vite.config.mts
import path from "path"  // <--- add this line
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"
import { redwood } from "rwsdk/vite";

export default defineConfig({
  environments: {
    ssr: {},
  },
  plugins: [redwood(), tailwindcss()],
 resolve: {    // <--- Add resolve property
   alias: {
     "@": path.resolve(__dirname, "./src"),
   },
 },
)
```

- Use the command below to add following components.

```bash
pnpx shadcn@latest add
```

- Alert
- Avatar
- Badge
- Breadcrumb
- Button
- Calendar
- Dialog
- Popover
- Select
- Sheet
- Sonner
- Table

- Move `lib` folder from `src` to `src/app`
- Create `src/app/components/ui/datepicker.tsx` file as shown below

```tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
```

- In file `src/app/pages/user/Login.tsx` , replace button with Button. See code below.

```tsx
// src/app/pages/user/Login.tsx
import { Button } from "@/app/components/ui/button";
...
return (
  <>
    <h1 className="text-4xl font-bold text-red-500">YOLO</h1>
    <div ref={turnstile.ref} />
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Username"
    />
    <Button onClick={handlePerformPasskeyLogin} disabled={isPending}>
      {isPending ? <>...</> : "Login with passkey"}
    </Button>
    <Button onClick={handlePerformPasskeyRegister} disabled={isPending}>
      {isPending ? <>...</> : "Register with passkey"}
    </Button>
    {result && <div>{result}</div>}
  </>
);
```

## 5. Database setup

- Create `src/db/schema.prisma` file with following contents.

```tsx
// src/db/schema.prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
  output          = "../node_modules/.prisma/client"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Application {
  id             String            @id @default(uuid())
  userId         String
  user           User              @relation(fields: [userId], references: [id])
  status         ApplicationStatus @relation(fields: [statusId], references: [id])
  statusId       Int               @default(1)
  salaryMin      String?
  salaryMax      String?
  dateApplied    DateTime?
  jobTitle       String?
  jobDescription String?
  postingUrl     String?
  createdAt      DateTime          @default(now())
  updatedAt      DateTime?         @updatedAt
  archived       Boolean           @default(false)
  companyId      String
  company        Company           @relation(fields: [companyId], references: [id])
}

model ApplicationStatus {
  id           Int           @id @default(autoincrement())
  status       String
  applications Application[]
}

model Company {
  id           String        @id @default(uuid())
  name         String
  applications Application[]
  contacts     Contact[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime?     @updatedAt
}

model Contact {
  id        String    @id @default(uuid())
  firstName String
  lastName  String
  email     String?
  role      String?
  companyId String?
  company   Company?  @relation(fields: [companyId], references: [id])
  createdAt DateTime  @default(now())
  updatedAt DateTime? @updatedAt
}

model Credential {
  id            String   @id @default(uuid()) // Internal DB ID
  userId        String   @unique // Each user has one discoverable credential
  user          User     @relation(fields: [userId], references: [id])
  createdAt     DateTime @default(now())
  credentialId  String   @unique // WebAuthn credential identifier
  publicKey     Bytes
  counter       Int      @default(0)

  @@index([credentialId])
  @@index([userId])
}

model User {
  id                 String        @id @default(uuid())
  username           String        @unique
  createdAt          DateTime      @default(now())
  updatedAt          DateTime?     @updatedAt
  applications       Application[]
  credentials        Credential[]
}
```

- Running migrations

```bash
pnpm run migrate:new "setup all database models"
```

# Comments:

- Following error shows up.

```bash
❯ pnpm run migrate:new "setup all database models"

> @redwoodjs/starter-standard@1.0.0 migrate:new /Users/saurabh/dev/projects/applywize
> rw-scripts migrate-new 'setup all database models'

file:///Users/saurabh/dev/projects/applywize/node_modules/.pnpm/execa@9.5.3/node_modules/execa/lib/return/final-error.js:6
        return new ErrorClass(message, options);
               ^

ExecaError: Command failed with exit code 1: npx prisma migrate diff --from-local-d1 --to-schema-datamodel ./prisma/schema.prisma --script

Error: Multiple Cloudflare D1 databases found in .wrangler/state/v3/d1/miniflare-D1DatabaseObject. Please manually specify the local D1 database with `--from-url file:`, without using the `--from-local-d1` flag.
    at getFinalError (file:///Users/saurabh/dev/projects/applywize/node_modules/.pnpm/execa@9.5.3/node_modules/execa/lib/return/final-error.js:6:9)
    at makeError (file:///Users/saurabh/dev/projects/applywize/node_modules/.pnpm/execa@9.5.3/node_modules/execa/lib/return/result.js:108:16)
    at getAsyncResult (file:///Users/saurabh/dev/projects/applywize/node_modules/.pnpm/execa@9.5.3/node_modules/execa/lib/methods/main-async.js:168:4)
    at handlePromise (file:///Users/saurabh/dev/projects/applywize/node_modules/.pnpm/execa@9.5.3/node_modules/execa/lib/methods/main-async.js:151:17)
    at async migrateNew (file:///Users/saurabh/dev/projects/applywize/node_modules/.pnpm/rwsdk@0.0.83_rollup@4.40.2_typescript@5.8.3_vite@6.3.5_@types+node@22.15.18_jiti@2.4.2__b1bcd948c5b9d591e9d715f5b119f5c6/node_modules/rwsdk/dist/scripts/migrate-new.mjs:24:17) {
  shortMessage: 'Command failed with exit code 1: npx prisma migrate diff --from-local-d1 --to-schema-datamodel ./prisma/schema.prisma --script',
  command: 'npx prisma migrate diff --from-local-d1 --to-schema-datamodel ./prisma/schema.prisma --script',
  escapedCommand: 'npx prisma migrate diff --from-local-d1 --to-schema-datamodel ./prisma/schema.prisma --script',
  cwd: '/Users/saurabh/dev/projects/applywize',
  durationMs: 839.996083,
  failed: true,
  timedOut: false,
  isCanceled: false,
  isGracefullyCanceled: false,
  isTerminated: false,
  isMaxBuffer: false,
  isForcefullyTerminated: false,
  exitCode: 1,
  stdout: '',
  stderr: 'Error: Multiple Cloudflare D1 databases found in .wrangler/state/v3/d1/miniflare-D1DatabaseObject. Please manually specify the local D1 database with `--from-url file:`, without using the `--from-local-d1` flag.',
  stdio: [
    undefined,
    '',
    'Error: Multiple Cloudflare D1 databases found in .wrangler/state/v3/d1/miniflare-D1DatabaseObject. Please manually specify the local D1 database with `--from-url file:`, without using the `--from-local-d1` flag.'
  ],
  ipcOutput: [],
  pipedFrom: []
}

Node.js v22.15.1
 ELIFECYCLE  Command failed with exit code 1.
```

- As suggested by the tutorial viz. deleting the `.wrangler` folder and running `pnpm dev` and then `pnpm migrate:dev` gives following logs indicating that there are **`no migrations to apply**.`

```bash
  ❯ pnpm dev

> @redwoodjs/starter-standard@1.0.0 dev /Users/saurabh/dev/projects/applywize
> NODE_ENV=${NODE_ENV:-development} vite dev

🚀 Project has no .wrangler directory yet, assuming fresh install: running `npm run dev:init`...

> @redwoodjs/starter-standard@1.0.0 dev:init
> rw-scripts dev-init

Initializing development environment...
Generating...
Running migrations...
Seeding database...
Done!

9:37:35 PM [vite] (worker) Re-optimizing dependencies because vite config has changed
9:37:36 PM [vite] (client) Re-optimizing dependencies because vite config has changed (x2)

  VITE v6.3.5  ready in 11623 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  Debug:   http://localhost:5173/__debug
  ➜  press h + enter to show help
^C%
~/dev/projects/applywize main !2                                                 35s
❯ pnpm migrate:dev

> @redwoodjs/starter-standard@1.0.0 migrate:dev /Users/saurabh/dev/projects/applywize
> prisma generate && wrangler d1 migrations apply DB --local

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (v6.5.0) to ./node_modules/.prisma/client in 47ms

Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)

Tip: Need your database queries to be 1000x faster? Accelerate offers you that and more: https://pris.ly/tip-2-accelerate

 ⛅️ wrangler 4.15.2
-------------------

✅ No migrations to apply!
```

# Workaround

- Tried deleting the `001_init.sql` and `.wrangler` folder and re-creating migrations (pnpm dev && pnpm migrate:dev), creates migration file.

## Notes

- Creating a migration, should not require all the previous migration files (`001_init.sql`) to be deleted.

## 6. **Previewing the Migration**

- Copy the relative path of sql file under the folder `.wrangler/state/v3/d1/miniflare-D1DatabaseObject` and add following entry in your `.env` file.

```bash

WEBAUTHN_RP_ID=localhost
AUTH_SECRET_KEY=your-development-secret-key
# Optional: Enable Turnstile bot protection
# TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA

# Add the line below, the path of your sql file
DATABASE_URL=file:../.wrangler/state/v3/d1/miniflare-D1DatabaseObject/3c9b7a410a5e3e208752e4babd46de3306095336020e6da15b297e2fa03b7512.sqlite
```

## Previewing the sql file

Install `sqlite viewer` vscode plugin from [https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer) to view the contents of sql file from vscode.

## 7. Seeding the db

- Replace the contents of `src/scripts/seed.ts` file with the following code.

```tsx
import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "../db";

export default defineScript(async ({ env }) => {
  setupDb(env);

  await db.$executeRawUnsafe(`\
    DELETE FROM Application;
    DELETE FROM ApplicationStatus;
    DELETE FROM Contact;
    DELETE FROM Company;
    DELETE FROM Credential;
    DELETE FROM User;
    DELETE FROM sqlite_sequence;
  `);

  await db.applicationStatus.createMany({
    data: [
      { id: 1, status: "New" },
      { id: 2, status: "Applied" },
      { id: 3, status: "Interview" },
      { id: 4, status: "Rejected" },
      { id: 5, status: "Offer" },
    ],
  });

  console.log("🌱 Finished seeding");
});
```

- Now run the following command. Check using `npx prisma studio` that ApplicationStatus table has been populated.

```bash
pnpm run seed
```

# 8. Authentication

## 8.1 Setting up signup page

- Create `src/app/pages/user/Signup.tsx` file with following contents.

```bash
"use client";

import { useState, useTransition } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import {
  finishPasskeyRegistration,
  startPasskeyRegistration,
} from "./functions";
import { Button } from "@/app/components/ui/button";

export function Signup() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();

  const passkeyRegister = async () => {
    // 1. Get a challenge from the worker
    const options = await startPasskeyRegistration(username);

    // 2. Ask the browser to sign the challenge
    const registration = await startRegistration({ optionsJSON: options });

    // 3. Give the signed challenge to the worker to finish the registration process
    const success = await finishPasskeyRegistration(username, registration);

    if (!success) {
      setResult("Registration failed");
    } else {
      setResult("Registration successful!");
    }
  };

  const handlePerformPasskeyRegister = () => {
    startTransition(() => void passkeyRegister());
  };

  return (
    <main className="bg-bg">
      <h1 className="text-4xl font-bold text-red-500">YOLO</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <Button onClick={handlePerformPasskeyRegister} disabled={isPending}>
        {isPending ? <>...</> : "Register with passkey"}
      </Button>
      {result && <div>{result}</div>}
    </main>
  );
}
```

- Add `signup` route by modifying `src/app/pages/user/routes.ts` file as shown below.

```bash
import { route } from "rwsdk/router";
import { Login } from "./Login";
import { Signup } from "./Signup";  // <-- Add this line
import { sessions } from "@/session/store";

export const userRoutes = [
  route("/login", [Login]),
  route("/signup", [Signup]), // <-- Add this line
  route("/logout", async function ({ request }) {
    const headers = new Headers();
    await sessions.remove(request, headers);
    headers.set("Location", "/");

    return new Response(null, {
      status: 302,
      headers,
    });
  }),
];
```

- Replace the contents of `Login.tsx` file as shown below

```tsx
"use client";

import { useState, useTransition } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { finishPasskeyLogin, startPasskeyLogin } from "./functions";
import { Button } from "@/app/components/ui/button";

export function Login() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();

  const passkeyLogin = async () => {
    // 1. Get a challenge from the worker
    const options = await startPasskeyLogin();

    // 2. Ask the browser to sign the challenge
    const login = await startAuthentication({ optionsJSON: options });

    // 3. Give the signed challenge to the worker to finish the login process
    const success = await finishPasskeyLogin(login);

    if (!success) {
      setResult("Login failed");
    } else {
      setResult("Login successful!");
    }
  };

  const handlePerformPasskeyLogin = () => {
    startTransition(() => void passkeyLogin());
  };

  return (
    <main className="bg-bg">
      <h1 className="text-red-500 text-4xl font-bold">YOLO</h1>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />
      <Button onClick={handlePerformPasskeyLogin} disabled={isPending}>
        {isPending ? <>...</> : "Login with passkey"}
      </Button>
      {result && <div>{result}</div>}
    </main>
  );
}
```

- go to [http://localhost:5173/user/signup](http://localhost:5173/user/signup).
- Add a `username` and click “Register with passkey”.

# Comment

- Signup fails with an error. See screenshots below.

![Android project structure](/static/images/rwsdk/signup-error.png)
![Android project structure](/static/images/rwsdk/signup-dialog.png)
