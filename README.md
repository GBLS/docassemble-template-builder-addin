This is a Microsoft Word Add-in (2013+) that helps with building
templates for [docassemble] guided interviews.

To download and generate for the first time:

```
git clone https://github.com/GBLS/docassemble-template-builder-addin
cd docassemble-template-builder-addin/
git checkout gh-pages
npm i
npm run build
```

Then, after making changes, do:

```
npm run build
git add .
git commit -m "your commit message"
git push
```

After a minute or so, the new version of the site will be available at
[https://gbls.github.io/docassemble-template-builder-addin/index.html].
Check the "GitHub Pages" section of the [Settings page] for any
warning about a failure to build.  This can happen randomly; if it
does, just make some change to one of the files and add-commit-push
the branch again.

The key HTML file is `index.html`.  The key JavaScript file is
`src/js/index.js`.

The `npm run build` command creates the files `dist/polyfill.js` and
`dist/app.js`.  The latter file is a transformation of
`src/js/index.js`.  Both of these files are referenced at the end of
`index.html`. The `npm run build` process also produces
`dist/index.html`, but you should ignore that file.

The `office_addin_manifest.xml` file can be imported into Office as an
add-in.  This file is also [available as a URL].

# TODO

- Package this the "proper" way according to webpack standards.

[Settings page]: https://github.com/GBLS/docassemble-template-builder-addin/settings
[https://gbls.github.io/docassemble-template-builder-addin/index.html]: https://gbls.github.io/docassemble-template-builder-addin/index.html
[docassemble]: https://docassemble.org
[available as a URL]: https://gbls.github.io/docassemble-template-builder-addin/office_addin_manifest.xml
