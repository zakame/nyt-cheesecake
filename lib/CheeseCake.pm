package CheeseCake;
use Mojo::Base 'Mojolicious';

# This method will run once at server start
sub startup {
  my $self = shift;

  # Configuration in ./cheese_cake.conf (mainly for deployment)
  $self->plugin('Config');

  # Documentation browser under "/perldoc"
  $self->plugin('PODRenderer');

  # Router
  my $r = $self->routes;

  # NYTFeedFun
  $r->get('/')->to(cb => sub { shift->reply->static('index.html') });
  my $feeds = $r->under('/nytfeedfun/feeds')->to('NYTFeedFun#feeds');
  $feeds->get('/list')->to('NYTFeedFun#feeds_list');
  $feeds->get('/:id')->to('NYTFeedFun#feed_items');
}

1;
