function unpack(rows, key) {
  return rows.map(function (row) {
    return row[key];
  });
}

colors = [
  {r: 227, g: 30, b: 25},
  {r: 63, g: 122, b: 182},
  {r: 72, g: 178, b: 83},
  {r: 154, g: 71, b: 160},
  {r: 253, g: 131, b: 22},
  {r: 165, g: 88, b: 43},
  {r: 247, g: 126, b: 189},
  {r: 153, g: 153, b: 153}
];

var data = [];

for(let i = 0; i <= 8; i++) {
  let cluster = rows.filter(r => r.cluster === i);
  data.push({
    x: unpack(cluster, 'x'), y: unpack(cluster, 'y'), z: unpack(cluster, 'z'),
    mode: 'markers',
    marker: {
      size: cluster.map(p => 15 + 15*p.size),
      line: {
        color: 'rgba(217, 217, 217, 0.14)',
        width: 1
      },
      color: cluster.map(p => {
        c = colors[p.cluster % colors.length];
        return `rgba(${c.r}, ${c.g}, ${c.b}, ${Math.max(1 - p.distanceFromCenter**2, 0.4)})`;
        
      }),
      opacity: 1
    },
    type: 'scatter3d',
    text: unpack(cluster, 'name'),
    hoverinfo: 'text'
  });
}

var layout = {
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0
  },
  scene: {
      xaxis: {
          title: '',
          autorange: true,
          showgrid: false,
          zeroline: false,
          showline: false,
          autotick: true,
          ticks: '',
          showticklabels: false
      },
      yaxis: {
          title: '',
          autorange: true,
          showgrid: false,
          zeroline: false,
          showline: false,
          autotick: true,
          ticks: '',
          showticklabels: false
      },
      zaxis: {
          title: '',
          autorange: true,
          showgrid: false,
          zeroline: false,
          showline: false,
          autotick: true,
          ticks: '',
          showticklabels: false
      }
    },
    showlegend: false
};

Plotly.newPlot('myDiv', data, layout, {displayModeBar: false});