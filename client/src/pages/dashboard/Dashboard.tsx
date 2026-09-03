import "./Dashboard.css";
import { useGetDashboardOverviewQuery } from "../../features/dashboard/dashboardApi";
import PageFeedback from "../../components/feedback/PageFeedback";

function Dashboard() {
  const { data, isLoading, isError, refetch } = useGetDashboardOverviewQuery();

  if (isLoading) {
    return (
      <PageFeedback
        type="loading"
        title="Loading dashboard..."
        message="Loading your workspace overview."
      />
    );
  }

  if (isError) {
    return (
      <PageFeedback
        type="error"
        title="Unable to load dashboard"
        message="We couldn't load your workspace overview."
        onRetry={refetch}
      />
    );
  }

  const dashboard = data?.data;

  return (
    <div className="dashboard-page">
      {/* Page heading */}
      <section className="dashboard-heading">
        <div>
          <p className="dashboard-eyebrow">Workspace overview</p>
          <h1>Dashboard</h1>
          <p className="dashboard-description">
            Here's what's happening across your TeamSync workspace.
          </p>
        </div>

        <button type="button" className="dashboard-primary-button">
          + New Project
        </button>
      </section>

      {/* KPI cards */}
      <section className="dashboard-stats">
        <article className="dashboard-stat-card">
          <div className="dashboard-stat-top">
            <span>Total Projects</span>
            <span className="dashboard-stat-icon">P</span>
          </div>

          <strong>{dashboard?.stats.totalProjects ?? "—"}</strong>
          <p>Projects in your workspace</p>
        </article>

        <article className="dashboard-stat-card">
          <div className="dashboard-stat-top">
            <span>Total Tasks</span>
            <span className="dashboard-stat-icon">T</span>
          </div>

          <strong>{dashboard?.stats.totalTasks ?? "—"}</strong>
          <p>Tasks across all projects</p>
        </article>

        <article className="dashboard-stat-card">
          <div className="dashboard-stat-top">
            <span>In Progress</span>
            <span className="dashboard-stat-icon">↗</span>
          </div>

          <strong>{dashboard?.stats.inProgressTasks ?? "—"}</strong>
          <p>Tasks currently being worked on</p>
        </article>

        <article className="dashboard-stat-card">
          <div className="dashboard-stat-top">
            <span>Team Members</span>
            <span className="dashboard-stat-icon">M</span>
          </div>

          <strong>{dashboard?.stats.teamMembers ?? "—"}</strong>
          <p>People in your workspace</p>
        </article>
      </section>

      {/* Main dashboard grid */}
      <section className="dashboard-grid">
        <article className="dashboard-panel dashboard-panel-large">
          <div className="dashboard-panel-header">
            <div>
              <h2>Project Overview</h2>
              <p>Track project activity and progress.</p>
            </div>
          </div>

          <div className="dashboard-project-overview">
            {data?.data.projectOverview?.length ? (
              data.data.projectOverview.map((project) => (
                <div key={project.id} className="dashboard-project-overview-item">
                  <div className="dashboard-project-overview-top">
                    <div className="dashboard-project-overview-info">
                      <strong>{project.name}</strong>

                      <span>
                        {project.completedTasks} of {project.totalTasks} tasks completed
                      </span>
                    </div>

                    <strong className="dashboard-project-progress-value">
                      {project.progress}%
                    </strong>
                  </div>

                  <div className="dashboard-progress-track">
                    <div
                      className="dashboard-progress-fill"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>

                  <div className="dashboard-project-task-summary">
                    <span>{project.todoTasks} To Do</span>

                    <span>{project.inProgressTasks} In Progress</span>

                    <span>{project.completedTasks} Completed</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="dashboard-empty-state">
                <span className="dashboard-empty-icon">P</span>

                <strong>No project progress yet</strong>

                <p>Project progress will appear here once projects have tasks.</p>
              </div>
            )}
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>Tasks by Status</h2>
              <p>Current task distribution.</p>
            </div>
          </div>

          <div className="dashboard-status-placeholder">
            <div>
              <span className="status-dot status-completed" />
              <span>Completed</span>
              <strong>{dashboard?.tasksByStatus.COMPLETED ?? "—"}</strong>
            </div>

            <div>
              <span className="status-dot status-progress" />
              <span>In Progress</span>
              <strong>{dashboard?.tasksByStatus.IN_PROGRESS ?? "—"}</strong>
            </div>

            <div>
              <span className="status-dot status-todo" />
              <span>To Do</span>
              <strong>{dashboard?.tasksByStatus.TODO ?? "—"}</strong>
            </div>
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>Recent Projects</h2>
              <p>Your latest workspace projects.</p>
            </div>
          </div>

          {dashboard?.recentProjects.length ? (
            <div className="dashboard-project-list">
              {dashboard.recentProjects.map((project) => (
                <div key={project.id} className="dashboard-project-item">
                  <div>
                    <strong>{project.name}</strong>
                    <span>{project.description || "No description"}</span>
                  </div>

                  <span className="dashboard-project-status">{project.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="dashboard-empty-state">
              <span className="dashboard-empty-icon">P</span>
              <strong>No projects yet</strong>
              <p>Create your first project to see it appear here.</p>
            </div>
          )}
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>Team Workload</h2>
              <p>Current workload across the team.</p>
            </div>
          </div>

          {dashboard?.teamWorkload.length ? (
            <div className="dashboard-workload-list">
              {dashboard.teamWorkload.map((member) => (
                <div key={member.userId} className="dashboard-workload-item">
                  <div>
                    <strong>{member.name}</strong>
                    <span>{member.email}</span>
                  </div>

                  <div className="dashboard-workload-count">
                    <strong>{member.assignedTasks}</strong>
                    <span>tasks</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="dashboard-empty-state">
              <span className="dashboard-empty-icon">M</span>
              <strong>No workload data yet</strong>
              <p>Team workload will appear as tasks are assigned.</p>
            </div>
          )}
        </article>

        <article className="dashboard-panel dashboard-panel-full">
          <div className="dashboard-panel-header">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest actions across your workspace.</p>
            </div>
          </div>

          <div className="dashboard-empty-state dashboard-empty-horizontal">
            <span className="dashboard-empty-icon">A</span>

            <div>
              <strong>No recent activity</strong>
              <p>Workspace activity will appear here as your team starts working.</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Dashboard;
