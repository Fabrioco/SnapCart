import Link from "next/link";

export function NavHeader() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
        </li>
        <li>
          <Link href="/cart" className="hover:text-orange-500">
            Carrinho
          </Link>
        </li>
        <li>
          <Link href="/products" className="hover:text-orange-500">
            Produtos
          </Link>
        </li>
      </ul>
    </nav>
  );
}
