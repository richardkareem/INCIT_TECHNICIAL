import { MessageType, showMessage as showToast } from "react-native-flash-message";

export const showMessage = (message : string, type:MessageType = "success"  ) => {
    showToast({
      message,
      // description: 'This is our second message',
      type: type,
      backgroundColor:
        type === 'success'
          ? '#007AFF'
          : type === 'danger'
          ? '#D9435E'
          : type === 'warning'
          ? '#dbbc67'
          : '#007AFF',
    });
  };