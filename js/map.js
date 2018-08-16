(function() {
	var icon = {
		path: 'M256,0C167.641,0,96,71.625,96,160c0,24.75,5.625,48.219,15.672,69.125C112.234,230.313,256,512,256,512l142.594-279.375   C409.719,210.844,416,186.156,416,160C416,71.625,344.375,0,256,0z M256,256c-53.016,0-96-43-96-96s42.984-96,96-96   c53,0,96,43,96,96S309,256,256,256z',
		scale: 0.1,
		strokeColor: 'gray',
		fillColor: 'black',
		fillOpacity: 1
	};
	var mapElement = document.getElementById('map');
	var center = {
		lat: 49.070395, 
		lng: 33.405456
	};
	var map = new google.maps.Map(
		mapElement, 
		{
			zoom: 4, 
			center: center
		}
	);
	var marker = new google.maps.Marker(
		{
			position: center, 
			map: map,
			icon: icon
		}
	);

	var geocoder = new google.maps.Geocoder();
	var citySelect = document.getElementById('city');

	citySelect.addEventListener('change', function(evt) {
		var cityName = evt.target.value;

		geocoder.geocode({'address': cityName}, geocodeHandler);
	});


    // google.maps.event.addListener(map, 'bounds_changed', function(evt) {
    // 	this.setZoom(10);
    // });
        

	function geocodeHandler(results) {
		var placeId = results[0].place_id;

		var placeRequest = {
		  placeId: placeId,
		};

		var placesService = new google.maps.places.PlacesService(map);
		placesService.getDetails(placeRequest, placeRequestHandler);
	}

	function placeRequestHandler(place, status) {
		console.log(place);
		var bounds = new google.maps.LatLngBounds();
		var placePosition = {
			lat: place.geometry.location.lat(),
			lng: place.geometry.location.lng(),
		};
		bounds.extend(placePosition);

		map.fitBounds(bounds);
		marker.setMap(null);
		marker = new google.maps.Marker(
			{
				position: placePosition, 
				map: map,
				icon: icon
			}
		);
		var infowindow = new google.maps.InfoWindow({
	    content: place.formatted_address
	  });

		marker.addListener('click', function() {
		    infowindow.open(map, marker);
		  });
	}
})();