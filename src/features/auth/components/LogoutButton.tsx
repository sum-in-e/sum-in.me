const LogoutButton = () => {
  return (
    <form action="/auth/logout" method="post">
      <button className="md:hover:underline">Logout</button>
    </form>
  );
};

export default LogoutButton;
