package CheeseCake::NYTFeedFun;
use Mojo::Base 'Mojolicious::Controller';

use NYTFeeds;

has nytfeeds => sub {
    NYTFeeds->new(
        ua          => shift->ua->max_redirects(3),
    );
};

my $feeds_url = 'http://static.opml.org/misc/nytFeeds.opml';
my $feeds     = [];

sub feeds {
    my $self = shift;
    return 1 if @$feeds;

    $feeds = $self->nytfeeds->get_feeds_list($feeds_url);
}

sub feeds_list {
    my $self = shift;
    $self->respond_to( any => { json => $feeds } );
}

sub feed_items {
    my $self = shift;
    my $id   = $self->param('id');

    my $feed;
    grep { $feed = $_ if $_->{id} eq $id } @$feeds;
    return $self->render('does_not_exist') unless $feed;

    $self->respond_to(
        any => { json => $self->nytfeeds->get_feed_items( $feed->{xmlUrl} ) }
    );
}

1;
