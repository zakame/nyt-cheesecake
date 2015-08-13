use strict;
use warnings;

use Test::More;
use Plack::Test;
use Plack::Util;
use HTTP::Request::Common;
use JSON 'decode_json';
use JSON::Pointer;

my $app  = Plack::Util::load_psgi 'app.psgi';
my $test = Plack::Test->create($app);

my $res = $test->request( GET '/' );
like $res->content, qr/NYT Feed Fun/i;

subtest 'static content' => sub {
    my $static_dir = 'public';
    use File::Find;
    find {
        wanted => sub {
            return if -d;
            s/$static_dir//;
            my $res = $test->request( GET $_);
            is $res->code, 200;
        },
        no_chdir => 1,
    }, $static_dir;
};

subtest 'feeds list' => sub {
    my $res = $test->request( GET '/nytfeedfun/feeds/list.json' );
    is $res->code, 200;

    my $list = decode_json $res->content;
    ok( JSON::Pointer->contains( $list, '/1' ) );
    ok( JSON::Pointer->contains( $list, '/1/id' ) );
    ok( JSON::Pointer->contains( $list, '/1/title' ) );
    ok( JSON::Pointer->contains( $list, '/1/type' ) );
    ok( JSON::Pointer->contains( $list, '/1/xmlUrl' ) );
    ok( JSON::Pointer->contains( $list, '/1/htmlUrl' ) );
};

subtest 'feed items' => sub {
    my $res = $test->request( GET '/nytfeedfun/feeds/1.json' );
    is $res->code, 200;

    my $feed = decode_json $res->content;
    ok( JSON::Pointer->contains( $feed, '/title' ) );
    ok( JSON::Pointer->contains( $feed, '/link' ) );
    ok( JSON::Pointer->contains( $feed, '/items' ) );
};

done_testing;
