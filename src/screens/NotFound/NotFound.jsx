import { useNavigate } from "@solidjs/router";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="notFound">
      <h1>404</h1>
      <h2>We can't find that page</h2>
      <p>We're fairly sure that page have gone missing.</p>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </button>
    </div>
  );
}

export default NotFound;
