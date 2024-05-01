import redis from '../db/redis';

export function session() {

  return async function(ctx, next) {
    const { token } = ctx.request.body;
    const client = await redis();

    if (token) {
      const res = await client.get(token);
      const [session_key, openid, appid] = res.split(',');
      
      ctx.state.sessionInfo = { session_key, openid, appid }
    } else {
      ctx.state.sessionInfo = null;
    } 

    await next();
  }
}