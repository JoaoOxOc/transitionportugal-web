import { useRouter } from 'next/router';

export function ErrorBoundaryFallback({error, resetErrorBoundary}) {
    const router = useRouter();

    console.log("ErrorBoundaryFallback",error);
    if (error && error.redirectToLogin) {
        router.push({
            pathname: '/admin/auth/login/cover',
            query: { backTo: router.asPath }
        });
    }
    else if (error) {
        router.push({
            pathname: '/status/500',
            query: { backTo: router.asPath, error: error.message }
        });
    }

    return (
            <div>
              <h2>Oops, there is an error!</h2>
              <p>{error.message}</p>
              <button
                type="button"
                onClick={resetErrorBoundary}
              >
                Try again?
              </button>
            </div>
    )
}

export const myErrorHandler = (error, info) => {
    console.log("myErrorHandler",error, info);
    // Do something with the error
    // E.g. log to an error logging client here
}