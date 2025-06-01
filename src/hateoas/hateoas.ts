import { Request, Response } from 'express';

function getRootHateoas(req: Request, res: Response) {
    res.json({
        links: [
            {
                href: '/api',
                rel: 'api',
                type: 'GET',
            },
        ],
    });
}

function getApiHateoas(req: Request, res: Response) {
    res.json({
        links: [
            {
                href: 'api/trucks',
                rel: 'trucks',
                type: 'GET',
            },
            {
                href: 'api/trucks',
                rel: 'trucks',
                type: 'POST',
            },
            {
                href: 'api/trucks',
                rel: 'trucks',
                type: 'DELETE',
            },
            {
                href: 'api/orders',
                rel: 'orders',
                type: 'GET',
            },
            {
                href: 'api/orders',
                rel: 'orders',
                type: 'POST',
            },
            {
                href: 'api/orders',
                rel: 'orders',
                type: 'PATCH',
            },
            {
                href: 'api/orders',
                rel: 'orders',
                type: 'DELETE',
            },
        ],
    });
}

function getTrucksLinks() {
    return [
        {
            href: 'trucks/:truckId',
            rel: ':id',
            type: 'GET',
        },
        {
            href: 'trucks/?truckId={id}',
            rel: 'queryParamId',
            type: 'GET',
        }
    ];
}

function getTruckByIdLinks(truckId: number) {
    return [
        {
            href: `/${truckId}`,
            rel: 'update',
            type: 'PATCH',
        },
        {
            href: `/${truckId}`,
            rel: 'delete',
            type: 'DELETE',
        },
    ];
}

function getOrdersLinks() {
    return [
        {
            href: 'orders/:orderId',
            rel: ':id',
            type: 'GET',
        }
    ];
}

function getOrderByIdLinks(orderId: string) {
    return [
        {
            href: `/${orderId}`,
            rel: 'self',
            type: 'PATCH',
        },
        {
            href: `/${orderId}`,
            rel: 'self',
            type: 'DELETE',
        },
    ];
}

function getMessagesLinks() {
    return [
        {
            href: 'messages/:messageId',
            rel: 'self',
            type: 'GET',
        }
    ];
}

function getMessageByIdLinks(messageId: number) {
    return [
        {
            href: `/${messageId}`,
            rel: 'self',
            type: 'PATCH',
        },
        {
            href: `/${messageId}`,
            rel: 'self',
            type: 'DELETE',
        },
    ];
}

export default { getRootHateoas, getApiHateoas, getTrucksLinks, getTruckByIdLinks, getOrdersLinks, getOrderByIdLinks, getMessagesLinks, getMessageByIdLinks }