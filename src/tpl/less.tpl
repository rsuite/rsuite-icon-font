<% _.each(glyphs, function(glyph) {%><%_.each(glyph.name.split(','),function(name){%>.<%= lessClassNamePrev %>-<%= name %>::before{
  content: @icon-<%= name %>;
}
<%});%>
<%}); %>
