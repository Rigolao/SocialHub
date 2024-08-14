import {delay, http, HttpResponse} from "msw";
import {LoginRequest, LoginResponse} from "@/types/login";
import {ResponseError} from "@/types";
import {UserAppBarInfo} from "@/types/user";

const handlers = [
    http.post<never, LoginRequest, LoginResponse | ResponseError>('api/login', async ({request}) => {
        await delay(1000);

        const req = await request.json();

        if (req.email === 'mrigolao@gmail.com' && req.password === '123456') {
            return HttpResponse.json(
                {
                    id: 1,
                    token: 'ebgeoivnbowinge[wping[isenewingewin'
                },
                {
                    status: 200,
                },
            );
        } else if (req.email === 'matheus@gmail.com' && req.password === '123456') {
            return HttpResponse.json(
                {
                    id: 2,
                    token: 'gbongoegj0eigpe9n]pojb0in]opn'
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
    http.get<never, UserAppBarInfo>('api/user/photo/:id', async ({request}) => {
        await delay(3000);

        const url = new URL(request.url);
        const userId = url.pathname.split('/').pop();

        console.log(userId);

        if (userId === '1') {
            return HttpResponse.json({
                name: 'Matheus Rigolão',
                photo: 'https://github.com/Rigolao.png'
            });
        } else if (userId !== null && userId !== '1') {
            return HttpResponse.json({
                    mensagem: 'Usuário não encontrado'
                },
                {
                    status: 404
                }
            );
        } else {
            return HttpResponse.json({
                    mensagem: 'É preciso passar o identificador do usuário'
                },
                {
                    status: 400
                }
            );
        }

    })
];

export {handlers};