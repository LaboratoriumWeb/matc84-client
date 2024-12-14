import {toast} from 'react-toastify';

const showMessage = (severity: string,message: string) => {
  if (severity == 'success') {
    toast.success(message);
  } else if (severity == 'error') {
    toast.error(message);
  } else if (severity == 'warning') {
    toast.warning(message);
  }
}

export {showMessage}