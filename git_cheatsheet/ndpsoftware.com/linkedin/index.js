// Copyright(c) 2011 Andrew J. Peterson. All Rights Reserved
var currentColorBy = 'type';


function linearMappingFns(aMin, aMax, bMin, bMax) {
  var aPerb = (aMax - aMin) / (bMax - bMin); // A's per B
  return {
    a2b: function(a) {
      return (a - aMin) / aPerb + bMin;
    },
    b2a: function(b) {
      return (b - bMin) * aPerb + aMin;
    }
  }
}

var ArrayUtils = {
  uniq:function(a) {
    var result = [];
    for (var i = 0; i < a.length; i++) {
      if (result.indexOf(a[i]) == -1) result.push(a[i]);
    }
    return result;
  }
}

var ObjectUtils = {
  keys: function(o) {
    var r = [];
    for (var k in o) r.push(k);
    return r;
  }
}

function mixinJQueryListening(cls) {
  $.extend(cls.prototype, {
    bind: function(a, b, c) {
      $(this).bind(a, b, c)
    },
    unbind: function(a, b) {
      $(this).unbind(a, b)
    },
    trigger: function(a, b, c) {
      $(this).trigger(a, b, c)
    }
  });
}

function backgroundGradient(start, color1, color2, etc) {
  /*
   background-image: linear-gradient(left , #785050 15%, #FFFFFF 100%, #FF0000 100%, #FF1B1B 100%);
   background-image: -o-linear-gradient(left , #785050 15%, #FFFFFF 100%, #FF0000 100%, #FF1B1B 100%);
   background-image: -moz-linear-gradient(left , #785050 15%, #FFFFFF 100%, #FF0000 100%, #FF1B1B 100%);
   background-image: -webkit-linear-gradient(left , #785050 15%, #FFFFFF 100%, #FF0000 100%, #FF1B1B 100%);
   background-image: -ms-linear-gradient(left , #785050 15%, #FFFFFF 100%, #FF0000 100%, #FF1B1B 100%);
   background-image: -webkit-gradient(
   linear,
   left bottom,
   right bottom,
   color-stop(0.15, #785050),
   color-stop(1, #FFFFFF),
   color-stop(1, #FF0000),
   color-stop(1, #FF1B1B)
   );

   */
  var result, prefix = '';
  if (Csster.browser.webkit) {
    prefix = '-webkit-';
  } else if (Csster.browser.mozilla) {
    prefix = '-moz-';
  } else if (Csster.browser.msie) {
    prefix = '-ms-';
  }
  result = prefix + 'linear-gradient(' + start;
  for (var i = 1; i < arguments.length; i++) {
    result += ',' + arguments[i] + ' ' + 100 / arguments.length * i + '%';
  }
  result += ')';


  if (Csster.browser.webkit && Csster.browser.version == "533.21.1") {
    if (start == 'left') {
      start = 'left bottom, right bottom';
    } else if (start == 'top') {
      start = 'left top, left bottom';
    }
    result = '-webkit-gradient(linear,' + start;
    for (var i = 1; i < arguments.length; i++) {
      result += ',color-stop(' + 100 / arguments.length * i + '%,' + arguments[i] + ')';
    }
    result += ')';
  }

  return {
    backgroundColor: arguments[1],
    backgroundImage: result
  };

}

function text2html(s) {
  return s ? '<p>' + s.replace(/\n/g, '<br/>') + '</p>' : '';
}

function trackEvent(action, optLabel, value) {
  var _gaq = _gaq || [];
  _gaq.push(['_trackEvent', 'LinkedIn timeline', action, optLabel, value]);
}

var StringHelpers = {
  underline: function(s) {
    return s.toLowerCase().replace(/[^0-9a-z]+/g, '_')
  }
}

Csster.style({
  '.legend': {
//    'float': 'right',
    width: 200,
    padding: 3,
    'li': {
      position: 'relative',
      padding: 0,
      paddingLeft: 20,
//      textAlign: 'right',
      color: '#555',
      font: '13px/16px arial',
//      textAlign: 'right',
      cursor: 'pointer',
      display: 'block',
      margin:0,
      'span.swatch': {
        height: 12, width: 12,
        border: '1px solid #000',
        display: 'block',
        position: 'absolute',
        top: 2, left: 0
      }
    }
  }
});

