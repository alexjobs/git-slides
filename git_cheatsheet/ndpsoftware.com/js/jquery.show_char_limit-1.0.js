/**
* Display interactive character limit feedback for text field or text area.
* see http://ndpsoftware.com/show_char_limit.php
*/
jQuery.fn.show_char_limit = function(limit, opts) {

  if (!opts.status_element && !opts.status_element_suffix) {
    throw new Exception("Must provide status_element or status_element_suffix");
  }
  
  var o = jQuery.extend({
    error_class: 'error',
    status_style: 'text'
  }, opts);
  
  var show_limit = function(src) {
    var chars_typed = jQuery(src).val().length;
    var left = limit - chars_typed;
    var msg;
    if (o.status_style == 'chars_typed') {
      msg = "" + chars_typed;
    } else if (o.status_style == 'chars_left') {
      msg = "" + left;
    } else {
       var status = left >= 0 ? 'left' : 'over';
       var unit = (Math.abs(left) != 1 ? "characters" : "character");
     msg = "" + Math.abs(left) + " " + unit + " " + status;
    }
    var e = o.status_element ? o.status_element : ("#" + jQuery(src).attr('id') + o.status_element_suffix);
    jQuery(e).html(msg);
    if (o.error_element || o.error_element_suffix) {
    var e = o.error_element ? o.error_element : ("#" + jQuery(src).attr('id') + o.error_element_suffix);
    if (left < 0) {
      jQuery(e).addClass(o.error_class);
    } else {
      jQuery(e).removeClass(o.error_class);
    }
    }
  };
  
  return this.each(function() {
    show_limit(this);
    jQuery(this).keyup(function() {
    show_limit(this);
    });
  });
};
