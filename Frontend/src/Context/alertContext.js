import { createContext, useContext, useState } from "react";
import { ToastNotification } from "../Components/Toast";

const AlertsContext = createContext();

export const AlertsProvider = ({ children }) => {
  const [toastShow, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });
  const handleClose = () => setToast((prev) => ({ ...prev, show: false }));
  const handleCreateToast = (type, message) =>
    setToast((_) => ({ show: true, message, type }));
  return (
    <AlertsContext.Provider value={{ handleCreateToast }}>
      {children}
      <ToastNotification
        close={handleClose}
        show={toastShow.show}
        message={toastShow.message}
        type={toastShow.type}
      />
    </AlertsContext.Provider>
  );
};

export const useAlert = () => {
  const { handleCreateToast } = useContext(AlertsContext);
  return { handleCreateToast };
};
