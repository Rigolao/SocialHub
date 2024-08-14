import {delay, http, HttpResponse} from "msw";
import {LoginRequest, LoginResponse} from "@/types/login";
import {ResponseError} from "@/types";

const handlers = [
    http.post<never, LoginRequest, LoginResponse | ResponseError>('api/login', async ({request}) => {
        await delay(1000);

        const req = await request.json();

        if(req.email === 'mrigolao@gmail.com' && req.password === '123456') {
            return HttpResponse.json(
                {
                    token: 'ebgeoivnbowinge[wping[isenewingewin'
                },
                {
                    status: 200,
                },
            );
        } else {
            return HttpResponse.json(
                {
                    message: 'Credenciais inválidas'
                },
                {
                    status: 400,
                },
            );
        }
    }),
];

export {handlers};