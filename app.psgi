use strict;
use warnings;
use Plack::App::File;
use Plack::Builder;

use File::Spec;
use File::Basename 'dirname';
use lib File::Spec->catdir( dirname(__FILE__), 'lib' );

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

    # Plack app for the feeds API
    mount '/nytfeedfun/feeds' => sub {
        my $env = shift;

        [ 200, [], ["feed $env->{PATH_INFO} goes here."] ];
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
