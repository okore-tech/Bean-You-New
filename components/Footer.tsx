import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-orange-900 text-white text-xs py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        <div>
          <h4 className="font-bold mb-2">Privacy</h4>
          <ul className="space-y-1">
            <li><Link href="#">Terms of Use</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Cookies</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Services</h4>
          <ul className="space-y-1">
            <li><Link href="#">Cafes</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">About Us</h4>
          <ul className="space-y-1">
            <li><Link href="#">Events</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Information</h4>
          <ul className="space-y-1">
            <li><Link href="#">Projects</Link></li>
            <li><Link href="#">Jobs</Link></li>
            <li><Link href="#">Product</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-4">© 2025 Bean You</div>
    </footer>
  );
}
