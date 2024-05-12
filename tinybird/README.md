# Tinybird project

This folder contains all of the resources to build the Tinybird project for this demo.

## Project structure

This project contains:

```bash
├── datasources
│   └── analytics_events.datasource
├── pipes
│   ├── analytics_pages.pipe
│   ├── analytics_sessions.pipe
│   ├── analytics_sources.pipe
│   ├── analytics_hits.pipe
│   ├── kpis.pipe
│   ├── top_browsers.pipe
│   ├── top_devices.pipe
│   ├── top_locations.pipe
│   ├── top_pages.pipe
│   └── top_sources.pipe
```

## Deploying the Tinybird resources

To deploy to Tinybird, you need to have the [Tinybird CLI installed](https://www.tinybird.co/docs/cli/overview). Then, you can run the following commands:

```sh
tb auth --token <your user admin token>
tb push --force
```
