function redraw() {
  app.ctx.clearRect(0, 0, app.canvas.width(), app.canvas.height());

  //Stores all the elements in temporary variable
  var tmpAll = app.all;

  //Adds the element being edited
  if (app.current != null) {
    tmpAll = tmpAll.concat(app.current);
  }

  //Goes through all the elements to redraw them
  for (var i = 0; i < tmpAll.length; i++) {
    tmp = tmpAll[i];
    app.ctx.beginPath();
    app.ctx.lineWidth = tmp.size;
    app.ctx.strokeStyle = tmp.color;

    if (tmp.type == "pen") {
      app.ctx.moveTo(tmp.points[0].x, tmp.points[0].y);
      for (var j = 0; j < tmp.points.length; j++) {
        var p = tmp.points[j];
        app.ctx.lineTo(p.x, p.y);
      }
    }
    if (tmp.type == "line") {
      app.ctx.moveTo(tmp.startX, tmp.startY);
      app.ctx.lineTo(tmp.endX, tmp.endY);
    }
    if (tmp.type == "rect") {
      if (tmp.fill) {
        app.ctx.fillStyle = tmp.color;
        app.ctx.fillRect(tmp.x, tmp.y, tmp.w, tmp.h);
      }
      else {
        app.ctx.rect(tmp.x, tmp.y, tmp.w, tmp.h);
      }
    }
    if (tmp.type == 'circle') {
      if (tmp.fill) {
        app.ctx.lineWidth = 0;
        app.ctx.fillStyle = tmp.color;
        app.ctx.arc(tmp.x, tmp.y, tmp.radius, tmp.startAngle, tmp.endAngle);
        app.ctx.fill();
      }
      else {
        app.ctx.arc(tmp.x, tmp.y, tmp.radius, tmp.startAngle, tmp.endAngle);
      }
    }
    app.ctx.stroke();
  }
}
