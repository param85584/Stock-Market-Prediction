# MongoDB SSL Fix for Vercel

## Update Vercel Environment Variable

Replace your `MONGODB_URI` in Vercel with this connection string:

```
mongodb+srv://paramjitwebdev:rhDXva7nGlY6cA7s@cluster0.q0zedjv.mongodb.net/fullstack-app?retryWrites=true&w=majority&authSource=admin&ssl=false
```

## If that doesn't work, try this alternative:

```
mongodb://paramjitwebdev:rhDXva7nGlY6cA7s@cluster0.q0zedjv.mongodb.net:27017/fullstack-app?ssl=true&authSource=admin
```

## Last resort - Use connection string without SSL:

```
mongodb+srv://paramjitwebdev:rhDXva7nGlY6cA7s@cluster0.q0zedjv.mongodb.net/fullstack-app?authSource=admin
```

The SSL error suggests MongoDB Atlas SSL configuration conflicts with Vercel's environment.