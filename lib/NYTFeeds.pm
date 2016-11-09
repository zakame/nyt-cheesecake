package NYTFeeds;
use Mojo::Base -base;

has 'ua';
has 'rss_parser';

sub get_feeds_list {
    my ( $self, $feeds_url ) = @_;
    my $opml = $self->ua->get($feeds_url)->res;
    my ( @feeds, $id );

    $opml->dom->find('outline')->each(
        sub {
            $id++;
            push @feeds => {
                id      => $id,
                title   => $_->{title},
                type    => $_->{type},
                xmlUrl  => $_->{xmlUrl},
                htmlUrl => $_->{htmlUrl}
            };
        }
    );

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
        $item->{media}->{content} =~ s/image\d+$//
            if $item->{media}->{content};
        push @{ $feed->{items} }, $item;
    }

    $feed;
}

1;
