use strict;
use warnings;
use Plack::App::File;
use Plack::Builder;

use File::Spec;
use File::Basename 'dirname';
use lib File::Spec->catdir( dirname(__FILE__), 'lib' );

# controllers (Plack apps)
use NYTFeedFun::Feeds::List;
use NYTFeedFun::Feeds::Feed;

# services
use Furl::HTTP;
use XML::OPML::LibXML;
use XML::RSS::LibXML;
use NYTFeeds;

my $svc = NYTFeeds->new(
    ua          => Furl::HTTP->new,
    opml_parser => XML::OPML::LibXML->new,
    rss_parser  => XML::RSS::LibXML->new,
);

builder {
    enable_if { $_[0]->{REMOTE_ADDR} eq '127.0.0.1' } 'ReverseProxy';

    # the original Mojolicious app
    # require './script/cheese_cake';

    # Angular app and other static files
    mount '/nytfeedfun' => builder {
        enable 'Static',
            path => qr{partials|js|css},
            root => './public/nytfeedfun';

        # catchall for any other locations not handled
        sub {
            [ 200, [], ['nytfeedfun.'] ];
        };
    };

    # Plack apps for the feeds API
    mount '/nytfeedfun/feeds' => builder {
        enable 'HTTPExceptions';
        enable 'Negotiate',
            formats =>
            { json => { type => 'application/json', charset => 'utf-8' } },
            extension => 'strip';

        mount '/list' => NYTFeedFun::Feeds::List->new( svc => $svc )->to_app;
        mount '/'     => NYTFeedFun::Feeds::Feed->new( svc => $svc )->to_app;
    };

    # static index page, with DirIndex middleware inlined
    mount '/' => builder {
        enable sub {
            my $app = shift;
            sub {
                my $env = shift;
                if ( $env->{PATH_INFO} =~ m{/$} ) {
                    $env->{PATH_INFO} .= 'index.html';
                }
                $app->($env);
            };
        };
        Plack::App::File->new( root => './public/' )->to_app;
    };
};
