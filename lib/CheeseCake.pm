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
  $r->get('/nytfeedfun/feeds/:id')->to('NYTFeedFun#feeds');
}

1;