function mapValuesToColors(values) {
  var colors = ColorFactory.qualitative('#47a3d1', values.length)
  var result = {};
  for (var i = 0; i < values.length; i++) {
    result[values[i]] = values[i] == '?' ? colors[i].saturate(-100) : colors[i]; // ? is undefined
  }
  return result;
}

$.fn.legend = function(colorMap, key) {
  var $this = $(this).empty();
  var legendClass = 'legend_' + key;
  var $legend = $('<ul></ul>').addClass('legend').addClass(legendClass);
  $legend.appendTo($this);
  $this.mouseout(function() {
    $legend.find('li.highlighted').removeClass('highlighted');
    $this.trigger('highlight', [key, null])
  });

  var css = {};
  css['.' + legendClass] = {
    display: 'block', margin:0,padding: 0
  };
  css['.' + legendClass + ' li'] = {
  };
  css['.' + legendClass + ' li.highlighted'] = {
    color: '#000'
  };
  for (t in colorMap) {
    var color = colorMap[t];
    var cls = key + '_' + StringHelpers.underline(t);
    $('<li>').addClass(cls).text(t).bind('mouseover click', t,
            function(e) {
              if (!$(this).hasClass('highlighted')) {
                $legend.find('li.highlighted').removeClass('highlighted');
                $(this).addClass('highlighted');
                $this.trigger('highlight', [key, e.data]);
              }
            }, t).appendTo($legend).append('<span class="swatch"></span>');

    css['.' + legendClass + ' li.' + cls + ' span.swatch'] = {
      backgroundColor: color
    };
  }
  Csster.style(css);

  return this;
}


var attrLabels = {
  type:'Type',
  title:'Title',
  industry:'Industry',
  companySize:'Company Size',
  companyName:'Company Name', companyType:'Company Type'
};


$.fn.timeline = function(events, options) {

  var $this = $(this);
  $this.empty().addClass('timeline');
  var $legendHolder = options.$legendHolder;

  // colorBy ==> values => values/colors => event/color
  var colorBy = options.colorBy;

  $this.bind('colorBy', function(e, attr) {
    if (typeof lastColorByClass !== 'undefined') $this.removeClass(lastColorByClass);
    lastColorByClass = 'color_by_' + attr;
    $this.addClass(lastColorByClass);

    var colorMap = mapValuesToColors(events.uniqueValues(attr));
//    event2color
//    value2events
    $legendHolder.show().legend(colorMap, attr).bind('highlight', function(e, key, value) {
      $timeline.find('.event.highlighted').removeClass('highlighted');
      if (value) {
        $timeline.find('.event.' + key + '_' + StringHelpers.underline(value)).addClass('highlighted');
        $timeline.find('.event').css('opacity', .3);
        $timeline.find('.event.highlighted').css('opacity', 1);
      } else {
        $timeline.find('.event').css('opacity', 1);
      }
    });


    var css = {};
    for (t in colorMap) {
      var color = colorMap[t];
      var cls = attr + '_' + StringHelpers.underline(t);
      css['.timeline.color_by_' + attr + ' .chart .event.' + cls] = {
        has: backgroundGradient('top', color, color.lighten(10), color.darken(10))
      };
      css['.timeline.color_by_' + attr + ' .chart .event.active.' + cls] = {
        backgroundColor: color.darken(10)
      };
      css['.timeline.color_by_' + attr + ' .chart .event.highlighted.' + cls] = {
        backgroundColor: color,
        borderColor: color
      };
    }
    Csster.style(css);
  })


  options = $.extend({},
          options,
          {
            width: $this.width(),
            height: 20,
            eventClasses: function(e) {
              cls = [];
              for (var k in attrLabels) {
                cls.push(k + '_' + StringHelpers.underline(e[k]));
              }
              return cls.join(' ');
            },
            eventStyling: function(e) {
              return {
              }
            }
          }
  );
  //console.log('options', options, $this, this);
  var range = events.range();
  var year2x = linearMappingFns(range.min.getTime(), range.max.getTime(), 0, options.width).a2b;
  var $timeline = $('<div>').appendTo($this);
  var $chart = $('<div>').addClass('chart').css({position:'relative',height:options.height}).appendTo($timeline);
  var yOffset = 0, prevEnd = null;
  events.each(function(i, e) {
    if (!e.start) return;
    if (prevEnd && e.start < prevEnd) yOffset += options.height + 5;
    var $e = $('<div>')
            .addClass('event')
//            .addClass(e.data.company ? 'company' : 'school')
            .addClass(options.eventClasses(e))
            .css({
              position: 'absolute',
              top: yOffset,
              left: year2x(e.start.getTime()),
              right: options.width - year2x(e.end.getTime()),
              width: '*',
              minWidth: 5,
              height: options.height,
              opacity: .5,
              overflow: 'hidden'
            })
            .css(options.eventStyling(e));
    $e.infoPopup(function() {
    }, {});
    $e.hover(
            function() {
              e.trigger('showTooltip');
            },
            function() {
              e.trigger('hideTooltip');
            }).click(function() {
              e.trigger('showTooltip');
            });
    $e.appendTo($chart);

    e.bind('showTooltip', function() {
      if (typeof currentE == 'undefined' || currentE !== e) {
        if (typeof currentE !== 'undefined') {
          currentE.trigger('hideTooltip');
        }
        currentE = e;
        $e.addClass('active').css({opacity: 1});
      }
    });
//    e.bind('showTooltip', function() {
//      trackEvent('showTooltip', e.data.company ? 'company' : 'school');
//    });
    e.bind('hideTooltip', function() {
      $e.removeClass('active').css({opacity: .5});
    });

    var $detail = $('<div>').addClass('tooltip').hide().appendTo($this).css({'position':'absolute', right:prevEnd, top:yOffset + 110});
    $detail.linkedInStyleEvent(e);

    prevEnd = e.end;
  });

  var $scale = $('<div>').addClass('scale').css('margin-top', yOffset).appendTo($timeline);
  $('<span></span>').addClass('min').text('' + range.min.getFullYear()).appendTo($scale);
  $('<span></span>').addClass('max').text('' + range.max.getFullYear()).appendTo($scale);

//  var $details = $('<div>').addClass('details').appendTo($timeline);
  events.each(function(i, e) {
//    var $detail = $('<div>').hide().appendTo($details);
//    $detail.linkedInStyleEvent(e);
  });

  if (options.colorBy) {
    $('.timeline').trigger('colorBy', colorBy);
  }

  return this;
}

