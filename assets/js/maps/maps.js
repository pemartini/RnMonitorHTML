active = -1;

var feature;

var styleCounty = function(feature, resolution) {
  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(255, 255, 255, 0)",
      width: 0.5
    })
  });
  return style;
};

var styleFloor = function(feature, resolution) {
  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgb(0,0,0,0.8)",
      width: 0.7
    })
  });
  return style;
};

var styleBuilding = function(feature) {
  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(0, 0, 0, 0.6)",
      width: 3
    }),
    fill: new ol.style.Fill({
      color: "rgba(0, 0, 0, 0.2)"
    })
  });
  return style;
};

var styleRoom = function(feature, resolution) {
  var cor;
  var thisCor = feature.get("dangerState");
  if (thisCor == 0) {
    cor = "rgba(32,32,32,0.2)";
  } else if (thisCor == 1) {
    cor = "rgba(38, 166, 91, 0.2)";
  } else if (thisCor == 2) {
    cor = "rgba(245, 229, 27, 0.2)";
  } else if (thisCor == 3) {
    cor = "rgba(230, 126, 34, 0.2)";
  } else {
    cor = "rgba(217, 30, 24, 0.2)";
  }
  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: cor,
      width: 1
    }),
    fill: new ol.style.Fill({
      color: cor
    }),
    text: new ol.style.Text({
      font: 5 / (resolution * 10) + "px Verdana",
      text: feature.get("description"),
      fill: new ol.style.Fill({ color: "white" }),
      stroke: new ol.style.Stroke({ color: "white", width: 1 })
    })
  });
  return style;
};

var styleSelect = function(feature) {
  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(250,120,15,0.4)",
      width: 1
    }),
    fill: new ol.style.Fill({
      color: "rgba(250,120,15,0.4)"
    }),
    text: new ol.style.Text({
      font: 10 + "px Verdana",
      text: feature.get("name"),
      fill: new ol.style.Fill({ color: "#FFFFFF" }),
      stroke: new ol.style.Stroke({ color: "#FFFFFF", width: 1 })
    })
  });
  return style;
};

var styleBuildingSelect = function(feature) {
  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(0,100,200,0.7)",
      width: 1
    }),
    fill: new ol.style.Fill({
      color: "rgba(0,100,200, 0.7)"
    }),
    text: new ol.style.Text({
      font: 10 + "px Verdana",
      text: feature.get("name"),
      fill: new ol.style.Fill({ color: "#FFFFFF" }),
      stroke: new ol.style.Stroke({ color: "#ffffff", width: 1 })
    })
  });
  return style;
};

var styleRoomSelect = function(feature, resolution) {
  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(46,70,0,0.7)",
      width: 1
    }),
    fill: new ol.style.Fill({
      color: "rgba(46,70,0.7)"
    }),
    text: new ol.style.Text({
      font: 5 / (resolution * 10) + "px Verdana",
      text: feature.get("name"),
      fill: new ol.style.Fill({ color: "white" }),
      stroke: new ol.style.Stroke({ color: "white", width: 1 })
    })
  });
  return style;
};

var styleSensor = function() {
  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(100,180,200,0.5)",
      width: 1
    }),
    fill: new ol.style.Fill({
      color: "rgba(100,180,200,0.5)"
    })
  });
  return style;
};

var styleSensorFilter = function(feature, resolution) {
  var style = new ol.style.Style({
    image: new ol.style.Icon({
      opacity: 1,
      color: "#0099ff"
    }),
    text: new ol.style.Text({
      anchor: [0.5, 0.5],
      font: 3 / (resolution * 10) + "px Verdana",
      text: feature.get("code"),
      fill: new ol.style.Fill({ color: "white" }),
      stroke: new ol.style.Stroke({ color: "white", width: 0.5 })
    })
  });
  return style;
};

function refreshMap() {
  polygonLayer.clear(true);
  pontosLayer.clear();
}

function flyTo(location, done) {
  var duration = 2000;
  var zoom = 12;
  var parts = 2;
  var called = false;

  function callback(complete) {
    --parts;
    if (called) {
      return;
    }
    if (parts === 0 || !complete) {
      called = true;
      done(complete);
    }
  }
  view.animate(
    {
      center: location,
      duration: duration
    },
    callback
  );
  view.animate(
    {
      zoom: zoom - 1,
      duration: duration / 2
    },
    {
      zoom: 23,
      duration: duration / 2
    },
    callback
  );
}

var pontoLayer;
var polygonLayer;
var clusterLayer;

