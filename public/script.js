
      function initMap() {
        var Locations = {lat: 37.7749, lng: -122.4194};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: Locations
        });

        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Baker Beach</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Baker Beach:</b>'+ '1504 Pershing Drive, Golden Gate National Recreation Area, San Francisco, CA 94129'+
            '<p>Visit Site: <a href="http://www.parksconservancy.org/visit/park-sites/baker-beach.html">'+
            'http://www.parksconservancy.org/visit/park-sites/baker-beach.html</a> '+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          position: Locations,
          map: map,
          title: 'Baker Beach'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      }