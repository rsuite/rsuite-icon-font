[ <%= glyphs.reduce((glyphs,glyph)=>{glyphs.push(...glyph.name.split(','));return glyphs;},[]).sort((a, b) => a.localeCompare(b)).map((glyph)=>`"${glyph}"`).join(',') %>]