// draw and position window
// events to show and hide

// adds "showTooltip" and "hideTooltip" actions
$.fn.infoPopup = function(contentFn, options) {
  options = $.extend({}, options);

  return this;
}

$.fn.linkedInStyleEvent = function(e) {
  var $detail = $(this).addClass('detail');
  if (e.data.title) $('<h2>').text(e.data.title).appendTo($detail);
  if (e.data.degree) $('<h2>').text(e.data.degree).appendTo($detail);
  if (e.data.fieldOfStudy) $('<h2>').text(e.data.fieldOfStudy).appendTo($detail);
  if (e.name) $('<h3>').text(e.name).appendTo($detail);
  var subs = [];
  if (e.data.company) {
    if (e.data.company.type) subs.push(e.data.company.type);
    if (e.data.company.size) subs.push(e.data.company.size);
    if (e.data.company.industry) subs.push(e.data.company.industry);
    $('<h4>').text(subs.join('; ')).appendTo($detail);
  }
  var years = [];
  if (e.start) years.push(e.start.display);
  if (e.end) years.push(e.end.display);
  $('<h5>').html(years.join(' &mdash; ')).appendTo($detail);

  $('<div>').html(text2html(e.data.summary)).appendTo($detail);

  e.bind('showTooltip', function() {
    $('.detail').stop(true, true);
    $detail.fadeIn();
  });
  e.bind('hideTooltip', function() {
    $detail.hide();
  });

}


$.fn.linkedInViz = function(result, colorBy) {
  $(this).empty();
  var $v = $('<div>').addClass('linkedInViz').appendTo(this);
  if (result.values[0].pictureUrl) {
    $('<img>')
            .attr('src', result.values[0].pictureUrl)
            .css({
              'float': 'left',
              padding: 2,
              marginRight: 10,
              border: '1px solid #ccc'})
            .appendTo($v);
  }
  var $legendHolder = $('<div></div>').addClass('legend_holder');
  $('<h2>').text(result.values[0].firstName + ' ' + result.values[0].lastName).appendTo($v);
  $('<h3>').text(result.values[0].headline).appendTo($v);

  var events = new EventList(result);
  $('<div>').appendTo($v).timeline(events, {$legendHolder: $legendHolder, colorBy: colorBy});
  $legendHolder.appendTo($v);
  return this;
}


