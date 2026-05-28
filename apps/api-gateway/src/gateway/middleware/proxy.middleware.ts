
import {
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  createProxyMiddleware,
} from 'http-proxy-middleware';

const authProxy =
  createProxyMiddleware({
    target: 'http://localhost:3001',

    changeOrigin: true,

    pathRewrite: {
      '^/auth': '/auth',
    },
  });

const accountProxy =
  createProxyMiddleware({
    target: 'http://localhost:3002',

    changeOrigin: true,

    pathRewrite: {
      '^/accounts': '/accounts',
    },
  });

const transactionProxy =
  createProxyMiddleware({
    target: 'http://localhost:3003',

    changeOrigin: true,

    pathRewrite: {
      '^/transactions':
        '/transactions',
    },
  });

const loanProxy =
  createProxyMiddleware({
    target: 'http://localhost:3004',

    changeOrigin: true,

    pathRewrite: {
      '^/loans': '/loans',
    },
  });

export function proxyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.path.startsWith('/auth')) {
    return authProxy(req, res, next);
  }

  if (
    req.path.startsWith('/accounts')
  ) {
    return accountProxy(
      req,
      res,
      next,
    );
  }

  if (
    req.path.startsWith(
      '/transactions',
    )
  ) {
    return transactionProxy(
      req,
      res,
      next,
    );
  }

  if (req.path.startsWith('/loans')) {
    return loanProxy(req, res, next);
  }

  next();
}

