# helm-chart-2-plantuml

A tool to generate [PlantUML](http://plantuml.com/) component diagrams of deployed helm charts.

## How-To

Install helm-chart-2-plantuml
```
git clone https://github.com/fpolowood/helm-chart-viz.git
cd helm-chart-viz
npm install
```

Deploy your release with helm and generate the plantuml

```
helm install --name <release_name> <chart_dir>
helm get manifest <release_name> | node index.js
```

Or, you can also generate from your chart before deploying

```
helm template helm-charts/mychart -f helm-charts/mychart/valus.yaml | node index.js
```


Based on the original work from [neighborly](https://github.com/neighborly/helm-chart-viz)

