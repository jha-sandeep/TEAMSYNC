import "./Projects.css";
import { useState } from "react";
import { useGetProjectsQuery, type ProjectStatus } from "../../features/projects/projectApi";
import PageFeedback from "../../components/feedback/PageFeedback";

function Projects() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "">("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, isError, refetch } = useGetProjectsQuery({
    page: page,
    limit: 5,
    search: search.trim() || undefined,
    status: status || undefined,
  });

  if (isLoading) {
    return (
      <PageFeedback
        type="loading"
        title="Loading projects..."
        message="Loading your workspace projects."
      />
    );
  }

  if (isError) {
    return (
      <PageFeedback
        type="error"
        title="Unable to load projects"
        message="We couldn't load your workspace projects."
        onRetry={refetch}
      />
    );
  }

  const projects = data?.data?.projects ?? [];
  const pagination = data?.data;

  return (
    <div className="projects-page">
      <section className="projects-heading">
        <div>
          <p className="projects-eyebrow">Workspace</p>

          <h1>Projects</h1>

          <p className="projects-description">Manage your TeamSync projects.</p>
        </div>

        <button type="button" className="projects-primary-button">
          + New Project
        </button>
      </section>
      {/* Search and filter */}
      <section className="projects-toolbar">
        <div className="projects-search">
          <input
            type="search"
            placeholder="Search projects..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search projects"
          />
        </div>
        <select
          className=""
          value={status}
          onChange={(event) => setStatus(event.target.value as ProjectStatus | "")}
          aria-label="Filter projects by status"
        >
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option> <option value="ARCHIVED">Archived</option>
        </select>
      </section>
      {/* Small fetching indicator for search/filter changes */}{" "}
      {isFetching && <div className="projects-fetching"> Updating projects... </div>}
      {projects.length === 0 ? (
        <section className="projects-empty-state">
          <div className="projects-empty-icon">P</div>

          <strong>{search || status ? "No matching projects" : "No projects yet"}</strong>

          <p>
            {search || status
              ? "Try changing your search or status filter."
              : "Create your first project to start organizing your team's work."}
          </p>

          {!search && !status && (
            <button type="button" className="projects-primary-button">
              {" "}
              + Create Project{" "}
            </button>
          )}
        </section>
      ) : (
        <section className="projects-list">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-card-content">
                <div className="project-card-top">
                  <div>
                    <h2>{project.name}</h2>

                    <p>{project.description || "No description"}</p>
                  </div>

                  <span className={`project-status project-status-${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                </div>

                <div className="project-card-meta">
                  <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>

                  <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
      {/* Pagination will be added next */}
      {pagination && pagination.totalPages > 1 && (
        <section className="projects-pagination">
          <button
            type="button"
            onClick={() => setPage((currentPage) => currentPage - 1)}
            disabled={pagination.page <= 1}
          >
            Previous
          </button>

          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            type="button"
            onClick={() => setPage((currentPage) => currentPage + 1)}
            disabled={pagination.page >= pagination.totalPages}
          >
            Next
          </button>
        </section>
      )}
    </div>
  );
}

export default Projects;
