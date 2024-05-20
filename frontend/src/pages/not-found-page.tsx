import {useRouteError} from "react-router-dom";

export default function NotFoundPage() {

    const error = useRouteError();
    console.log(error);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-4xl font-semibold">404</h1>
            <h2 className="text-2xl font-semibold">Página não encontrada</h2>
            <p className="text-lg font-normal">{error.message || error.statusText}</p>
        </div>
    );
}