import { useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../constants/data";
import { logout } from "../../features/auth";
import { useAppDispatch } from "../../store";
import Icon from "../ui/Icon";
import { getInitials } from "../../utils/helper";
import type { CurrentUser, ProfileMenuItem } from "../../types";

type ProfileModalProps = {
  isOpen: boolean;
  user: CurrentUser;
  items: ProfileMenuItem[];
  onClose: () => void;
};

const ProfileModal: FC<ProfileModalProps> = ({ isOpen, user, items, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleItemClick = ({ key, path }: ProfileMenuItem) => {
    onClose();

    if (key === "signout") {
      // Sessiya tozalanadi (token + user) va login sahifasiga qaytariladi
      dispatch(logout());
      navigate(LOGIN_ROUTE, { replace: true });
      return;
    }

    if (path) {
      navigate(path);
      return;
    }

    // TODO: "account" va "help" sahifalari qo'shilgandan keyin navigate qilinadi
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-20 sm:items-center sm:p-4 sm:pt-4">
      <div className="absolute inset-0 bg-gray-900/40" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Profil"
        className="relative max-h-[calc(100vh-6rem)] w-full max-w-sm overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-xl sm:max-h-[calc(100vh-2rem)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Yopish"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <Icon name="close" className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center px-5 pt-7 pb-4 sm:px-6 sm:pt-8 sm:pb-5">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-base font-semibold text-white sm:h-16 sm:w-16 sm:text-lg">
            {getInitials(user.fullName)}
          </span>
          <p className="mt-3 max-w-full truncate text-sm font-semibold sm:text-base">{user.fullName}</p>
          <p className="max-w-full truncate text-xs text-gray-500 sm:text-sm">{user.email}</p>
          <span className="mt-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 capitalize">
            {user.role}
          </span>
        </div>

        <div className="border-t border-gray-100 p-2">
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => handleItemClick(item)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${item.danger
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-700 hover:bg-gray-50"
                }`}
            >
              <Icon name={item.icon} className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
