const LogoutButton = () => {
  return (
    <form action="/auth/logout" method="post">
      <button className="md:hover:underline dark:text-white">Logout</button>
    </form>
  );
};

export default LogoutButton;
