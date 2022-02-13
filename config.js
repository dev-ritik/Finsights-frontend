const path = require('path');

const root = path.join(__dirname);

const config = {
    rootDir:                root,
    // Targets ========================================================
    serveDir:               path.join(root, '.serve'),
    distDir:                path.join(root, 'dist'),
    clientManifestFile:     'manifest.webpack.json',
    clientStatsFile:        'stats.webpack.json',

    // Source Directory ===============================================
    srcDir:                 path.join(root, 'app'),
    srcServerDir:           path.join(root, 'server'),

    // HTML Layout ====================================================
    srcHtmlLayout:          path.join(root, 'app', 'index.html'),

    // Site Config ====================================================
    siteTitle:              'Finsights',
    siteDescription:        'For Passive investing',
    siteCannonicalUrl:      'https://finsights.ml',
    siteKeywords:           'Stock Market equity NSE BSE',
    scssIncludes:           []
}

module.exports = config;