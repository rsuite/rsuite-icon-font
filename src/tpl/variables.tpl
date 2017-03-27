<% _.each(glyphs, function(glyph) {%>@icon-<%= glyph.name %>:"\<%= glyph.codepoint.toString(16).toUpperCase() %>";
<%}); %>