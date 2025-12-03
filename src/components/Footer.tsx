import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-transparent text-black py-8 shadow-md shadow-t-md">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6">
                {/* About Section */}
                <div className="text-center md:text-left">
                    <h2 className="text-lg font-bold mb-4">About Hembnb</h2>
                    <p className="text-sm text-[#ff8faf]">
                        Hembnb is a booking platform made for women who care about comfort and design. We bring together soft, welcoming spaces that feel like home, wherever you are.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="text-center md:text-left">
                    <h2 className="text-lg font-bold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/faq"
                                className="hover:text-[#ff8faf] transition-colors"
                            >
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/policies"
                                className="hover:text-[#ff8faf] transition-colors"
                            >
                                Policies
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="hover:text-[#ff8faf] transition-colors"
                            >
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="hover:text-[#ff8faf] transition-colors"
                            >
                                About Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="text-center md:text-left">
                    <h2 className="text-lg font-bold mb-4">Follow Us</h2>
                    <ul className="flex justify-center md:justify-start space-x-4">
                        <li>
                            <a
                                href="#"
                                className="hover:text-[#ff8faf] transition-colors"
                                aria-label="Facebook"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                >
                                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.917c-1.504 0-1.796.715-1.796 1.763v2.31h3.59l-.467 3.622h-3.123V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-[#ff8faf] transition-colors"
                                aria-label="Twitter"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                >
                                    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.574 2.163-2.723-.949.564-2.005.974-3.127 1.195-.897-.959-2.178-1.557-3.594-1.557-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.729-.666 1.574-.666 2.476 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.927-.086.627 1.956 2.444 3.379 4.6 3.419-1.68 1.319-3.809 2.105-6.102 2.105-.396 0-.788-.023-1.175-.067 2.179 1.396 4.768 2.212 7.557 2.212 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.635.961-.695 1.8-1.562 2.46-2.549z" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-[#ff8faf] transition-colors"
                                aria-label="Instagram"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.512.51.297.877.698 1.175 1.175.272.46.458 1.26.512 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.512 2.43-.297.51-.698.877-1.175 1.175-.46.272-1.26.458-2.43.512-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.512a3.27 3.27 0 01-1.175-1.175c-.272-.46-.458-1.26-.512-2.43-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.97.512-2.43.297-.51.698-.877 1.175-1.175.46-.272 1.26-.458 2.43-.512 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.755 0 8.332.013 7.052.072 5.72.132 4.737.334 3.95.7c-.78.36-1.437.84-2.097 1.5-.66.66-1.14 1.317-1.5 2.097-.366.787-.568 1.77-.628 3.102C.013 8.332 0 8.755 0 12c0 3.245.013 3.668.072 4.948.06 1.332.262 2.315.628 3.102.36.78.84 1.437 1.5 2.097.66.66 1.317 1.14 2.097 1.5.787.366 1.77.568 3.102.628 1.28.059 1.703.072 4.948.072s3.668-.013 4.948-.072c1.332-.06 2.315-.262 3.102-.628.78-.36 1.437-.84 2.097-1.5.66-.66 1.14-1.317 1.5-2.097.366-.787.568-1.77.628-3.102.059-1.28.072-1.703.072-4.948s-.013-3.668-.072-4.948c-.06-1.332-.262-2.315-.628-3.102-.36-.78-.84-1.437-1.5-2.097-.66-.66-1.317-1.14-2.097-1.5-.787-.366-1.77-.568-3.102-.628C15.668.013 15.245 0 12 0z" />
                                    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-8 border-t border-[#ffcedc] pt-4 text-center text-sm text-[#ff8faf]">
                © {currentYear} Hembnb. All rights reserved.
            </div>
        </footer>
    );
}
