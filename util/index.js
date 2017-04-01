/**
 * Created by Godfery on 2017/3/31.
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const fsExtra = require('fs-extra')
const CONFIG = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/selection.json'), 'utf8'));

const ICONS_CONFIG = CONFIG.icons.reduce((ICONS_CONFIG, config) => {
    const { icon: { tags }, properties: { name, code } } = config;
    ICONS_CONFIG[name.toLowerCase().split(',')[0]] = {
        tags: name.split(',').map(text => text.trim()),
        content: code.toString(16),
    };
    return ICONS_CONFIG;
}, {});

glob('../src/svg/*.svg', {}, (err, files, c) => {
    files.forEach((filePath, i) => {
        const filName = path.basename(filePath);
        const ext = path.extname(filePath);
        const key = filName.split('.')[0].toLowerCase();
        const { content, tags } = ICONS_CONFIG[key];
        const newFileName = `u${content}-${tags.join(',').toLowerCase()}${ext}`;
        fsExtra.copy(filePath, `../src/svg2/${newFileName}`, (err) => {
            if (err) return console.error(err);
        });
    });
});