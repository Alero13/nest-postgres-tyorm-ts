/* console.log(process.env.JWT_SECRET) */

export const jwtConstants = {
    /* secret: 'No Utilizar esta Palabara en Produccion', */
    secret: process.env.JWT_SECRET
};