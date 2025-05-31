export function Footer() {
  return (
    <footer className=" w-full flex justify-center items-center py-4">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SnapCart. All rights reserved.
      </p>
    </footer>
  );
}
