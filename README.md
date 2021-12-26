This library allows for the usage of the Reveal.js within either a NextJS or ReactJS framework. In short, it is a benign wrapper of (reveal.js)[https://revealjs.com/] that allows you to build slides in a componentized fashion. My recommendation would be to use NextJS for the simple directory routing structure they have.

A richer library of individual reveal.js components and abstractions is still in progress. In the meantime, using the raw/vanilla HTML components is adequate.

## Installation

### Setting up ReactJS or NextJS

If you don't already have a ReactJS or NextJS project, you can create one:
```bash
npx create-react-app myapp
npx create-next-app myapp
```

### Adding reveal-react

With npm:
```bash
npm install reveal-react
```

With yarn:
```bash
yarn add reveal-react
```

## Usage

### With ReactJS
```javascript
import { RevealReact } from 'reveal-react';

export default function Component() {
  return (
    <RevealReact>
      <section>
        <h2>Title</h2>
        <p>Body</p>
      </section>
      <section>
        <h2>Title</h2>
        <p>Body</p>
      </section>
    </RevealReact> 
  )
}
```

### With NextJS
```javascript
import { RevealNext } from 'reveal-react';

export default function Component() {
  return (
    <RevealNext>
      <section>
        <h2>Title</h2>
        <p>Body</p>
      </section>
      <section>
        <h2>Title</h2>
        <p>Body</p>
      </section>
    </RevealNext> 
  )
}
```
