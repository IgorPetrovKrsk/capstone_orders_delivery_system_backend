import { Request, Response } from 'express'
function getRootHateoas(req: Request, res: Response) {
    res.json({
        links: [
            {
                href: '/api/v1',
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
            {
                href: '/users',
                rel: 'users',
                type: 'GET',
            },
            {
                href: '/s3-url',
                rel: 'AWS_POST_URL',
                type: 'GET',
            },
        ],
    });
}

export default { getRootHateoas }