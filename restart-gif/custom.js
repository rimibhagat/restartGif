function restart_animated_gif(imgUrl, id, imgType) {
    var xhr = new XMLHttpRequest();
    // Browser will take cached response if it has cache entry with url key.
    xhr.open("GET", imgUrl);
    xhr.responseType = "blob";
    xhr.onload = function() {
      if (xhr.status != 200) {
        return;
      }
      var blobUrl = URL.createObjectURL(xhr.response);
      switch (imgType) {
        case "background-image":
          document.getElementById(id).style.backgroundImage = "url('" + blobUrl + "')";
          break;
        case "image":
        default:
          jQuery(id).attr('src', blobUrl);
          //document.getElementById(id).src = blobUrl;
      }
      setTimeout( function () {
        // Let browser display blob and revoke blob after stack unwind.
        URL.revokeObjectURL( blobUrl );
      }, 100); // You might need to increase delay time for large images.
    };
    xhr.send();
}

jQuery(document).ready(function($) {
    
      $('.product-static.show-animation').hover(
            function(){
                var cls= "#"+$(this).attr("id");
                var gf = "."+$(this).attr("id")+" img";
                //we get our current filename and use it for the src
                var linkIndex = $(cls).attr("data-filename");
                restart_animated_gif(linkIndex, gf, "image");
                $(cls).css("opacity", "0");
                
            },
            function(){
              $('.product-static.show-animation').css("opacity", "1");
                
            });
});