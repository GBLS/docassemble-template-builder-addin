This is a Microsoft Word Add-in (2013+) that helps with building
templates for [docassemble] guided interviews.

To download and generate for the first time:

```
git clone https://github.com/GBLS/docassemble-template-builder-addin
cd docassemble-template-builder-addin/
npm i
npm run build
```

This will compile the JavaScript and put it into the `build/static/js`
folder.  It will also create `build/index.html`, which is a straight
copy of `public/index.html`.

To deploy the app on GitHub Pages, do:

```
npm run deploy
```

After a minute or so, the new version of the site will be available at
[https://gbls.github.io/docassemble-template-builder-addin/index.html].
Check the "GitHub Pages" section of the [Settings page] for any
warning about a failure to build.  This can happen randomly; if it
does, just make some change to one of the files and deploy again.

The key TypeScript/React/Javascript file is `src/index.tsx`.  The key
HTML file is `public/index.html`.  The key CSS file is
`build/static/css/app.css`.

The `office_addin_manifest.xml` file can be imported into Office as an
add-in.  This file is also [available as a URL].

[Settings page]: https://github.com/GBLS/docassemble-template-builder-addin/settings
[https://gbls.github.io/docassemble-template-builder-addin/index.html]: https://gbls.github.io/docassemble-template-builder-addin/index.html
[docassemble]: https://docassemble.org
[available as a URL]: https://gbls.github.io/docassemble-template-builder-addin/office_addin_manifest.xml
