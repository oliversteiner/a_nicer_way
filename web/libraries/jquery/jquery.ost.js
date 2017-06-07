/**
 * Created by ost on 04.06.15.
 */



// Preload Images for CSS-Effects
// ======================================

$.fn.preload = function (path, img) {
    var imgs = [];
    img.forEach(function (img) {
        var uri = path + img;
        console.log(uri);
        imgs[img] = new Image();
        imgs[img].src = uri;
    });
};