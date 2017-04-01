<html>
<head>
    <meta charset="utf-8">
    <title><%= fontName %></title>
    <link href="<%= fontName %>.css" rel="stylesheet">
    <style>
        body { font-family: Gill Sans; text-align: center; background: #f7f7f7 }
        body > h1 { color: #666; margin: 1em 0 }
        .glyph { padding: 0 }
        .glyph > li { display: inline-block; margin: .3em .2em; width: 5em; height: 6.5em; background: #fff; border-radius: .5em; position: relative;float: left; }
        .glyph > li .s { display: block; margin-top: .1em; line-height: 0 }
        .glyph > li > i > span { position: absolute; top: 0; left: 0; text-align: center; width: 100%; color: rgba(0,0,0,0); line-height: 1em }
        .glyph-name { font-size: .8em; color: #666; display: block }
        .glyph-codepoint { color: #999; font-family: monospace }
    </style>
</head>
<body>
<h1><%= fontName %></h1>
<ul class="glyph"><% _.each(glyphs, function(glyph) { %><%_.each(glyph.name.split(','),function(name){%>
    <li>
        <i class="<%= className %> <%= className %>-<%= name %> <%= className %>-4x"><span><%= String.fromCodePoint(glyph.codepoint) %></span></i>
        <span class="glyph-name"><%= name %></span>
        <span class="glyph-codepoint"><%= glyph.codepoint.toString(16).toUpperCase() %></span>
    </li><%}); %><%});%>
</ul>
</body>
</html>