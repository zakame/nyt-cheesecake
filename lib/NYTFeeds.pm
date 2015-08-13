package NYTFeeds;
use Moo;
use Furl::HTTP;
use XML::OPML::LibXML;
use XML::RSS::LibXML;

has opml => ( is => 'ro', required => 1 );

has ua          => ( is => 'ro', default => sub { Furl::HTTP->new } );
has opml_parser => ( is => 'ro', default => sub { XML::OPML::LibXML->new } );
has rss_parser  => ( is => 'ro', default => sub { XML::RSS::LibXML->new } );

sub get_feeds_list {
    my $self = shift;
    my $opml = ( $self->ua->get( $self->opml ) )[4];
    my $doc  = $self->opml_parser->parse_string($opml);
    my ( @feeds, $id );

    for my $outline ( $doc->outline ) {
        next if $outline->is_container;
        $id++;
        push @feeds,
            {
            id      => $id,
            title   => $outline->title,
            type    => $outline->type,
            xmlUrl  => $outline->xml_url,
            htmlUrl => $outline->html_url,
            };
    }

    wantarray ? @feeds : \@feeds;
}

sub get_feed_items {
    my ( $self, $feed_url ) = @_;
    my $xml = ( $self->ua->get($feed_url) )[4];
    my $rss = $self->rss_parser->parse($xml);

    my $feed = {
        title => $rss->{channel}->{title},
        link  => $rss->{channel}->{link},
        items => [],
    };
    for my $item ( $rss->items ) {
        $item->{description} =~ s/<img width='1' height='1'.*$//;
        $item->{description} =~ s#<br clear='all'.*$##;
        push @{ $feed->{items} }, $item;
    }

    $feed;
}

1;
