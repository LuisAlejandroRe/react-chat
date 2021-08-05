import { Route, Redirect } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

export default function PrivateRoute({ component: Component, ...rest}) {

  const [{ user }, dispatch] = useStateValue();

  return (
    <Route {...rest}>
      {user ? <Component /> : <Redirect to="/"/>}
    </Route>
  )
}
