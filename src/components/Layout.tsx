import nookies from "nookies";
import React, { useState } from "react";
import { LogOut, Home } from "lucide-react";
import { useMeStore } from "../stores/me-store";
import { STORAGE_KEYS } from "../constants/storage-keys";
import { useNavigate, useLocation } from "react-router-dom";
import { VTS_AUTH_TOKEN } from "../constants/cookies-keys";
import { shortenTextWithEllipsis } from "../utils/shorten-text-with-ellipsis";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const me = useMeStore();
  const splitedName = me?.name?.split(" ") || [];
  const coverName =
    splitedName.length > 1
      ? `${splitedName[0][0]}${splitedName[1][0]}`
      : splitedName[0][0];

  const handleLogout = () => {
    STORAGE_KEYS.forEach((item) => {
      localStorage.removeItem(item);
      sessionStorage.removeItem(item);
    });

    nookies.destroy(null, VTS_AUTH_TOKEN, { path: "/" });

    setShowUserMenu(false);
    setShowLogoutModal(false);

    navigate("/login");
  };

  // const isRankingPage = location.pathname === "/ranking";
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-lg border-b-4 border-green-500">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/logo-caf.png"
                alt="CAF Logo"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h1 className="text-lg font-bold text-gray-800">CAF Vote</h1>
                <p className="text-xs text-gray-600">Sistema de Votação</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {!isHomePage && (
                <button
                  onClick={() => navigate("/")}
                  className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  title="Início"
                >
                  <Home size={20} />
                </button>
              )}

              {/* {!isRankingPage && (
                <button
                  onClick={() => navigate("/ranking")}
                  className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors"
                  title="Ranking"
                >
                  <Trophy size={20} />
                </button>
              )} */}

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors font-bold text-gray-600"
                >
                  {coverName}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 font-bold text-gray-600">
                          {coverName}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {me?.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {shortenTextWithEllipsis(me?.email || "", 20)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      {/* <Link
                        to="ranking"
                        onClick={() => {
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors"
                      >
                        <Trophy size={16} className="text-gray-500" />
                        <span className="text-gray-700">Ranking</span>
                      </Link>

                      <hr className="my-2" /> */}

                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          setShowLogoutModal(true);
                        }}
                        className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-red-50 transition-colors text-red-600"
                      >
                        <LogOut size={16} />
                        <span>Sair</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Confirmar Saída
              </h3>
              <p className="text-gray-600">
                Tem certeza que deseja sair do sistema?
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 px-4 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
};

export default Layout;
