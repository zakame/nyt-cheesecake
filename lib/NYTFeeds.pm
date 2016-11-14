package NYTFeeds;
use Mojo::Base -base;
use HTML::HTML5::Entities;

has 'ua';

sub get_feeds_list {
    my ( $self, $feeds_url ) = @_;
    my $opml = $self->ua->get($feeds_url)->res;
    my ( @feeds, $id );

    for my $feed ( $opml->dom->find('outline')->each ) {
        $id++;
        push @feeds => {
            id      => $id,
            title   => $feed->{title},
            type    => $feed->{type},
            xmlUrl  => $feed->{xmlUrl},
            htmlUrl => $feed->{htmlUrl}
        };
    }

    wantarray ? @feeds : \@feeds;
}

sub get_feed_items {
    my ( $self, $feed_url ) = @_;
    my $xml = $self->ua->get($feed_url)->res;

    my $feed = {
        title => $xml->dom->at('channel > title')->content,
        link  => $xml->dom->at('channel > link')->content,
        items => []
    };

    for my $item ( $xml->dom->find('item')->each ) {
        $item->at('media\:description')->strip
            if ref $item->at('media\:description');

        my $description = $item->at('description')->content;
        $description =~ s/<img width='1' height='1'.*$//;

        my $img = $item->at('media\:content')->{url}
            if $item->at('media\:content');
        $img =~ s/image\d+$// if $img;

        push @{ $feed->{items} } => {
            dc => { creator => $item->at('dc\:creator')->content },
            description => _clean($description),
            guid        => $item->at('guid')->content,
            media       => { content => $img },
            pubDate     => $item->at('pubDate')->content,
            title       => _clean( $item->at('title')->content )
        };
    }

    $feed;
}

sub _clean { decode_entities(shift) }

1;
