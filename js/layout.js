var windowHeight = $(window).height();
var windowWidth = $(window).width();

var lazy = {
    lazyLoadImage: function () {
        $("img.lazy-me").each(function() {
            function callback() {
                var pixelRatio = window.devicePixelRatio;
                var src;

                if (windowWidth > 768) {
                    if (pixelRatio > 1) {
                        src = $(this).attr("data-src-m-2x");
                    } else {
                        src = $(this).attr("data-src-m");
                    }
                } else {
                    if (pixelRatio > 1) {
                        src = $(this).attr("data-src-s-2x");
                    } else {
                        src = $(this).attr("data-src-s");
                    }
                } 
                $(this).attr("src", src);
                $(this).data('loaded', true);
            }

            new window.lazyload.plugins.LazyLoad({
                element: this,
                callback: callback.bind(this)
            });
        });
    }
}
$(function($){
    lazy.lazyLoadImage();
});