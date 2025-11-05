export default function Loading({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center">
                <div className="relative w-36 h-36 border-4 border-transparent animate-spin flex items-center justify-center border-t-[#ff8faf] rounded-full">
                    <span className="material-symbols-outlined text-[#ff8faf] text-7xl absolute">
                        home_and_garden
                    </span>
                </div>
                <p className="mt-4 text-[#ff8faf] text-lg font-semibold">{message}</p>
            </div>
        </div>
    );
}