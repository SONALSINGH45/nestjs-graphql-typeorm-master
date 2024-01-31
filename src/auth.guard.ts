
// import { Injectable, ExecutionContext } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { GqlExecutionContext } from '@nestjs/graphql';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//     canActivate(context: ExecutionContext) {
//         const ctx = GqlExecutionContext.create(context);
//         const { headers } = ctx.getContext().req;

//         // Extract the token from headers or handle as needed
//         const token = headers.authorization?.split(' ')[1];

//         // Set the extracted token in the request for passport-jwt to use
//         ctx.getContext().req.token = token;

//         return super.canActivate(context);
//     }
// }

import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            // Handle authentication failure
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
