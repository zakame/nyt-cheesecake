requires 'perl', '5.22.0';
requires 'Mojolicious', '6.0';
requires 'XML::RSS::LibXML', '0.3105';

on configure => sub {
  requires 'Module::Build', '0.38';
};

on test => sub {
  requires 'Test::More', '0.98';
};
