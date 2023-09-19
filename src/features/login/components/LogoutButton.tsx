export default function LogoutButton() {
  return (
    <form action="/auth/logout" method="post">
      <button className="py-2 px-4 rounded-md no-underline border border-zinc-400">
        Logout
      </button>
    </form>
  );
}
