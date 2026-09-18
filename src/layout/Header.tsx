import { useRef, useState, type FC, type FormEvent } from "react";
import ProfileModal from "../components/common/ProfileModal";
import Icon from "../components/ui/Icon";
import {
  CURRENT_USER,
  LANGUAGE_STORAGE_KEY,
  LANGUAGES,
  NOTIFICATIONS,
  PROFILE_MENU_ITEMS,
} from "../constants/data";
import { selectUser } from "../features/auth";
import { useClickOutside } from "../hooks";
import { useAppSelector } from "../store";
import type { Language } from "../types";
import { getInitials } from "../utils/helper";

/** Saqlangan tilni o'qiydi (bo'lmasa - uz) */
const readStoredLanguage = (): Language => {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === "uz" || stored === "ru" ? stored : "uz";
};

type HeaderProps = {
  /** Mobil qurilmada sidebar'ni ochish */
  onMenuClick: () => void;
};

type SearchFieldProps = {
  value: string;
  autoFocus?: boolean;
  className?: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

/** Qidiruv maydoni (desktop va mobil uchun bir xil) */
const SearchField: FC<SearchFieldProps> = ({
  value,
  autoFocus,
  className = "",
  onChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit} className={`relative w-full ${className}`}>
    <Icon
      name="search"
      className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
    />
    <input
      type="search"
      value={value}
      autoFocus={autoFocus}
      onChange={({ target }) => onChange(target.value)}
      placeholder="Qidirish..."
      className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pr-3 pl-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
    />
  </form>
);

const Header: FC<HeaderProps> = ({ onMenuClick }) => {
  const [search, setSearch] = useState("");
  const [isSearchOpen, setSearchOpen] = useState(false);
  // Profil ma'lumotlari auth store'dan (login qilinmagan bo'lsa - placeholder)
  const user = useAppSelector(selectUser) ?? CURRENT_USER;
  const [language, setLanguage] = useState<Language>(readStoredLanguage);
  const [isLanguageOpen, setLanguageOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const languageRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useClickOutside(languageRef, () => setLanguageOpen(false), isLanguageOpen);
  useClickOutside(notificationsRef, () => setNotificationsOpen(false), isNotificationsOpen);

  const unreadCount = NOTIFICATIONS.filter(({ unread }) => unread).length;

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: keyinchalik sahifalar bo'ylab qidiruv (route/filter bo'yicha) qo'shiladi
  };

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
    setLanguageOpen(false);
    // TODO: i18n (tarjimalar) tanlangan tilga o'tadi
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-1.5 border-b border-gray-200 bg-white px-3 sm:gap-3 sm:px-4 lg:px-6">
      {/* Mobil menyu tugmasi */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Menyuni ochish"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 lg:hidden"
      >
        <Icon name="menu" />
      </button>

      {/* Desktop qidiruv */}
      <SearchField
        value={search}
        onChange={setSearch}
        onSubmit={handleSearch}
        className="hidden max-w-md md:block"
      />

      <div className="ml-auto flex items-center gap-0.5 sm:gap-2">
        {/* Mobil qidiruv tugmasi */}
        <button
          type="button"
          onClick={() => {
            setSearchOpen((open) => !open);
            setNotificationsOpen(false);
            setLanguageOpen(false);
          }}
          aria-label="Qidirish"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 md:hidden"
        >
          <Icon name={isSearchOpen ? "close" : "search"} />
        </button>

        {/* Notificationlar */}
        <div ref={notificationsRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen((open) => !open);
              setLanguageOpen(false);
              setSearchOpen(false);
            }}
            aria-label="Notificationlar"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <Icon name="bell" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="fixed inset-x-3 top-16 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg sm:absolute sm:inset-x-auto sm:top-auto sm:right-0 sm:mt-2 sm:w-80">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <span className="text-sm font-semibold">Notificationlar</span>
                <span className="text-xs text-gray-400">{unreadCount} yangi</span>
              </div>
              <ul className="max-h-72 overflow-y-auto">
                {NOTIFICATIONS.map(({ id, title, description, time, unread }) => (
                  <li
                    key={id}
                    className={`border-b border-gray-50 px-4 py-3 last:border-0 ${unread ? "bg-gray-50/70" : ""
                      }`}
                  >
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{description}</p>
                    <p className="mt-1 text-[11px] text-gray-400">{time}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Til tanlash */}
        <div ref={languageRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setLanguageOpen((open) => !open);
              setNotificationsOpen(false);
              setSearchOpen(false);
            }}
            aria-label="Tilni tanlash"
            className="flex h-10 items-center gap-1.5 rounded-full px-2.5 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <Icon name="language" className="h-4 w-4" />
            <span className="text-sm font-medium uppercase">{language}</span>
            <Icon name="chevron-down" className="h-3.5 w-3.5" />
          </button>

          {isLanguageOpen && (
            <div className="absolute right-0 mt-2 w-32 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
              {LANGUAGES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleLanguageChange(value)}
                  className={`flex w-full items-center justify-between px-3 py-2 text-sm transition hover:bg-gray-50 ${value === language ? "font-semibold text-gray-900" : "text-gray-600"
                    }`}
                >
                  {label}
                  {value === language && <Icon name="check" className="h-4 w-4" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profil */}
        <button
          type="button"
          onClick={() => setProfileOpen(true)}
          aria-label="Profil"
          className="flex items-center gap-2 rounded-full py-1 pr-2 pl-1 text-left transition hover:bg-gray-100"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
            {getInitials(user.fullName)}
          </span>
          <span className="hidden md:block">
            <span className="block text-sm leading-tight font-medium text-gray-900">
              {user.fullName}
            </span>
            <span className="block text-xs leading-tight text-gray-400 capitalize">
              {user.role}
            </span>
          </span>
          <Icon name="chevron-down" className="h-3.5 w-3.5 text-gray-400" />
        </button>
      </div>

      {/* Mobil qidiruv paneli */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-full border-b border-gray-200 bg-white p-3 shadow-sm md:hidden">
          <SearchField value={search} autoFocus onChange={setSearch} onSubmit={handleSearch} />
        </div>
      )}

      <ProfileModal
        isOpen={isProfileOpen}
        user={user}
        items={PROFILE_MENU_ITEMS}
        onClose={() => setProfileOpen(false)}
      />
    </header>
  );
};

export default Header;
