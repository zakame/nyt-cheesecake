use Mojo::Base -strict;

use Test::More;
use Test::Mojo;

my $t = Test::Mojo->new('CheeseCake');
$t->get_ok('/')->status_is(200)->content_like(qr/NYT Feed Fun/i);

subtest 'static content' => sub {
  my $static_dir = 'public';
  use File::Find;
  find {
    wanted => sub {
      return if -d;
      s/$static_dir//;
      $t->get_ok("$_")->status_is(200);
    },
    no_chdir => 1,
  }, $static_dir;
};

subtest 'feeds' => sub {
  $t->get_ok('/nytfeedfun/feeds/index.json')
    ->status_is(200);
  $t->get_ok('/nytfeedfun/feeds/1.json')
    ->status_is(200)
    ->json_has('/title')
    ->json_has('/link')
    ->json_has('/items');
};

done_testing();
