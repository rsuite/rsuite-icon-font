<% _.each(glyphs, function(glyph) {%><%_.each(glyph.name.split(','),function(name){%>.<%= lessClassNamePrev %>-<%= name %>::before {
  content: @icon-<%= name %><% if(/left(-line)?$/.test(name) && !['quote-left'].includes(name)){ %> ~'/* rtl: "@{icon-<%= name.replace(/left/,'right') %>}" */'<%} else if (/right(-line)?$/.test(name) && !['copyright','quote-right'].includes(name)) {%> ~'/* rtl: "@{icon-<%= name.replace(/right/,'left') %>}" */'<%} %>;
}
<%});%>
<%}); %>
