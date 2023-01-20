import redis from '../db/redis';

export default function user() {

  return async function(ctx, next) {
    const { token } = ctx.request.body;
    const client = await redis();

    if (token) {
      const res = await client.get(token);
      const [session_key, openid] = res.split(',');
      
      ctx.state.sessionInfo = { session_key, openid }
    } else {
      console.log('without token');
    } 

    await next();
  }
}