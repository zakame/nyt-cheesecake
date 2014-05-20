package CheeseCake::NYTFeedFun;
use Mojo::Base 'Mojolicious::Controller';

use XML::OPML::LibXML;
use XML::RSS::LibXML;

my $nytfeeds = 'http://static.opml.org/misc/nytFeeds.opml';

sub get_feeds {
    my $opml   = shift;
    my $parser = XML::OPML::LibXML->new;
    my $doc    = $parser->parse_string($opml);
    my ( @feeds, $id );

    my @outline = $doc->outline;
    for my $outline (@outline) {
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
    return wantarray ? @feeds : \@feeds;
}

sub feeds {
    my $self  = shift;
    my $ua    = $self->ua->max_redirects(3);
    my $opml  = $ua->get($nytfeeds)->res->body;
    my @feeds = get_feeds($opml);

    return $self->respond_to( any => { json => \@feeds } )
        if $self->param('id') eq 'index';

    my $feed;
    grep { $feed = $_ if $_->{id} eq $self->param('id') } @feeds;
    return $self->render('does_not_exist') unless $feed;

    my $xml = $ua->get( $feed->{xmlUrl} )->res->body;
    my $rss = XML::RSS::LibXML->new->parse($xml);

    my $items;
    for my $item ( $rss->items ) {
        $item->{description} =~ s/<img width='1' height='1'.*$//;
        push @$items, $item;
    }

    $self->respond_to(
        any => {
            json => {
                title => $rss->{channel}->{title},
                link  => $rss->{channel}->{link},
                items => $items
            }
        }
    );
}

1;
