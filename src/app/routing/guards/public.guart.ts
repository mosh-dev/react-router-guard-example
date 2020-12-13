import { GuardProps, GuardReturnType } from '../routing';
import { loggedIn } from '../../../constants';

export const publicGuard = (props: GuardProps): GuardReturnType => {
  if (loggedIn()) {
    if (props.history) {
      props.history.replace('/dashboard');
    }
    return false;
  }
  return true;
};
