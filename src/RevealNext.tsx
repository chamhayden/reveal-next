import React from 'react';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/theme/black.css';
//import 'reveal.js/plugin/highlight/monokai.css';

type FrameworkType = 'ReactJS' | 'NextJS'

export default (type: FrameworkType) => {
  const rootId = (type === 'ReactJS' ? '#root' : '#__next');
  return ({ children, options, wait }: { children: React.FC, options: any, wait: any }) => {
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
      if (!wait) {
        Promise.all([
          import('reveal.js'),
          import('reveal.js/plugin/markdown/markdown.esm.js'),
          import('reveal.js/plugin/highlight/highlight'),
          import('reveal.js/plugin/notes/notes'),
        ]).then(values => {
          const [Reveal, Markdown, Highlight, Notes] = values;
          const rootProp = document.querySelector(rootId);
          if (rootProp) {
            rootProp.className = "reveal";
          }
          let deck = new Reveal.default({
             plugins: [ Markdown.default, Notes.default, Highlight.default ],
             ...options,
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
      }
    }, [wait]);
    return <div className="slides">{loaded && children}</div>;
  }  
}
