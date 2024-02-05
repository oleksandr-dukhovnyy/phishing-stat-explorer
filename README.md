# Phishing stat explorer

Here is an interface built on top of the [Phishstats API](https://phishstats.info).<br />
This application facilitates searching the Phishstats phishing incidents database.<br />
You can input various details, such as the IP or URL of a resource, to retrieve relevant information. For instance, the data includes details like the country, region, city, latitude, longitude, ASN (Autonomous System Number), ISP (Internet Service Provider), and more associated with the specified resource.<br />
Explore and analyze phishing incidents with ease using this application.

[Live](https://oleksandr-dukhovnyy.github.io/phishing-stat-explorer/)

## Project Setup

```sh
git clone <repo>

cd ./phishing-detector

npm ci
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
