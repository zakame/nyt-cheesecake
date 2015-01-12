requires 'Mojolicious', '5.72';
requires 'XML::OPML::LibXML', '0.03';
requires 'XML::RSS::LibXML', '0.3105';

on configure => sub {
  requires 'Module::Build', '0.38';
  requires 'Module::CPANfile', '0.9010';
};

on test => sub {
  requires 'Test::More', '0.98';
};
