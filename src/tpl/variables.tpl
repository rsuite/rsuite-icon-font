<% _.each(glyphs, function(glyph) {%><%_.each(glyph.name.split(','),function(name){%>@icon-<%= name %>:'\<%= glyph.codepoint.toString(16).toLocaleLowerCase() %>';
<%});%><%}); %>
