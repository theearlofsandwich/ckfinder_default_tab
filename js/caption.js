(function ($) {

    Drupal.behaviors.captionizer = {
        attach: function (context, settings) {


            $('img[caption]').each( function() {

                $(this).wrap('<div class="figure caption-image" />');

                var obj = $(this).get(0),
                    attr = obj.getAttribute('width');
                    //$(this).attr("width");
                //alert(attr);
                if(typeof attr !== 'undefined' && attr !== false) {
                    $(this).parent().css('width',attr + "px");
                }

                $(this).after('<div class="figcaption">' + $(this).attr('caption') + '</div>');

                //var theWidth = $(this).width();
                //$(this).parent().width(theWidth);

                if($(this).hasClass('img-left')) {
                    $(this)
                        .removeClass('img-left')
                        .parent()
                        .addClass('img-left');
                }

                if($(this).hasClass('img-center')) {
                    $(this)
                        .removeClass('img-center')
                        .parent()
                        .addClass('img-center');
                }
                if($(this).hasClass('img-right')) {
                    $(this)
                        .removeClass('img-right')
                        .parent()
                        .addClass('img-right');
                }
                if($(this).hasClass('img-noalign')) {
                    $(this)
                        .removeClass('img-noalign')
                        .parent()
                        .addClass('img-noalign');
                }

          });

        }
    };

})(jQuery);
