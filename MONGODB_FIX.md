# MongoDB SSL Connection Fix

## Update Vercel Environment Variables

Go to Vercel → Settings → Environment Variables and update:

### MONGODB_URI:
```
mongodb+srv://paramjitwebdev:rhDXva7nGlY6cA7s@cluster0.q0zedjv.mongodb.net/fullstack-app?retryWrites=true&w=majority&appName=Cluster0&ssl=true&tls=true&tlsAllowInvalidCertificates=false
```

## Alternative Connection String (if above doesn't work):
```
mongodb+srv://paramjitwebdev:rhDXva7nGlY6cA7s@cluster0.q0zedjv.mongodb.net/fullstack-app?retryWrites=true&w=majority&appName=Cluster0&authSource=admin&ssl=true
```

The error was: SSL/TLS connection issue between Vercel and MongoDB Atlas.
Fixed by: Adding proper SSL/TLS options to the MongoDB client.