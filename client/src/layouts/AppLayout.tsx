import { useState } from "react";
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
  FolderKanban,
  CheckSquare,
  Activity,
  LockKeyhole,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import "./AppLayout.css";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { logout } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApi";

function AppLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const [logoutApi, { isLoading }] = useLogoutMutation();

  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();

      dispatch(logout());

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "app-nav-link active" : "app-nav-link";

  return (
    <div className="app-layout">
      {sidebarOpen && (
        <div className="app-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`app-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="app-brand">
          <div className="app-brand-mark">TS</div>

          <div>
            <h1>TeamSync</h1>
            <span>Team workspace</span>
          </div>
        </div>

        <nav className="app-navigation">
          <div className="app-nav-section">
            <span className="app-nav-heading">Workspace</span>

            <NavLink to="/dashboard" className={getNavClass}>
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/projects" className={getNavClass}>
              <FolderKanban size={18} />
              <span>Projects</span>
            </NavLink>

            <NavLink to="/tasks" className={getNavClass}>
              <CheckSquare size={18} />
              <span>Tasks</span>
            </NavLink>
          </div>

          <div className="app-nav-section">
            <span className="app-nav-heading">Team</span>

            <NavLink to="/team" className={getNavClass}>
              <Users size={18} />
              <span>Members</span>
            </NavLink>

            <NavLink to="/activity" className={getNavClass}>
              <Activity size={18} />
              <span>Activity</span>
            </NavLink>
          </div>

          <div className="app-nav-section">
            <span className="app-nav-heading">System</span>

            <NavLink to="/settings" className={getNavClass}>
              <Settings size={18} />
              <span>Settings</span>
            </NavLink>
          </div>
        </nav>

        <div className="app-sidebar-footer">
          <div className="app-profile-wrapper">
            {profileOpen && (
              <div className="app-profile-menu">
                <div className="profile-menu-header">
                  <strong>{user?.name}</strong>
                  <span>{user?.email}</span>
                </div>

                <div className="profile-menu-divider" />

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/profile");
                  }}
                >
                  <User size={17} />
                  <span>My Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/change-password");
                  }}
                >
                  <LockKeyhole size={17} />
                  <span>Change Password</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/settings");
                  }}
                >
                  <Settings size={17} />
                  <span>Account Settings</span>
                </button>

                <div className="profile-menu-divider" />

                <button
                  type="button"
                  className="profile-menu-logout"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  <LogOut size={17} />
                  <span>{isLoading ? "Signing out..." : "Sign out"}</span>
                </button>
              </div>
            )}

            <button
              type="button"
              className="app-profile-button"
              onClick={() => setProfileOpen((current) => !current)}
              aria-expanded={profileOpen}
            >
              <div className="app-avatar">{user?.name?.charAt(0).toUpperCase() || "U"}</div>

              <div className="app-profile-info">
                <strong>{user?.name || "User"}</strong>
                <span>{user?.role || "Member"}</span>
              </div>

              <ChevronDown size={17} className={profileOpen ? "profile-chevron open" : ""} />
            </button>
          </div>
        </div>
      </aside>

      <div className="app-content">
        <header className="app-header">
          <div className="app-header-left">
            <button
              type="button"
              className="app-menu-button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>

            <div className="app-page-context">
              <span>Workspace</span>
              <strong>TeamSync</strong>
            </div>
          </div>

          <div className="app-header-right">
            <button type="button" className="app-icon-button" aria-label="Notifications">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>

            <button
              type="button"
              className="app-header-avatar"
              onClick={() => setProfileOpen((current) => !current)}
            >
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </button>
          </div>
        </header>

        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
