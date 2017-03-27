@font-face {
    font-family: '<%= fontName %>';
    src: url('@{icon-font-path}/<%= fontName %>.eot');
    src: url('@{icon-font-path}/<%= fontName %>.eot?#iefix') format('eot'),
    url('@{icon-font-path}/<%= fontName %>.ttf') format('truetype'),
    url('@{icon-font-path}/<%= fontName %>.woff') format('woff'),
    url('@{icon-font-path}/<%= fontName %>.svg#<%= fontName %>') format('svg');
    font-weight: normal;
    font-style: normal;
}

.<%= className %>:before {
    //* use !important to prevent issues with browser extensions that change fonts */
    font-family: "<%= fontName %>" !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    //* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

<% _.each(glyphs, function(glyph) {%>.<%= className %>-<%= glyph.name %>{
    &:before {
        content: @icon-<%= glyph.name %>;
    }
}
<%}); %>