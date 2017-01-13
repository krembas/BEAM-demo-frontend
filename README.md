# Sample frotnend project

## Requirements

* node.js 6.x
* npm
* ruby
* compass

## Development

Install dependencies:

```bash
cd project
npm install
```
Run webpack development server:

```bash
npm run develop
```

Run script and open your browser at `http://localhost:8090`.

### Configuration

Application uses environment variables located in 'project/.env':

* `API_URL`: REST Api absolute url

## Deployment

Install dependencies:

```bash
cd project
npm install
```

Run webpack build:

```bash
npm run build
```

Script builds application into `project/dist/` path.
