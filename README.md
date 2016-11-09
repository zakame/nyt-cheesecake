# CheeseCake: a modern sampler for New York Times feeds

Just a weekend hack for #nytfeedfun, see [Dave Winer's challenge][0].

[0]: http://scripting.com/2014/05/16/?#a1400253877

Built with [Mojolicious][1], [ReactJS][2], and some boredom.  In fact,
it is mainly a way for me to learn more about AngularJS and other
frontend stuff, while retaining a solid backend in Perl :smiling_imp:
:cat: :smirk_cat: :heart_eyes_cat: :pouting_cat: :smiley_cat: :cat2:

And, why _CheeseCake_?  Dave's post had an image of it, so there...

[1]: http://mojolicio.us
[2]: https://facebook.github.io/react

## RUNNING

As long as you have a recent Perl (5.14 and up,)
with [Carton][3], [Docker Compose][4], and [NodeJS][5], just do

    $ carton install --deployment
    $ npm install
    $ docker-compose up

And visit http://localhost .  Internet connection required.

[3]: https://metacpan.org/pod/Carton
[4]: https://docs.docker.com/compose
[5]: https://nodejs.org

## TODO

- A better look and feel lol: thinking about Plurk-style timeline...
  Revisit this, as it seems viable in React now.
- ~~Add Karma and Protractor tests~~ Add new tests for React

## LICENSE

Copyright (c) 2014-2016 Zak B. Elep

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
