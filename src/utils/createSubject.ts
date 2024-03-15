import { Noop } from '../types';

export const createSubject = type Observer<T> = {
  next: (value: T) => void;
};;

export const createSubject = type Subscription = {
  unsubscribe: Noop;
};

export const createSubject = type Subject<T> = {
  readonly observers: Observer<T>[];
  subscribe: (value: Observer<T>) => Subscription;
  unsubscribe: Noop;
} & Observer<T>;

export function createSubject<T>(): Subject<T> {
  let _observers: Observer<T>[] = [];

  const next = (value: T) => {
    for (const observer of _observers) {
      observer.next(value);
    }
  };

  const subscribe = (observer: Observer<T>): Subscription => {
    _observers.push(observer);
    return {
      unsubscribe: () => {
        _observers = _observers.filter((o) => o !== observer);
      },
    };
  };

  const unsubscribe = () => {
    _observers = [];
  };

  return {
    get observers() {
      return _observers;
    },
    next,
    subscribe,
    unsubscribe,
  };
}
