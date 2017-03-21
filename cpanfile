requires 'perl', '5.22.0';
requires 'Mojolicious', '6.0';
requires 'HTML::HTML5::Entities', '0.004';

on test => sub {
  requires 'Test::More', '0.98';
};
