app.directive('panZoom', ['$document', function($document) {
  return {
    link: function($scope, element, attr){
      console.log(attr);
      var svgElement = document.querySelector("#" + attr.id);
      var panZoomTiger = svgPanZoom(svgElement);
    }
  };
}])