package NYTFeedFun::Feeds::List;
use Moo;

extends 'Plack::Component';
with 'NYTFeedFun::Feeds';

sub call {
    my ( $self, $env ) = @_;
    $self->res_json( $self->feeds );
}

1;
