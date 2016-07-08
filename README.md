www.online-adventur.es
======================

Code for the website www.online-adventur.es

Prerequisites
=============
need to set a mandrill API key
* for dev export MANDRILL_API_KEY=...
* for heroku : heroku config:set MANDRILL_API_KEY=...

```bash
npm install
```

Exec
====

Prod (heroku)
```bash
foreman start
```

Dev
```bash
npm install -g nodemon
nodemon   <-- will read package.json
```

```bash
npm start
```


```bash
git push heroku master
```

Release
=======
```bash
git add .
git commit
npm run bump
git add .
git commit
git tag -a v0.0.x -m v0.0.x
git push && git push --tags
```


Notes
=====
’


Contributing
============
https://github.com/blog/1943-how-to-write-the-perfect-pull-request
