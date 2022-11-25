import {Main} from '../containers/main';
import {useAuth} from '../hooks/useAuth';

const Home = () => {
  const auth = useAuth();
  if (auth.isAuthenticating) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <h1>Loading...</h1>
      </div>
    );
  } else if (auth.isAuthenticated()) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Main />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1>404 please login first</h1>
    </div>
  );
};

export default Home;