function Event(name, start, end, data) {
  this.name = name;
  this.start = Event.dateFromLinkedInJson(start);

  var endDate = end;
  if (!endDate) {
    var now = new Date();
    endDate = { year: now.getFullYear(), month: (now).getMonth() + 1 };
  }
  endDate = Event.dateFromLinkedInJson(endDate);
  this.end = endDate;

  this.data = data;

  this.type = this.data.company ? 'Company' : 'School';
  this.buildAttr('title', '$.title');
  this.buildAttr('industry', '$.company.industry');
  this.buildAttr('companySize', '$.company.size');
  this.buildAttr('companyName', '$.company.name');
  this.buildAttr('companyType', '$.company.type');
}

Event.prototype.attr = function(key) {
  return this[key];
}

Event.prototype.buildAttr = function(key, path) {
  var d = jsonPath(this.data, path);
  this[key] = d && d[0] || '?';
}

mixinJQueryListening(Event);

var MONTHS = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];
Event.dateFromLinkedInJson = function(json) {
  if (typeof json == 'undefined' || !json) return null;
  var date = new Date(json.year, (json.month || 7) - 1);
  if (json.month) {
    date.display = MONTHS[date.getMonth()] + ' ' + date.getFullYear();
    date.precision = 'month';
  } else {
    date.display = date.getFullYear();
    date.precision = 'year';
  }
  return date;
}

function EventList(liResults) {
  var positions = liResults.values[0].positions.values;
  this.items = [];
  if (!positions) return;
  var now = new Date();
  for (var i = 0; i < positions.length; i++) {
    this.items.unshift(new Event(positions[i].company.name, positions[i].startDate, positions[i].endDate, positions[i]));
  }

  var educations = liResults.values[0].educations.values;
  for (i = 0; i < (educations && educations.length || 0); educations++) {
    this.items.unshift(new Event(educations[i].schoolName, educations[i].startDate, educations[i].endDate, educations[i]));
  }
}

EventList.prototype.each = function(fn) {
  return $.each(this.items, fn);
}

EventList.prototype.range = function() {
  var dates = jsonPath(this.items, '$..[start,end]');
  dates = $.map(dates, function(d) {
    return d ? d.getTime() : new Date();
  });
  var min = Math.min.apply(1, dates);
  var max = Math.max.apply(1, dates);
  return { min: new Date(min),
    max: new Date(max),
    range: max - min };
}

EventList.prototype.uniqueValues = function(attr) {
  var values = $.map(this.items, function(e) {
    return e[attr]
  });
  values = ArrayUtils.uniq(values);
  values = values.sort();
  if (values[0] == '?') {
    values.shift();
    values.push('?');
  }
  return values;
}


function onLinkedInLogin() {

  trackEvent('LinkedIn SSO');

  IN.API.Profile("me")
          .fields(["id", "firstName", "lastName", "pictureUrl","headline",
    "industry", "positions","educations"])
          .result(function(result) {
            $('#signs h3').text('Welcome, ' + result.values[0].firstName + ' ' + result.values[0].lastName);
            $('#signs .content').empty();

            $('<a href="#" class="btn-action" id="connections"><span>View Connections</span></a>').appendTo($('#connections_holder').css('marginBottom', 20));
            $('<a href="#" style="display: block; font-size: 10px; float: right" onclick="IN.User.logout(function() { })">Sign out</a>').appendTo($('#signs .content'));


            if (result.values[0].pictureUrl) {
              $('<img style="height: 40px; width: 40px; margin-bottom: 10px;">').attr('src', result.values[0].pictureUrl).prependTo($('#signs .content'));
            } else {
              $('<p>Signed in.</p>').appendTo($('#signs .content'));
            }
            if (result.values[0].id !== 'EbeY8HiVZM') {
              $('#profile_timeline').linkedInViz(result, currentColorBy);
            }
            IN.API.Connections("me")
                    .fields(['id','firstName','lastName'])
                    .result(function(connections) {
                      for (var i = connections.values.length - 1; i >= 0; i--) {
                        if (connections.values[i].firstName == 'private' && connections.values[i].lastName == 'private') {
                          delete connections.values[i];
                        }
                      }
                      $('#connections').click(
                              function() {
                                trackEvent('click', 'Connections button');
                              }).itemChooser(connections)
                              .bind('choose', function(e, id) {
                                trackEvent('click', 'a connection');
                                IN.API.Profile(id)
                                        .fields(["id", "firstName", "lastName", "pictureUrl","headline", "industry", "positions","educations"])
                                        .result(function(result) {
                                          $('#profile_timeline').linkedInViz(result, currentColorBy);
                                        });
                              });
                    });

          });

}


