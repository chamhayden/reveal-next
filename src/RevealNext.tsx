import React from 'react';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/reset.css';
import 'reveal.js/plugin/highlight/monokai.css';

type Theme = "black" | "white" | "league" | "beige" | "sky" | "night" | "serif" | "simple" | "solarized" | "blood" | "moon";

const themes: Theme[] = ['black', 'white', 'league', 'beige', 'sky', 'night', 'serif', 'simple', 'solarized', 'blood', 'moon'];

type Options = {
  theme?: string;
};

export default (type: FrameworkType) => {
  return ({ children, options }: { children: React.FC, options?: Options }) => {
    const rootId = (type === 'ReactJS' ? '#root' : '#__next');
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
      let useTheme = options && options.theme ? options.theme : 'black';
      if (window) {
        themes.forEach(theme => {
          if (window.location.href.includes(`theme=${theme}`)) {
            useTheme = theme;
          }
        })
      }
      Promise.all([
        import('reveal.js'),
        import('reveal.js/plugin/markdown/markdown.esm.js'),
        import('reveal.js/plugin/highlight/highlight'),
        import('reveal.js/plugin/notes/notes'),
        import('./themes/Reveal-' + useTheme),
      ]).then(values => {
        const [Reveal, Markdown, Highlight, Notes] = values;
        const rootProp = document.querySelector(rootId);
        if (rootProp) {
          rootProp.className = "reveal";
        }
        let deck = new Reveal.default({
           plugins: [ Markdown.default, Notes.default, Highlight.default ]
        })
        deck.initialize().then(() => {
          deck.on('slidechanged', ({ indexh, indexv, currentSlide }: SlideChangeProps) => {
            const urlstr = `#/${indexh}${indexv !== 0 ? '/' + indexv : ''}`
            const newpath = window.location.pathname + urlstr;
            window.history.replaceState(null, document.title, newpath);
          });
        });
        setLoaded(true);
      });
    }, []);
    return <div className="slides">{loaded && children}</div>;
  }  
}
