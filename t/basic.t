use Mojo::Base -strict;

use Test::More;
use Test::Mojo;

my $t = Test::Mojo->new('CheeseCake');
$t->get_ok('/')->status_is(200)->content_like(qr/NYT Feed Fun/i);

done_testing();
