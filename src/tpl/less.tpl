/* stylelint-disable */
@font-face {
  font-family: @font-family-icon;
  src: url('@{icon-font-path}/<%= fontName %>.eot');
  src: url('@{icon-font-path}/<%= fontName %>.eot?#iefix') format('eot'),
  url('@{icon-font-path}/<%= fontName %>.ttf') format('truetype'),
  url('@{icon-font-path}/<%= fontName %>.woff') format('woff'),
  url('@{icon-font-path}/<%= fontName %>.svg#<%= fontName %>') format('svg');
  font-weight: normal;
  font-style: normal;
}

.<%= className %> {
  //* use !important to prevent issues with browser extensions that change fonts */
  font-family: @font-family-icon !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  display: inline-block;
  text-transform: none;
  font-size: 14px;
  line-height: 1;
  //* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

<% _.each(glyphs, function(glyph) {%><%_.each(glyph.name.split(','),function(name){%>.<%= className %>-<%= name %>{
  &::before {
    content: @icon-<%= name %>;
  }
}

<%});%>
<%}); %>
