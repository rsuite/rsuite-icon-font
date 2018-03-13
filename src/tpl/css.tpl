@font-face {
    font-family: '<%= fontName %>';
    src: url('<%= fontPath %><%= fontName %>.eot');
    src: url('<%= fontPath %><%= fontName %>.eot?#iefix') format('eot'),
    url('<%= fontPath %><%= fontName %>.ttf') format('truetype'),
    url('<%= fontPath %><%= fontName %>.woff') format('woff'),
    url('<%= fontPath %><%= fontName %>.svg#<%= fontName %>') format('svg');
    font-weight: normal;
    font-style: normal;
}

[class^="<%= className %>"], [class*="<%= className %>"],.<%= className %>:before {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: "<%= fontName %>" !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.<%= className %>-lg {
    font-size: 1.3333333333333333em;
    line-height: 0.75em;
    vertical-align: -15%;
}
.<%= className %>-2x { font-size: 2em; }
.<%= className %>-3x { font-size: 3em; }
.<%= className %>-4x { font-size: 4em; }
.<%= className %>-5x { font-size: 5em; }
.<%= className %>-fw {
    width: 1.2857142857142858em;
    text-align: center;
}

<% _.each(glyphs, function(glyph) {%><%_.each(glyph.name.split(','),function(name){%>.<%= className %>-<%= name %>:before { content: "\<%= glyph.codepoint.toString(16).toLowerCase() %>" }
<%}); %><%}); %>