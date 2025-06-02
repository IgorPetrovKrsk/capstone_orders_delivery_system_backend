function getRootHateoas(req, res) {
    res.json({
        links: [
            {
                href: '/',
                rel: 'this',
                type: 'GET',
            },
            {
                href: '/trucks',
                rel: 'trucks',
                type: 'GET',
            },
            {
                href: '/messages',
                rel: 'messages',
                type: 'GET',
            },
            {
                href: '/orders',
                rel: 'orders',
                type: 'GET',
            },
        ],
    });
}

export default {getRootHateoas}