var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/theme/black.css';
export default (function (type) {
    var rootId = (type === 'ReactJS' ? '#root' : '#__next');
    return function (_a) {
        var children = _a.children, options = _a.options, wait = _a.wait;
        var _b = React.useState(false), loaded = _b[0], setLoaded = _b[1];
        React.useEffect(function () {
            if (!wait) {
                Promise.all([
                    import('reveal.js'),
                    import('reveal.js/plugin/markdown/markdown.esm.js'),
                    import('reveal.js/plugin/highlight/highlight'),
                    import('reveal.js/plugin/notes/notes'),
                ]).then(function (values) {
                    var Reveal = values[0], Markdown = values[1], Highlight = values[2], Notes = values[3];
                    var rootProp = document.querySelector(rootId);
                    if (rootProp) {
                        rootProp.className = "reveal";
                    }
                    var deck = new Reveal.default(__assign({ plugins: [Markdown.default, Notes.default, Highlight.default] }, options));
                    deck.initialize().then(function () {
                        deck.on('slidechanged', function (_a) {
                            var indexh = _a.indexh, indexv = _a.indexv, currentSlide = _a.currentSlide;
                            var urlstr = "#/".concat(indexh).concat(indexv !== 0 ? '/' + indexv : '');
                            var newpath = window.location.pathname + urlstr;
                            window.history.replaceState(null, document.title, newpath);
                        });
                    });
                    setLoaded(true);
                });
            }
        }, [wait]);
        return React.createElement("div", { className: "slides" }, loaded && children);
    };
});
