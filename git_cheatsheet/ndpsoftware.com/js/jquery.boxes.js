(function($) {

    $.fn.boxes = function(trackFn) {

        var settings = {
            height: 180,
            width: 960 / 5
        };

        return $(this).each(function() {

            var $this = $(this);
            var mouseMoving = true;
            $this.mousemove(function() {
                mouseMoving = true;
            });

            $this.addClass('boxes');
            $this.children().wrap('<div class="box"></div>');
            $this.find('.double-wide').closest('.box').addClass('double-wide');

            var $new = $('<div class="box">');

            function slideInNew() {
                if (mouseMoving || $this.find('.focused').length) {
                    mouseMoving = false;
                    setTimeout(slideInNew, 5000);
                } else {
                    var $last = $this.find('.box:last');

                    $new.css({width: 0, backgroundColor: $last.css('backgroundColor')}).insertAfter($this.find('.box:nth(3)'));

                    $new.animate({width: settings.width}, 1000, function() {
                        $last.insertAfter($new);
                        $new.remove();
                        trackFn('rotate_box');
                        setTimeout(slideInNew, 9000);
                    });
                }
            }

            slideInNew();

            $this.find('.box').click(
                                    function() {
                                        var wasFocused = $(this).hasClass('focused');
                                        $this.find('.focused').trigger('blur').removeClass('focused');
                                        if (wasFocused) {
                                            $(this).trigger('blur').removeClass('focused');
                                            trackFn('blur_box');
                                        } else {
                                            $(this).trigger('focus').addClass('focused');
                                            trackFn('focus_box', $(this).find('h3').text());
                                        }
                                    }).bind('focus',
                                           function(e) {
//                                               console.log('focus %o', this);
                                               $(this).attr('data-original-ht', $(this).innerHeight());
                                               $(this).attr('data-original-wd', $(this).innerWidth());
                                               var rowHt = $(this).find('[data-height]').attr('data-height');
                                               var rowWidth = $(this).find('[data-width]').attr('data-width');

                                               var css = {};
                                               if ('2' == rowWidth) {
                                                   css.width = settings.width * 2 - 2
                                               }
                                               if ('2' == rowHt) {
                                                   css.height = settings.height * 2 - 2
                                               }
                                               if ('3' == rowHt) {
                                                   css.height = settings.height * 3 - 6
                                               }
                                               $(this).find('>div').css('opacity', 0).css(css).animate({opacity:1.0}, 'slow');

                                           }).bind('blur', function(e) {

                var css = {};
                css.width = '' + $(this).attr('data-original-wd') + 'px';
                css.height = '' + $(this).attr('data-original-ht') + 'px';
                $(this).find('>div').fadeTo(0, 'slow', function() {
                    $(this).css(css, 'slow')
                });
            });

            Csster.style({
                '.boxes': {
                    padding: 0,
                    has: clearfix(),
                    '> .box': {
                        overflow: 'hidden',
                        display: 'block',
                        'float': 'left',
                        margin: 0,
                        padding: 0,
                        height: settings.height - 2,
                        width: settings.width - 2,
                        border: '1px solid transparent',
                        '&.double-wide': {width: settings.width * 2 - 2}
                    }
                }
            });

        });

    };

})(jQuery);
