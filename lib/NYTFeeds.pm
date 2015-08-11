package NYTFeeds;
use Moo;

has [qw(ua opml_parser rss_parser)] => ( is => 'ro', required => 1 );

sub get_feeds_list {
    my ( $self, $feeds_url ) = @_;
    my $opml = $self->ua->get($feeds_url)->res->body;
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
    my $xml = $self->ua->get($feed_url)->res->body;
    my $rss = $self->rss_parser->parse($xml);

    my $feed = {
        title => $rss->{channel}->{title},
        link  => $rss->{channel}->{link},
        items => [],
    };
    for my $item ( $rss->items ) {
        $item->{description} =~ s/<img width='1' height='1'.*$//;
        push @{ $feed->{items} }, $item;
    }

    $feed;
}

1;
