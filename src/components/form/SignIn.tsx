import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin, setError } from '../../store/actions/authActions';
import { RootState } from '../../store';

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    return () => {
      if(error) {
        dispatch(setError(''));
      }
    }
  }, [error, dispatch]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if(error) {
      dispatch(setError(''));
    }
    setLoading(true);
    dispatch(signin({ email, password }, () => setLoading(false)));
  }
  return(
    <form onSubmit={submitHandler}>
      {error && <span>{error}</span>}
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        placeholder="Email address"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        placeholder="Password"
      />
      <button disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
    </form>
  );
}

export default SignIn;
