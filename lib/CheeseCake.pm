package CheeseCake;
use Mojo::Base 'Mojolicious';

# This method will run once at server start
sub startup {
  my $self = shift;

  # Documentation browser under "/perldoc"
  $self->plugin('PODRenderer');

  # Router
  my $r = $self->routes;

  # NYTFeedFun
  $r->get('/')->to(cb => sub { shift->render_static('index.html') });
  my $feeds = $r->bridge('/nytfeedfun/feeds')->to('NYTFeedFun#feeds');
  $feeds->get('/index')->to('NYTFeedFun#feeds_index');
  $feeds->get('/:id')->to('NYTFeedFun#feed_items');
}

1;
