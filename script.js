//Make circles
var app = {
  canvas: null,
  ctx: null,
  btn: 'pen',
  all: [],
  current: null,
  brush: {
      color: '#000',
      size: 10,
      fill: false,
      down: false,
    }
}

  function init() {
    app.canvas = $('#draw');
    app.canvas.attr({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    // app.canvas.attr({
    //   width: 900,
    //   height: 900,
    // });
    app.ctx = app.canvas[0].getContext('2d');

    function mouseEvent(e) {
      if (app.btn == 'pen') {
        app.current.points.push({
          x: e.pageX,
          y: e.pageY,
        });
      }
      else if (app.btn == 'line') {
        app.current.endX = e.pageX;
        app.current.endY = e.pageY;
      }
      else if (app.btn == 'rect') {
        app.current.w = (e.pageX - app.current.x);
        app.current.h = (e.pageY - app.current.y);
      }
      else if (app.btn == 'circle') {
        var h = app.current.y;
        var w = app.current.x;

        h = Math.abs(h - e.pageX);
        w = Math.abs(w - e.pageY);
        app.current.radius = Math.abs(h - w);
      }
      redraw();
    }

    // MOUSE DOWN
    // MOUSE DOWN
    app.canvas.mousedown(function(e) {
      app.brush.down = true;
      if (app.btn == 'pen'){
        app.current = {
          type: 'pen',
          points: [],
        };
        mouseEvent(e);
      }
      else if (app.btn == 'line') {
        app.current = {
          type: 'line',
          startX: e.pageX,
          startY: e.pageY,
          endX: e.pageX,
          endY: e.pageY,
        }
      }
      else if (app.btn == 'rect') {
        app.current = {
          type: 'rect',
          fill: app.brush.fill,
          x: e.pageX,
          y: e.pageY,
        }
      }
      else if (app.btn == "circle") {
        app.current = {
          type: 'circle',
          fill: app.brush.fill,
          x: e.pageX,
          y: e.pageY,
          radius: 0,
          startAngle: 0,
          endAngle: 2*Math.PI
        }
      }
      else {
        app.current = null;
      }

      if (app.current != null) {
        app.current.size = app.brush.size;
        app.current.color = app.brush.color;
      }
      redraw();

    }).mouseup(function(e) {
      if (app.current != null) {
        app.brush.down = false;
        app.all.push(app.current);
        app.current = null;
      }
    }).mousemove( function(e) {
      if (app.brush.down) {
        mouseEvent(e);
      }
    });

    $('#pen-btn').click(function() {
      app.btn = 'pen';
    });

    $('#line-btn').click(function() {
      app.btn = 'line';
    });

    $('#rect-btn').click(function() {
      app.btn = 'rect';
    });

    $('#circle-btn').click(function() {
      app.btn = 'circle';
    });

    $('#fill-btn').click(function() {
      var text = $('#fill-btn').html();
      if (text == "Fill") {
        app.brush.fill = true;
        $('#fill-btn').html('Unfill');
      }
      else {
        app.brush.fill = false;
        $('#fill-btn').html('Fill');
      }
    });
    $('#save-btn').click(function() {
      // NOT WORKING
      window.open(app.canvas[0].toDataURL());
    });
    $('#undo-btn').click(function() {
      app.all.pop();
      redraw();
    });
    $('#clear-btn').click(function() {
      app.all = [];
      redraw();
    });

    $('#color-picker').on('input', function() {
      // brush.color = this.value;
      app.brush.color = this.value;
    });

    $('#brush-size').on('input', function() {
      app.brush.size = this.value;
    });
  }
  $(init);
