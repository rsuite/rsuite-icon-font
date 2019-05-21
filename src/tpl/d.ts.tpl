type IconNames = <% _.each(glyphs, function(glyph) {%><%_.each(glyph.name.split(','),function(name){%>
  |  '<%= name %>'<%});%><%}); %>;