Csster.addPropertyNames('overflow-y');

Csster.style({
  '.item_chooser': {
  },
  '.item_chooser_window': {
    position:'fixed',
    top: '5%',
    left: '50%',
    marginLeft: '-45%',
    height:'600',
    maxHeight: '90%',
    overflowY: 'auto',
    width:'90%',
    border: '10px solid #999',
    backgroundColor: '#fff',
    zIndex: 1000,
    has: [roundedCorners(20), boxShadow([3,3], 15, '#eee')],
    ul: {
      margin: 0,
      padding: '10px 20px',
      li: {
        'float': 'left',
        font: '12px/20px arial',
        paddingRight: 10,
        '&.index': {
          fontWeight: 'bold',
          backgroundColor: '#50a1cb',
          color:'#fff',
          has: roundedCorners(10),
          width: 0,
          padding: '0 12px 0 3px',
          marginRight: 3
        },
        a: {
          textDecoration: 'none',
          color: '#333',
          em: {
            fontWeight: 'bold',
            fontStyle: 'normal'
          },
          '&:hover': {
            color: '#50a1cb'.darken(30),
            textDecoration: 'underline'
          }
        }
      }
    }
  }
});

$.fn.itemChooser = function(items) {

  var $this = $(this);
  $this.addClass('item_chooser');

  var items = $.map(jsonPath(items, '$..values[*]'), function(v) {
    return {label: v.firstName + '<em>' + v.lastName + '</em>', id: v.id, index: v.lastName.substr(0, 1).toUpperCase()}
  });

//  console.log(items);
  $this.bind('click', function() {
    $this.trigger('showChooser');
  });

  $this.bind('showChooser', function() {
    var $chooser = $('<div>')
            .addClass('item_chooser_window')
            .prependTo($('body'));

    $ul = $('<ul>').appendTo($chooser);
    var lastIndex = null;
    $.each(items, function(i, item) {
      if (item.index != lastIndex) {
        $('<li>').text(item.index).addClass('index').appendTo($ul);
        lastIndex = item.index;
      }
      var $li = $('<li>').appendTo($ul);
      $('<a>').html(item.label)
              .attr('href', '#')
              .click(
              function() {
                $this.trigger('choose', item.id);
              }).appendTo($li);
    });

    $chooser.bind('click', function() {
      $chooser.fadeOut('fast', function() {
        $chooser.remove();
      });
    });


  });

  return this;
}

$(function() {

  Csster.style({
    '#color': {
      ul: {
        paddingTop:0, paddingBottom: 0,
        marginTop:0, marginBottom: 0,
        li: {
          paddingTop:0, paddingBottom: 0,
          font: '14px/20px arial',
          '&.current': {
            font: 'bold 14px/20px arial'
          },
          a: {
            textDecoration: 'none'
          }
        }
      }
    }
  })

  var $colorBy = $('<ul></ul>').appendTo($('#color'));
  for (var a in attrLabels) {
    $('<li><a href="">' + attrLabels[a] + '</a></li>').appendTo($colorBy).bind('click', a,
            function(e) {
              if (currentColorBy != e.data) {
                $colorBy.find(".current").removeClass('current');
                $(this).addClass('current');
                currentColorBy = e.data;
                $('.timeline').trigger('colorBy', currentColorBy);
              }
              return false;
            }).addClass(a == currentColorBy ? 'current' : null);
    ;
  }
});

function onLinkedInLoad() {
  IN.Event.on(IN, "auth", function() {
    onLinkedInLogin();
  });
  IN.Event.on(IN, "logout", function() {
    document.location.reload();
  });
}

