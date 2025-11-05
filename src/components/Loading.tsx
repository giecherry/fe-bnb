export default function Loading({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-500 border-solid"></div>
                <p className="mt-4 text-gray-600 text-lg">{message}</p>
            </div>
        </div>
    );
}