(function(){

  var foamtree;

  window.addEventListener('load', function() {
    foamtree = new CarrotSearchFoamTree({
      id: 'visualization',
      dataObject: window.TREE_DATA ,
      layoutByWeightOrder:true,
      layout: 'squarified',
      stacking: 'flattened',
      pixelRatio: window.devicePixelRatio || 1,
      maxGroupLevelsDrawn: Number.MAX_VALUE,
      maxGroupLevelsAttached:Number.MAX_VALUE,
      maxGroupLabelLevelsDrawn: Number.MAX_VALUE,
      rolloutDuration: 0,
      pullbackDuration: 0,
      fadeDuration: 0,
      zoomMouseWheelDuration: 300,
      openCloseDuration: 200,
      groupLabelVerticalPadding: 0.2,
      groupBorderRadius: 0,
      
      //TODO: follow up later
      onGroupHover:function(e){
        if (e.group && e.group.label) {
          tooltip.style.display = 'block';
          tooltip.innerHTML = formatTooltip(e.group);
        } else {
          tooltip.style.display = 'none';
        }
      },

      //zoom to group rather than that weird pop out thing
      onGroupDoubleClick: function(e) {
        e.preventDefault();
        var group = e.group;
        var toZoom;
        if (group) {
          toZoom = e.secondary ? group.parent : group;
        } else {
          toZoom = this.get('dataObject');
        }
        this.zoom(toZoom);
      },

      //we dont need the title bar as we have the tooltip
      titleBarDecorator: function (opts, params, vars) {
        vars.titleBarShown = false;
      }

    });
  });

  window.addEventListener('resize', (function() {
    var timeout;
    return function() {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(foamtree.resize, 300);
    };
  })());

  function formatTooltip(group){
    var gzipSize = group.formattedGzipSize ? (' (gzipped: ' + group.formattedGzipSize +  ')') : '';
    var t = '<em>' + group.label + '</em>';
    t += '<div>' + group.path + '</div>';
    t += '<div>Size:' + group.formattedSize + gzipSize + '</div>';
    t += '<div>Time: ' + group.formattedTime + '</div>';
    return t;
  }

  var tooltip = document.querySelector('.tooltip');
  document.addEventListener('mousemove', function(e){
    tooltip.style.left =
        e.pageX + tooltip.clientWidth + 20 < document.body.clientWidth ?
          e.pageX + 10 + 'px' :
          document.body.clientWidth - 10 - tooltip.clientWidth + 'px';
    tooltip.style.top =
        e.pageY + tooltip.clientHeight + 20 <
        document.body.clientHeight ?
          e.pageY + 10 + 'px' : 
          document.body.clientHeight - 10 - tooltip.clientHeight + 'px';
  });

})();