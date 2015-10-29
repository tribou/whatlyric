import { Dispatcher } from 'flux';

class AppDispatcherClass extends Dispatcher {

  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action,
    });
  }

  handleServerAction(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action,
    });
  }
}

const AppDispatcher = new AppDispatcherClass();

export default AppDispatcher;

