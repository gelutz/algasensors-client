# AlgaSensors Client

![Angular](https://img.shields.io/badge/Angular-21.0.0-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)

Angular web dashboard for AlgaSensors. Provides a user interface for managing sensors, viewing temperature data, and configuring alerts.

## Running

### Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   ng serve
   ```

The application will be available at `http://localhost:4200`.

### Docker Compose

Start via docker-compose from the root directory:

```bash
docker-compose up algasensors-client -d
```

The application will be available at `http://localhost:80`.

## Building

To build the project for production:

```bash
ng build
```

Build artifacts are stored in the `dist/` directory.

## Related Services

- [Manager Service](../manager/README.md) - Device management API
- [Monitor Service](../monitor/README.md) - Temperature monitoring API
- [Processor Service](../processor/README.md) - Data processing
- [Seeder Service](../seeder/README.md) - Mock data generator
