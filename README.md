## AlgaSensors Client

![Angular](https://img.shields.io/badge/Angular-21.0.0-DD0031?logo=angular&logoColor=white)
![Spartan](https://img.shields.io/badge/Spartan-0.0.1--alpha.566-000000?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkw0IDZWMTJDNCAxNi40MiA3LjU4IDIwIDEyIDIwQzE2LjQyIDIwIDIwIDE2LjQyIDIwIDEyVjZMMTIgMloiIGZpbGw9IndoaXRlIi8+PC9zdmc+&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.12-06B6D4?logo=tailwindcss&logoColor=white)

Angular-based web dashboard for real-time temperature monitoring and sensor management.

## Running

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Load environment variables:
   ```bash
   set -a; source .env.dev; set +a
   ```
   (Works in bash/zsh)

3. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

The application will be available at `http://localhost:4200`.

### Docker Compose

Start via docker-compose from the root directory:

```bash
docker-compose up algasensors-client -d
```

Access the application at `http://localhost`.

## Environment

Key environment variables:

- `MANAGER_URL` - Manager API URL (default: `http://localhost:8080` for dev, `http://algasensors-manager:8080` for docker)
- `MONITOR_URL` - Monitor API URL (for development integration)

## Building

Build for production:

```bash
npm run build:prod
```

Build artifacts are stored in the `dist/` directory.

## Related Services

- [Manager Service](../manager/README.md) - Device management API
- [Monitor Service](../monitor/README.md) - Temperature monitoring API
- [Processor Service](../processor/README.md) - Data processing

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
