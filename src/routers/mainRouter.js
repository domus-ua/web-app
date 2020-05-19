import publicRouter from 'routers/publicRouter.js';
import protectedRouter from 'routers/protectedRouter.js'

export default protectedRouter.concat(publicRouter);
