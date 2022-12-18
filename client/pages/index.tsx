import {Aggregate} from '../containers/aggregate';
import {Customers} from '../containers/customers';
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
      <div className="bg-grey-1">
        <div className="flex max-w-screen-2xl m-auto gap-3 min-h-screen flex-row items-start justify-between py-2">
          <div className="w-1/2">
            <Aggregate />
          </div>
          <div className="w-full">
            <Customers />
          </div>
        </div>
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
