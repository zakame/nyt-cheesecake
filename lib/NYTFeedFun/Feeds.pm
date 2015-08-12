package NYTFeedFun::Feeds;
use HTTP::Exception;
use JSON ();
use Moo::Role;
use Plack::Request;
use Plack::Response;

requires 'call';

has json => (
    is      => 'ro',
    default => sub { JSON->new->utf8(1)->pretty(0)->allow_blessed(1) }
);
has svc => ( is => 'ro', required => 1 );

has feeds => ( is => 'rwp' );

sub prepare_app {
    my $self = shift;

    my $feeds = $self->svc->get_feeds_list;
    $self->_set_feeds($feeds);
}

sub req {
    Plack::Request->new( $_[1] );
}

sub res_json {
    my ( $self, $data ) = @_;
    my $res = Plack::Response->new(200);
    $res->content_type('application/json; charset=utf-8');
    $res->body( $self->json->encode($data) );
    $res->finalize;
}

sub throw {
    my ( $self, $err, $status ) = @_;
    HTTP::Exception->throw( $status || 404, status_message => $err );
}

1;
