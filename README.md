# helm-chart-2-plantuml

A tool to generate [PlantUML](http://plantuml.com/) component diagrams of deployed helm charts.

## How-To

1. Deploy your release with helm.

```
helm install --name <release_name> <chart_dir>
```

2. Generate the PlantUML code and image. You must have Java installed and on your `$PATH`.

```
node index.js <release_name> <output_dir>
```

Based on the original work from [neighborly](https://github.com/neighborly/helm-chart-viz)

