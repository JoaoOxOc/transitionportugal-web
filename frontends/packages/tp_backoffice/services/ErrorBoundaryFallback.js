import { useRouter } from 'next/router';

export function ErrorBoundaryFallback({error, resetErrorBoundary}) {
    const router = useRouter();

    console.log(error);
    if (error && error.redirectToLogin) {
        router.push({
            pathname: '/admin/auth/login/cover',
            query: { backTo: router.asPath }
        });
    }

    return (
        <></>
    )
}

export const myErrorHandler = (error, info) => {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
}