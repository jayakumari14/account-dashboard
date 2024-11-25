const Navbar = () => (
  <div className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
    <div>Dashboard</div>
    <div>
      <button
        className="bg-blue-500 px-4 py-2 rounded"
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/auth/login";
        }}
      >
        Logout
      </button>
    </div>
  </div>
);

export default Navbar;
