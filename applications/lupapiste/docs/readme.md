# Deploying to Clojars

1. Run applications\lupapiste\build\build.cmd
  * Script generates
    1. applications\lupapiste\build\package\resources\public\oskari\js\oskarimap.js
    2. Copies oskarimap.css to applications\lupapiste\build\package\resources\public\oskari\css\
  * Script also runs `lein install` to update your dependencies. Optionally you can use [Leiningen checkouts](https://github.com/technomancy/leiningen/blob/stable/doc/TUTORIAL.md#user-content-checkout-dependencies).
2. In applications/lupapiste/build/package folder:
  1. Bump version numbers in fullmap.html
  2. Bump version number in project.clj
3. Push new version to 'lupapiste' branch in Github
4. Lupapiste's CI-server polls the branch in 5 minutes interval and deploys updated version to Clojars as JAR package.
5. After a coffee break, check that new version is updated to [Clojars](https://clojars.org/lupapiste/oskari)
