type LoadingTypeProps = 'idle' | 'succeeded' | 'pending' | 'failed'

interface IAuthProps {
    loading: LoadingTypeProps;
    data: any,
    message: string
}