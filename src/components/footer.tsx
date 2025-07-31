import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">E-Shop</h3>
          <p className="text-gray-400">Your one-stop shop for all your needs.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="text-gray-400 hover:text-white">
                Cart & Checkout
              </Link>
            </li>
            <li>
              <Link href="/orders" className="text-gray-400 hover:text-white">
                My Orders
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">123 E-Shop Lane, Tech City, 12345</p>
          <p className="text-gray-400">Email: support@eshop.com</p>
          <p className="text-gray-400">Phone: (123) 456-7890</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
        &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
      </div>
    </footer>
  )
}
