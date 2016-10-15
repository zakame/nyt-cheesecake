requires 'perl', '5.22.0';
requires 'XML::OPML::LibXML', '0.03';
requires 'XML::RSS::LibXML', '0.3105';
requires 'Furl', '3.08';
requires 'HTTP::Exception', '0.04006';
requires 'JSON', '2.90';
requires 'JSON::Pointer', '0.06';
requires 'Moo', '2.000002';
requires 'Plack', '1.0037';
requires 'Plack::Middleware::Debug', '0.16';
requires 'Plack::Middleware::JSON::ForBrowsers', '0.002000';
requires 'Plack::Middleware::Negotiate', '0.20';
requires 'Plack::Middleware::ReverseProxy', '0.15';
requires 'Router::Boom', '1.02';
requires 'Starlet', '0.25';

on configure => sub {
  requires 'Module::Build', '0.38';
  requires 'Module::CPANfile', '0.9010';
};

on test => sub {
  requires 'Test::More', '0.98';
};
