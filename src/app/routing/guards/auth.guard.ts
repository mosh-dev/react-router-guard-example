import { GuardProps, GuardReturnType } from '../routing';
import { loggedIn } from '../../../constants';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';


export const authGuard = (props: GuardProps): boolean => {
  if (!loggedIn()) {
    if (props.history) {
      props.history.replace('/');
    }
    return false;
  }
  return true;
};

/**
 * Sample async Guards
 * @param props
 */
export const asyncAuthGuard = async (props: GuardProps): Promise<boolean> => {
  await timer(2000).toPromise();
  if (!loggedIn()) {
    if (props.history) {
      props.history.replace('/');
    }
    return false;
  }
  return true;
};

/**
 * Sample async Guards that returns an observable
 * @param props
 */
export const asyncAuthGuardObservable = (props: GuardProps): GuardReturnType => {
  return timer(2000).pipe(map(() => {
    if (!loggedIn()) {
      if (props.history) {
        props.history.replace('/');
      }
      return false;
    }
    return true;
  }));
};