$(document).ready(function() {
  var pointDraw;
  var vectorSource = new ol.source.Vector();

  view = new ol.View({
    center: ol.proj.transform([-8.8306, 41.6911], "EPSG:4326", "EPSG:3857"),
    zoom: 16,
    maxZoom: 22,
    minZoom: 3
  });

    // A group layer for base layers
    var baseLayers = new ol.layer.Group({
      title: 'Maps',
      openInLayerSwitcher: true,
      layers: [
        new ol.layer.Tile({
          title: "Gray",
          baseLayer: true,
          source: new ol.source.BingMaps({
            key:
              "Aob-XwBd_DZUehKtf8gAHNe8FrVmKMgZgLHscTry5CZTB_YJc98xKdQuheugdhpz",
            crossOrigin: "anonymous",
            maxZoom: 19,
            imagerySet: 'canvasGray'
          })
        }),
        new ol.layer.Tile({
          title: "Aerial",
          baseLayer: true,
          visible: false,
          source: new ol.source.BingMaps({
            key:
              "Aob-XwBd_DZUehKtf8gAHNe8FrVmKMgZgLHscTry5CZTB_YJc98xKdQuheugdhpz",
            crossOrigin: "anonymous",
            maxZoom: 19,
            imagerySet: 'Aerial'
          })
        }),
        new ol.layer.Tile({
          title: "Aerial w/Labels",
          baseLayer: true,
          source: new ol.source.BingMaps({
            key:
              "Aob-XwBd_DZUehKtf8gAHNe8FrVmKMgZgLHscTry5CZTB_YJc98xKdQuheugdhpz",
            crossOrigin: "anonymous",
            maxZoom: 19,
            imagerySet: 'AerialWithLabels'
          }),
          visible: false
        })
      ]
    });
  
  var map = new ol.Map({
    target: "maps",
    controls: [
      new ol.control.Zoom(),
      new ol.control.ZoomSlider(),
      new ol.control.ScaleLine(),
      new ol.control.Rotate()
    ],
    interactions: ol.interaction.defaults(),
    renderer: "canvas",
    layers: [baseLayers],
    view: view,
    loadTilesWhileInteraction: true
  });

  var switcher = new ol.control.LayerSwitcher({});
  switcher.on('drawlist', function(e) {
    var layer = e.layer;
    
  });
  var button = $('<div class="toggleVisibility" title="show/hide">')
    .text("Show/hide all")
    .click(function() {
      var a = map.getLayers().getArray();
      var b = !a[0].getVisible();
      if (b) button.removeClass("show");
      else button.addClass("show");
      for (var i=0; i<a.length; i++) {
        a[i].setVisible(b);
      }
    });
  switcher.setHeader($('<div>').append(button).get(0))

  map.addControl(switcher);
  function displayInLayerSwitcher(b) {
    mapbox.set('displayInLayerSwitcher', b);
  }
  var menu = new ol.control.Overlay({
    closeBox: true,
    className: "slide-left menu",
    content: $("#menu").get(0)
  });
  map.addControl(menu);

  var t = new ol.control.Toggle({
    html: '<i class="fa fa-bars" ></i>',
    className: "menu",
    title: "Menu",
    onToggle: function() {
      menu.toggle();
    }
  });
  map.addControl(t);

  var select = new ol.interaction.Select();
  var erase = new ol.interaction.Select();
  var wkt = new ol.format.WKT();

  var lineDraw = new ol.interaction.Draw({
    source: source,
    type: "Polygon"
  });

  var pointDraw = new ol.interaction.Draw({
    source: source,
    type: "Point"
  });

  var url =
    "http://62.48.168.89:8080/geoserver/RnMonitor/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=RnMonitor%3Apolygon&maxFeatures=150&outputFormat=application%2Fjson";
  polygonLayer = new ol.source.Vector({
    url: url,
    format: new ol.format.GeoJSON()
  });

  function flash(feature, duration) {
    var start = +new Date();
    var listenerKey;

    function animate(event) {
      var vectorContext = event.vectorContext;
      var frameState = event.frameState;
      var flashGeom = feature.getGeometry().clone();
      var elapsed = frameState.time - start;
      var elapsedRatio = elapsed / duration;
      var radius = ol.easing.easeOut(elapsedRatio) * 25 + 5;
      var opacity = ol.easing.easeOut(1 - elapsedRatio);

      var style = new ol.style.Style({
        image: new ol.style.Circle({
          radius: radius,
          snapToPixel: false,
          stroke: new ol.style.Stroke({
            color: [255, 0, 0, opacity],
            width: 0.25 + opacity
          })
        })
      });

      vectorContext.setStyle(style);
      vectorContext.drawGeometry(flashGeom);
      if (elapsed > duration) {
        ol.Observable.unByKey(listenerKey);
        return;
      }
      map.render();
    }
    listenerKey = map.on("postcompose", animate);
  }

  map.addLayer(
    new ol.layer.Vector({
      name: "Polygons",
      displayInLayerSwitcher: false,
      source: polygonLayer,
      style: function(feature) {
        var type = feature.get("polygonType_id");
        if (type == "5c9e495f45e5302a1c74fd5c") {
          feature.setStyle(styleBuilding);
        } else if (type == "5c9e495a45e5302a1c74fd5b") {
          const value = $("#selectPiso").val();
          if (feature.get("floor") == value) {
            feature.setStyle(styleRoom);
          } else {
            feature.setStyle();
          }
          $("#selectPiso").change(function() {
            const value = $(this).val();
            if (feature.get("floor") == value) {
              feature.setStyle(styleRoom);
            } else {
              feature.setStyle();
            }
          });
        } else if (type == "5c9e496345e5302a1c74fd5d" || type == "5c9e496745e5302a1c74fd5e") {
          feature.setStyle(styleCounty);
        } else if (type == "5cbf23f68321ca39485dcd09") {
          $("#selectPiso").change(function() {
            const value = $(this).val();
            if (feature.get("floor") == value) {
              feature.setStyle(styleFloor);
            } else {
              feature.setStyle();
            }
          });
        }
      }
    })
  );

  var pontos = "http://62.48.168.89:8080/geoserver/RnMonitor/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=RnMonitor%3Amedicoes&maxFeatures=150&CQL_FILTER=end+LIKE+'false'&outputFormat=application%2Fjson";
  
  pontosLayer = new ol.source.Vector({
    url: pontos,
    format: new ol.format.GeoJSON()
  });

  var layer2 = new ol.layer.Tile({
    title : "Geological Chart",
    source: new ol.source.TileWMS({
      name : "Geological Chart",
      url: "http://62.48.168.89:8080/geoserver/RnMonitor/wms?service/",
      params: {
        LAYERS: "RnMonitor:19",
        TILED: true
      },
      serverType: "geoserver"
    })
  });

  var radonRiskLayer = new ol.layer.Tile({
    title : "Radon Risk ITN",
    source: new ol.source.TileWMS({
      name : "Radon Risk",
      url: "http://62.48.168.89:8080/geoserver/RnMonitor/wms?service/",
      params: {
        LAYERS: "RnMonitor:RadonMap",
        TILED: true
      },
      serverType: "geoserver"
    })
  });

map.addLayer(layer2);
layer2.setOpacity(0.3);
layer2.setVisible(false);
map.addLayer(radonRiskLayer);
radonRiskLayer.setOpacity(0.05);
radonRiskLayer.setVisible(true);

  $("#geologico").click(function() {
    layer2.setVisible(!layer2.getVisible());
  });

  var piso0 = new ol.layer.Tile({
    title : 'Buildings',
    displayInLayerSwitcher: false,
    source: new ol.source.TileWMS({
      url: "http://62.48.168.89:8080/geoserver/RnMonitor/wms?service/",
      name : "Buildings",
      params: {
        LAYERS: "RnMonitor:000, RnMonitor:001, RnMonitor:002, RnMonitor:003,RnMonitor:004"
      },
      serverType: "geoserver"
    })
  });

  map.addLayer(piso0);
  piso0.setOpacity(1);

  var popup = new ol.Overlay.Popup({
    popupClass: "default",
    closeBox: true,
    onshow: function() {},
    onclose: function() {},
  });

  var selectPop = new ol.interaction.Select({});
  map.addInteraction(selectPop);
  map.addOverlay(popup);

  var styleCache = {};

  function getStyle(feature, resolution) {
    var size = feature.get("features").length;
    var style = styleCache[size];
    if (!style) {
      var color = size > 3 ? "192,0,0" : size > 8 ? "255,128,0" : "0,128,0";
      var radius = Math.max(8, Math.min(size * 0.75, 20));
      var dash = (2 * Math.PI * radius) / 6;
      var dash = [0, dash, dash, dash, dash, dash, dash];
      style = styleCache[size] = new ol.style.Style({
        image: new ol.style.Circle({
          radius: radius,
          fill: new ol.style.Fill({
            color: "rgba("+color+")"
          })
        })
      });
    }
    return [style];
  }
  var clusterSource = new ol.source.Cluster({
    distance: 40,
    source: pontosLayer
  });
  var clusterLayer = new ol.layer.AnimatedCluster({
    name: "Cluster",
    source: clusterSource,
    displayInLayerSwitcher: false,
    animationDuration: $("#animatecluster").prop("checked") ? 700 : 0,
    style: getStyle
  });
  map.addLayer(clusterLayer);

  var img = new ol.style.Circle({
    radius: 5,
    stroke: new ol.style.Stroke({
      color: "rgba(125,130,130,0.9)",
      width: 1
    }),
    fill: new ol.style.Fill({
      color: "rgba(125,130,130,0.7)"
    })
  });

  var style0 = new ol.style.Style({
    image: img
  });
  var style1 = new ol.style.Style({
    image: img,
    stroke: new ol.style.Stroke({
      color: "#fff",
      width: 1
    })
  });
  var selectCluster = new ol.interaction.SelectCluster({
    pointRadius: 7,
    animate: $("#animatesel").prop("checked"),
    featureStyle: function() {
      return [$("#haslink").prop("checked") ? style1 : style0];
    },
    style: function(f, res) {
      var cluster = f.get("features");
      if (cluster.length > 1) {
        var s = getStyle(f, res);
        if ($("#convexhull").prop("checked") && ol.coordinate.convexHull) {
          var coords = [];
          for (i = 0; i < cluster.length; i++)
            coords.push(cluster[i].getGeometry().getFirstCoordinate());
          var chull = ol.coordinate.convexHull(coords);
          s.push(
            new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: "rgba(0,0,192,1)",
                width: 2
              }),
              fill: new ol.style.Fill({ color: "rgba(0,0,192,1)" }),
              geometry: new ol.geom.Polygon([chull]),
              zIndex: 1
            })
          );
        }
        return s;
      } else {
        return [
          new ol.style.Style({
            image: new ol.style.Circle({
              stroke: new ol.style.Stroke({
                color: "rgba(0,0,192,1)",
                width: 2
              }),
              fill: new ol.style.Fill({ color: "rgba(0,0,192,1)" }),
              radius: 5
            })
          })
        ];
      }
    }
  });

  map.addInteraction(selectCluster);
  selectCluster.getFeatures().on(["add"], function(e) {
    if (e.element.id_ == undefined) {
      var c = e.element.get("features");
      if(c.length >= 1){
        var newA = [];
        for(var a = 0 ; a < c.length; a++){
          newA.push("var-Sensor="+c[a].getProperties().sensor_id);
             }   
          $("#valueOfh6").html("<h6>UNDER DEVELOPMENT. FIXING THIS A.S.A.P.</h6>");
          $("#dadosEdificio").html("<iframe src='http://62.48.168.89:4000/d-solo/t704n1GWz/rnmonitor_dash_polygon?panelId=8&"+newA.join("&")+"&orgId=1&theme=light&refresh=30m' width='100%' height='200' frameborder='0'></iframe>"+
          "<iframe src='http://62.48.168.89:4000/d-solo/t704n1GWz/rnmonitor_dash_polygon?panelId=9&"+newA.join("&")+"&orgId=1&theme=light&refresh=30m' width='100%' height='200' frameborder='0'></iframe>"+
          "<iframe src='http://62.48.168.89:4000/d-solo/t704n1GWz/rnmonitor_dash_polygon?panelId=10&"+newA.join("&")+"&orgId=1&theme=light&refresh=30m' width='100%' height='200' frameborder='0'></iframe>"+
          '<iframe src="http://62.48.168.89:4000/d-solo/QHRvd1GWk/rnmonitor_dash_metrix?refresh=5m&orgId=1&'+newA.join("&")+'&panelId=4&theme=dark" width="100%" height="100" frameborder="0"></iframe>');
          if ($("#menu").is(":hidden")) {
            menu.toggle();
          }
        }
      else if (c.length == 1) {
        var feature = c[0];
        var content = "";
        content += "Sensor: " + feature.getProperties().description;
        sensorData = feature.getProperties().sensor_id;
        var center = e.element.getGeometry().getExtent();
        var newCenter = ol.extent.getCenter(center);
          flash(feature, 1000);
          if ($("#menu").is(":hidden")) {
            menu.toggle();
          }
          else{

          }
          var content = $("<div>").append("<h6>Sensor "+sensorData+ ":</h6><iframe src='http://62.48.168.89:4000/d-solo/MNYFg0GZk/general?panelId=2&orgId=1&var-Sensor="+sensorData+"&refresh=5s' width='100%' height='200' frameborder='0'></iframe><br><iframe src='http://62.48.168.89:4000/d-solo/MNYFg0GZk/general?panelId=6&var-Sensor="+sensorData+"&refresh=30m&orgId=1&theme=light' width='100%' height='200' frameborder='0'></iframe><br><iframe src='http://62.48.168.89:4000/d-solo/MNYFg0GZk/general?orgId=1&var-Sensor="+sensorData+"&refresh=30m&panelId=4&theme=light' width='100%' height='200' frameborder='0'></iframe></div></div>"+
          "<iframe src='http://62.48.168.89:4000/d-solo/QHRvd1GWk/rnmonitor_dash_metrix?orgId=1&panelId=2&fullscreen&var-Sensor="+sensorData+"' width='50%' height='100px' frameborder='0'></iframe><iframe src='http://62.48.168.89:4000/d-solo/QHRvd1GWk/rnmonitor_dash_metrix?orgId=1&panelId=3&fullscreen&var-Sensor="+sensorData+"' width='50%' height='100px' frameborder='0'></iframe></td><br><small>Hint: Selecione e arraste no gráfico para Zoom In. Prima Ctrl + Z para Zoom Out.</small>");   
          $("#valueOfh6").html("<h6>UNDER DEVELOPMENT</h6>");
          $("#dadosEdificio").html(content);         
          select.getFeatures().on(["remove"], function (e) {
            /*if ($("#menu").is(":visible")) {
              menu.toggle();
            }*/
          });
        }
        else {
        }
      }
      else{
      var feature = e.element;
      if (feature.get("polygonType_id") == "5c9e495a45e5302a1c74fd5b" || feature.get("polygonType_id") == "5c9e495f45e5302a1c74fd5c") {
        if ($("#menu").is(":hidden")) {
             menu.toggle();
           }
        var center = e.element.getGeometry().getExtent();
        var newCenter = ol.extent.getCenter(center);
        var clima = "";
        if (feature.get("climatization") == false) {
          clima = "Não";
        } else {
          clima = "Sim";
        }

        if (feature.get("polygonType_id") == "5c9e495f45e5302a1c74fd5c") {
          getSensorInBuilding(feature.id_);
          var content = $("<div>").append(
            "<div class='row'><div class='col-12'><div align='center' class='imagesBig'><img alter='imagem edificio' src='assets/images/"+feature.get('description')+".jpg' class='planta'></div></div></div><hr>" +
             "<div class='row'><div class='col-md-12'><p><strong>Edifício: </strong>" +
              feature.get("name") + "</div>" +
              "</div><div class='row'><div class='col-md-6'>" +
              "</p><p><strong>Tipologia: </strong>" +
              feature.get("typology") +
              "</div><div class='col-md-6'></p><p><strong>Fachada: </strong>" +
              feature.get("orientation") +
              "</div></div><div class='row'><div class='col-md-6'></p><p><strong>Compartimentos: </strong>" +
              feature.get("numCompartments") +
              "</div><div class='col-md-6'></p><p><strong>Área: </strong>" +
              feature.get("area") +
              " m<sup> 2</sup>" +
              "</div></div><div class='row'><div class='col-md-6'></p><p><strong>Climatização: </strong>" +
              clima +
              "</div></div><hr>" +
              "<div class='row'><div class='col-md-6'></p><p><strong>Fundações: </strong>" +
              feature.get("foundations") +
              "</div><div class='col-md-6'></p><p><strong>Paredes: </strong>" +
              feature.get("walls") +
              "</div></div><div class='row'><div class='col-md-6'></p><p><strong>Pilares: </strong>" +
              feature.get("pillars") +
              "</div><div class='col-md-6'></p><p><strong>Vigas: </strong>" +
              feature.get("beams") +
              "</div></div><div class='row'><div class='col-md-6'></p><p><strong>Teto: </strong>" +
              feature.get("ceiling") +
              "</div><div class='col-md-6'></p><p><strong>Escadas: </strong>" +
              feature.get("stairs") +
              "</div></div><div class='row'><div class='col-md-6'></p><p><strong>Lajes: </strong>" +
              feature.get("slabs") +
              "</div></div>"
          );
          $("#valueOfh6").html(content);
        } else {
          getSensorInRoom(feature.id_);
        var content1 = $("<div id='testeFeature'>").append("<div class='row'><div class='col-md-12'>" +
            "<p><strong>Edifício: </strong>" +
            feature.get("name")+". "+ feature.get("description") +"</div>" +
            "</div><div class='row'><div class='col-md-6'></p><p><strong>Fachada: </strong>" +
            feature.get("orientation") +
            "</div><div class='col-md-6'></p><p><strong>Área: </strong>" +
            feature.get("area") +
            " m<sup> 2</sup>" +
            "</div></div><div class='row'><div class='col-md-6'></p><p><strong>Climatização: </strong>" +
            clima +
            "</div></div></div><hr>" +
            "<div class='row'><div class='col-md-6'></p><p><strong>Paredes: </strong>" +
            feature.get("walls") +
            "</div><div class='col-md-6'></p><p><strong>Pilares: </strong>" +
            feature.get("pillars") +
            "</div></div><div class='row'><div class='col-md-6'></p><p><strong>Vigas: </strong>" +
            feature.get("beams") +
            "</div><div class='col-md-6'></p><p><strong>Teto: </strong>" +
            feature.get("ceiling") +
            "</div></div>"
        );
          $(".menuTitulo").html("Compartimento " + feature.get("name") + "<br>");
          $("#valueOfh6").html(content1);
        }
        selectCluster.getFeatures().on(["remove"], function(e) {
          
          if ($("#menu").is(":visible")) {
           //menu.toggle();
          }
        });
      } else {
      }
    }
  });

  var search1 = new ol.control.SearchGPS({});
  map.addControl(search1);
  search1.on("select", function(e) {
    map.getView().animate({
      center: e.search1.coordinate,
      zoom: Math.max(map.getView().getZoom(), 10)
    });
  });

  var highlightedFeatures = [];
  
  map.on("pointermove", function(e) {
    var i;
    for (i = 0; i < highlightedFeatures.length; i++) {}
    highlightedFeatures = [];
    map.forEachFeatureAtPixel(e.pixel, function(feature) {
      highlightedFeatures.push(feature);
      var content = feature.getProperties().name || null;
      var content1 = feature.getProperties().selectclusterfeature || null;
      if(content != null){
     // popup.show(feature.getGeometry().getFirstCoordinate(), content);
      }
      else if(content1 != null || feature.getProperties().id_ == undefined){
      popup.show(feature.getGeometry().getFirstCoordinate(), "Sensor " + feature.getProperties().features[0].getProperties().description);
      }
    });
  });
  var target = map.getTarget();
  mouse = typeof target === "string" ? $("#" + target) : $(target);
  $(map.getViewport()).on("mousemove", function(e) {
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.forEachFeatureAtPixel(pixel, function() {
     
      return true;
    });
    if (hit) {
      mouse.css("cursor", "pointer");
    } else{
      mouse.css("cursor","");
      popup.hide();
    }
  });

  source = new ol.source.Vector({ wrapX: false });

  var vector = new ol.layer.Vector({
    source: source,
    features: [feature]
  });

  function getSensores(type, id) {
    var dataString = {
      type: type,
      id: id
    };
    var a = [];
    var data = JSON.stringify(dataString);
    $.ajax({
      type: "POST",
      url: "http://62.48.168.89/php/getSensores.php/getSensoresPolyg",
      data: { data },
      success: function(polygs) {
        if (polygs == "") {
          document.getElementById("chart").innerHTML =
            "<h6 style='text-align.center; padding:30px;'>Nenhum sensor ativo</h6>";
        }
        if (polygs != "") {
          var erro = polygs.errors;
          if (!erro) {
            $.each(polygs, function(i, u) {
              var dataString = { building: u._id };
              var data = JSON.stringify(dataString);
              $.ajax({
                type: "POST",
                url: "http://62.48.168.89/php/getPoligonos.php/mset",
                data: { data },
                success: function(measurementset) {
                  var err = measurementset.errors;
                  if (!err) {
                    $.each(measurementset, function(c, b) {
                      if (b.length != "") {
                        getSensorData(b.sensor_id, b.description);
                      } else {
                        document.getElementById("chart").innerHTML =
                          "<h3 style='text-align:center; padding:30px;'>Sem resultados a apresentar</h3>";
                      }
                    });
                  }
                }
              });
            });
          }
        }
      }
    });
  }

  function EId(id, u) {
    return (document.getElementById(id).value = u);
  }

  function getDadosPolygon(value) {
    var id_polygon = value;
    $.ajax({
      type: "POST",
      data: { id_polygon },
      url: "http://62.48.168.89/php/getPoligonos.php/unidade",
      success: function(polygon) {
        if (polygon) {
          document.getElementById("form-verEdificio").reset();
          EId("name", polygon.name);
          EId("descricao", polygon.description);
          EId("orientacao", polygon.orientation);
          EId("local", polygon.orientation);
          EId("tipoOcupacao", polygon.typology);
          if (polygon.climatization == true) {
            EId("avac", "Sim");
          } else {
            EId("avac", "Não");
          }
          EId("tipologia", polygon.typology);
          EId("areaUtil", polygon.area);
          EId("compartimentos", polygon.numCompartments);
          EId("fundacoes", polygon.foundations);
          EId("pilares", polygon.pillars);
          EId("lajes", polygon.slabs);
          EId("vigas", polygon.beams);
          EId("paredes", polygon.walls);
          EId("escadas", polygon.stairs);
          EId("teto", polygon.ceiling);
        } else {
          jQuery.gritter.add({
            title: "Erro de dados!",
            text: polygon.message,
            class_name: "growl-danger",
            sticky: false,
            time: "2000"
          });
        }
      },
      error: function() {
        jQuery.gritter.add({
          title: "Erro do servidor!",
          text: "Erro ao conectar com o servidor",
          class_name: "growl-danger",
          sticky: false,
          time: 2000
        });
      }
    });
  }

  //DragBox com Ctrl
  var selectedFeatures = select.getFeatures();
  var dragBox = new ol.interaction.DragBox({
    condition: ol.events.condition.platformModifierKeyOnly
  });
  //map.addInteraction(dragBox);
  dragBox.on("boxend", function() {
    var extent = dragBox.getGeometry().getExtent();
    polygonLayer
      .getSource()
      .forEachFeatureIntersectingExtent(extent, function(feature) {
        selectedFeatures.push(feature);
      });

    pontosLayer
      .getSource()
      .forEachFeatureIntersectingExtent(extent, function(feature) {
        selectedFeatures.push(feature);
      });
  });

  dragBox.on("boxstart", function() {
    selectedFeatures.clear();
  });
  selectedFeatures.on(["add", "remove"], function() {
    var names = selectedFeatures.getArray().map(function(feature) {
      return feature.getProperties()._id;
    });
    if (names.length > 0) {
      document.getElementById("infor").innerHTML = names.join(", ");
    } else {
      document.getElementById("infor").innerHTML = "";
    }
  });

  var search = new ol.control.SearchFeature({
    source: polygonLayer,
    property: $(".options select").val()
  });
  map.addControl(search);

  search.on("select", function(e) {
    select.getFeatures().clear();
    select.getFeatures().push(e.search);
    var p = e.search.getGeometry().getFirstCoordinate();
    map.getView().animate({ center: p });
  });

  /*
  $("#printTopdf").click(function() {
    clearCustomInteractions();
    var width = Math.round((297 * 150) / 25.4);
    var height = Math.round((210 * 150) / 25.4);
    var size = /** @type {module:ol/size~Size} */ /*(map.getSize());
    var extent = map.getView().calculateExtent(size);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = dd + "/" + mm + "/" + yyyy;
    map.once("rendercomplete", function(event) {
      var canvas = event.context.canvas;
      var data = canvas.toDataURL("image/jpeg");
      var pdf = new jsPDF("landscape", undefined, "a4");
      pdf.addImage(data, "JPEG", 0, 0, 297, 210);
      pdf.save("RnMonitor - " + today + ".pdf");
      map.setSize(size);
      map.getView().fit(extent, { size: size });
    });

    var printSize = [width, height];
    map.setSize(printSize);
    map.getView().fit(extent, { size: printSize });
  });*/

  var geolocation = new ol.Geolocation({
    projection: view.getProjection(),
    tracking: true
  });
  $("#geolocalizar").click(function() {
    clearCustomInteractions();
    var position = geolocation.getPosition();
    var center = [position[0], position[1]];
    view.setCenter(center);
    view.setResolution(2.388657133911758);
    view.setZoom(20);
    return false;
  });

  $("#point").click(function() {
    clearCustomInteractions();
    map.removeInteraction(selectCluster);
    $(this).addClass("active");
    map.addInteraction(pointDraw);
    pointDraw.on("drawend", function(evt) {
      var feature = evt.feature;
      vectorSource.clear();
      var latLong = feature.getGeometry().getCoordinates();
      $("#modal-confirmar").modal("show");
      clearCustomInteractions();
      $("#btn-confirmar")
        .unbind("click")
        .click(function(event) {
          inserePonto(latLong);
          event.preventDefault();
          clearCustomInteractions();
          map.addInteraction(selectCluster);
          map.updateSize();
 
        });
    });
    event.preventDefault();
  });

  var snap;
  var modify;
  $("#modify").click(function() {
    map.removeOverlay(popup);
    featureModificado = "";
    array = "";
    clearCustomInteractions();
    $(this).addClass("active");
    map.removeInteraction(selectCluster);
    seleciona = new ol.interaction.Select({
      wrapX: false
    });
    map.addInteraction(seleciona);
    seleciona.getFeatures().on("add", function(e) {
      selected = false;
      featureModificado = e.element;
    });

    modify = new ol.interaction.ModifyTouch({
      features: seleciona.getFeatures()
    });
    snap = new ol.interaction.Snap({ source: polygonLayer });
    //map.addInteraction(snap);
    map.addInteraction(modify);

    var bar = new ol.control.Bar();
    var removeBt = new ol.control.Toggle({
      onToggle: function(b) {
        removeBt.setActive(false);
      },
      bar: new ol.control.Bar({
        controls: [
          new ol.control.TextButton({
            html: "Remover&nbsp;ponto",
            handleClick: function(b) {
              modify.removePoint();
            }
          })
        ]
      })
    });
    modify.on("showpopup", function(e) {
      if (!modify.get("usePopup")) removeBt.setActive(true);
    });
    modify.on("hidepopup", function(e) {
      removeBt.setActive(false);
    });

    modify.on("modifyend", function(e) {
      var array = e.features.getArray();
      for (var i = 0; i < array.length; i++) {
        featureModificado = array[i];
      }
      $("#modal-confirm-modify").modal("show");
      $("#btn-confirm-modify")
        .unbind("click")
        .click(function(event) {
          changeFeature(
            featureModificado.getProperties()._id,
            featureModificado.getGeometry().getCoordinates()
          );
          $("#modal-confirm-modify").modal("hide");
          seleciona.getFeatures().clear();
          clearCustomInteractions();
          map.addInteraction(selectCluster);
        });
    });
  });

  $("#polygon").click(function() {
    clearCustomInteractions();
    map.removeOverlay(popup);
    map.removeInteraction(selectCluster);
    $(this).addClass("active");
    map.addInteraction(lineDraw);
    lineDraw.on("drawstart", function(e) {
      map.removeInteraction(selectCluster);
      select.setActive(false);
    });
    lineDraw.on("drawend", function(e) {
      select.setActive(true);
      var currentFeature = e.feature;
      var points = currentFeature.getGeometry().getCoordinates();
      $("#modal-confirmar").modal("show");
      $("#btn-confirmar")
        .unbind("click")
        .click(function(event) {
          inserePolygon(points);
          event.preventDefault();
          clearCustomInteractions();
          map.addInteraction(selectCluster);
          map.addOverlay(popup);
        });
    });
    event.preventDefault();
  });

  $("#pan").click(function() {
    clearCustomInteractions();
    refreshMap();
    $(this).addClass("active");
    return false;
  });

  function clearCustomInteractions() {
    $("#bar")
      .find("button")
      .removeClass("active");
    map.removeInteraction(lineDraw);
    map.removeInteraction(pointDraw);
    map.removeInteraction(snap);
    map.removeInteraction(modify);
  }

  function inserePonto(ponto) {
    map.removeOverlay(popup);
    $("#modal-confirmar").modal("hide");
    var pontosConvert = [];
    document.getElementById("form-addMedicao").reset();
    verificaSuperior(ponto);
    $("#modal-addMedicao").modal("show");
    pontosConvert.push(
      ol.proj.transform([ponto[0], ponto[1]], "EPSG:3857", "EPSG:4326")
    );
    pontosCoordinate = pontosConvert[0];
  }

  function inserePolygon(pontos) {
    var i = 0;
    var pontosConvert = [];
    for (i = 0; i < pontos[0].length; i++) {
      pontosConvert.push(
        ol.proj.transform(
          [pontos[0][i][0], pontos[0][i][1]],
          "EPSG:3857",
          "EPSG:4326"
        )
      );
    }
    $("#modal-confirmar").modal("hide");
    document.getElementById("form-addPolygon").reset();
    $("#modal-polygon").modal("show");
    polygonCoordinates = pontosConvert;
    map.addOverlay(popup);
  }

  function changeFeature(id, coordinates) {
    var pontosConvert = [];
    for (i = 0; i < coordinates[0].length; i++) {
      pontosConvert.push(
        ol.proj.transform(
          [coordinates[0][i][0], coordinates[0][i][1]],
          "EPSG:3857",
          "EPSG:4326"
        )
      );
    }
    var dataString = { coordinates: [pontosConvert] };
    var data = JSON.stringify(dataString);
    $.ajax({
      type: "POST",
      url: "http://62.48.168.89/php/getPoligonos.php/updatePolygon/",
      data: { id, data },
      success: function(result) {
        if (result.errors) {
          jQuery.gritter.add({
            title: "Aviso!",
            text: "Não foi possível modificar o espaço!",
            sticky: false,
            time: 2000
          });
        } else {
          jQuery.gritter.add({
            title: "Sucesso!!",
            text: "Espaço modificado com sucesso!",
            sticky: false,
            time: 2000
          });
          polygonLayer.clear({ force: true });
          map.addOverlay(popup);
        }
      }
    });
  }

  function verificaSuperior(pontos) {
    var pontosSuperior = [];
    pontosSuperior.push(
      ol.proj.transform([pontos[0], pontos[1]], "EPSG:3857", "EPSG:4326")
    );
    var dataString = {
      lng: pontosSuperior[0][0],
      lat: pontosSuperior[0][1],
      piso: $("#selectPiso").val()
    };
    var data = JSON.stringify(dataString);
    $.ajax({
      type: "POST",
      url: "http://62.48.168.89/php/getIndex.php/superior",
      data: { data },
      success: function(res) {
        if (res) {
          length = res.length;
          if (!res.errors) {
            $("#polygonSelect")
              .empty()
              .append('<option selected disabled value="">Selecionar Superior</option>');
            $.each(res, function(i, po) {
              $("#polygonSelect").append(
                "<option value=" + po._id + ">" + po.name + "</option>"
              );
            });
          }
        }
      },
      error: function() {},
      complete: function() {
        $("#polygonSelect").attr("disabled", length == 0);
      }
    });
    return false;
  }

  function getSensorInRoom(room){
      var dataString = {'building': room};
      var data = JSON.stringify(dataString);
      $.ajax({
          type: "POST",
          url: "http://62.48.168.89/php/getPoligonos.php/mset",
          async : false,
          data: {data},
          success: function(measurements) {
              if (measurements.length < 1) {
                $("#dadosEdificio").html("<h6>Sem dados disponíveis</h6>");
              }
              else{
                var newVariable = [];
                for(var i = 0; i < measurements.length; i++){
                  newVariable.push("var-Sensor="+measurements[i].sensor_id);
                }
                $("#dadosEdificio").html("<iframe src='http://62.48.168.89:4000/d-solo/t704n1GWz/rnmonitor_dash_polygon?panelId=8&"+newVariable.join("&")+"&orgId=1&theme=light&refresh=30m' width='100%' height='200' frameborder='0'></iframe>"+
                "<iframe src='http://62.48.168.89:4000/d-solo/t704n1GWz/rnmonitor_dash_polygon?panelId=9&"+newVariable.join("&")+"&orgId=1&theme=light&refresh=30m' width='100%' height='200' frameborder='0'></iframe>"+
                "<iframe src='http://62.48.168.89:4000/d-solo/t704n1GWz/rnmonitor_dash_polygon?panelId=10&"+newVariable.join("&")+"&orgId=1&theme=light&refresh=30m' width='100%' height='200' frameborder='0'></iframe>"+
                '<iframe src="http://62.48.168.89:4000/d-solo/QHRvd1GWk/rnmonitor_dash_metrix?refresh=5m&orgId=1&'+newVariable.join("&")+'&panelId=4&theme=dark" width="100%" height="100" frameborder="0"></iframe>');
                  }                  
          },
          error: function() {},
          complete: function() {}
      });
  }

  function getSensorInBuilding(building){
     var dataString = {'polygon':building};
     var data = JSON.stringify(dataString);
     var newArray = [];
     $.ajax({
        type : "POST",
        url : "http://62.48.168.89/php/getPoligonos.php/inside",
        data : {data},
        success : function(data){
          if(data.length < 1){
            $("#dadosEdificio").html("<h6>Sem dados disponíveis</h6>");          
        }else{
          $.each(data, function(i, building) {
            dataString = {'polygon' : building._id};
            data = JSON.stringify(dataString);
            $.ajax({
              type : "POST",
              url : "http://62.48.168.89/php/getPoligonos.php/inside",
              data : {data},
              success : function(newData){
                $.each(newData, function(a, newBuilding){
                  dataString = {'building' : newBuilding._id};
                  data = JSON.stringify(dataString);
                  $.ajax({
                    type: "POST",
                    url: "http://62.48.168.89/php/getPoligonos.php/mset",
                    async : false,
                    data: {data},
                    success: function(measurements) {
                        if (measurements.length < 1) {

                        }
                        else{              
                          for(var a = 0 ; a < measurements.length ; a++){
                            
                            newArray.push(measurements[a].sensor_id);
                            //newArray.push("var-Sensor="+measurements[a].sensor_id);
                          }    
                            }                  
                    },
                    error: function() {},
                    complete: function() {}
                });
                });  
              }
            });
          });          
        }
        console.log(newArray);
       $("#dadosEdificio").html("<h6>UNDER DEVELOPMENT. FIXING THIS A.S.A.P.</h6>");
        }
     });
  }

  function checkUnique(array){
    var unique = {};
    var distinct = [];
      for( var i in array ){
        if(typeof(unique[array[i].sensor]) == "undefined"){
          distinct.push(array[i].sensor);
        }
        unique[array[i].sensor] = 0;
                          }
    return distinct;
  }
});
