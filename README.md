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

## Using a local server

The add-in needs to operate over HTTPS.  If you want to run `npm run
start` in order to use a local web server to host the application, you
need to create certificates.  To create these certificates, follow
these steps:

```
mkdir certs
cd certs
openssl genrsa -out ca.key 2048
openssl req -x509 -new -nodes -key ca.key -sha256 -days 1024 -out ca.pem
```

The last command will ask you for some information.  Put in some
information like the following.  The important line is the "Common
Name," which should match whatever the server name will be (probably
`localhost:8080`, but this can vary by platform).

```
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:MA
Locality Name (eg, city) []:Boston
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Greater Boston Legal Services
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:localhost
Email Address []:qsteenhuis@gbls.org
```

Convert the `.pem` to a `.crt` because you might need it:

```
openssl x509 -in ca.pem -inform PEM -out ca.crt
```

Then, create a private key:

```
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr
```

The second command will ask for information again.  Put in the same
information as before.

```
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:MA
Locality Name (eg, city) []:Boston
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Greater Boston Legal Services
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:localhost
Email Address []:qsteenhuis@gbls.org

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

```
openssl x509 -req -in server.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out server.crt -days 730 -sha256
```

You can then install `ca.crt` as a certificate for a private
"certificate authority" in your web browser.  For example, in Firefox
you can go to Preferences, Privacy & Security, View Certificates,
Authorities, and "Import" `ca.crt`.  In Chrome, you can go to
Settings, Manage Certificates, Authorities, and "Import" `ca.crt`.
When asked, indicate that you trust the certificate for identifying
web sites.

In the Configuration of your docassemble server, you will need to set:

```
office addin url: https://localhost:8080
```

(By default, the only server that docassemble will communicate with is
https://gbls.github.io.)

A manifest file that is configured to work with https://localhost:8080
can be found at [`build/office_addin_manifest_local.xml`].

[Settings page]: https://github.com/GBLS/docassemble-template-builder-addin/settings
[https://gbls.github.io/docassemble-template-builder-addin/index.html]: https://gbls.github.io/docassemble-template-builder-addin/index.html
[docassemble]: https://docassemble.org
[available as a URL]: https://gbls.github.io/docassemble-template-builder-addin/office_addin_manifest.xml
[`build/office_addin_manifest_local.xml`]: https://gbls.github.io/docassemble-template-builder-addin/office_addin_manifest_local.xml
[howto]: https://datacenteroverlords.com/2012/03/01/creating-your-own-ssl-certificate-authority/
