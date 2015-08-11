package NYTFeedFun::Feeds::Feed;
use Moo;

extends 'Plack::Component';
with 'NYTFeedFun::Feeds';

sub call {
    my ( $self, $env ) = @_;
    my $req = $self->req($env);

    my $feed;
    my $id = $req->path_info;
    $id =~ s#/##;

    grep { $feed = $_ if $_->{id} eq $id } @{ $self->feeds };
    return $self->throw('feed does not exist') unless $feed;

    $self->res_json( $self->svc->get_feed_items( $feed->{xmlUrl} ) );
}

1;
