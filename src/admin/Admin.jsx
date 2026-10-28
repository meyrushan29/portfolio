import { useCallback, useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown, FaPen, FaTrash, FaPlus, FaStar, FaExternalLinkAlt, FaSignOutAlt } from "react-icons/fa";
import { supabase } from "../lib/supabase";
import { fetchProjects, toRow, uploadMedia } from "../lib/projects";
import { PROJECTS } from "../constants";
import ProjectForm from "./ProjectForm";

const Shell = ({ children }) => (
  <div className="min-h-screen bg-surface">
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">{children}</div>
  </div>
);

const NotConfigured = () => (
  <Shell>
    <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Admin isn&apos;t connected</h1>
    <p className="mt-4 max-w-xl leading-relaxed text-body">
      Add <code className="rounded bg-surface-alt px-1.5 py-0.5 text-sm">VITE_SUPABASE_URL</code> and{" "}
      <code className="rounded bg-surface-alt px-1.5 py-0.5 text-sm">VITE_SUPABASE_ANON_KEY</code> to{" "}
      <code className="rounded bg-surface-alt px-1.5 py-0.5 text-sm">.env.local</code> (and to Vercel&apos;s environment variables), then restart the dev server. See the README for setup steps.
    </p>
  </Shell>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setBusy(false);
  };

  return (
    <Shell>
      <form onSubmit={submit} className="mx-auto mt-10 flex max-w-sm flex-col gap-5 rounded-[2rem] border border-line bg-bg p-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Sign in</h1>
        <div>
          <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium text-ink">Email</label>
          <input id="admin-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="admin-input" />
        </div>
        <div>
          <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-ink">Password</label>
          <input id="admin-password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="admin-input" />
        </div>
        <button type="submit" disabled={busy} className="btn-primary justify-center disabled:opacity-60">
          {busy ? "Signing in..." : "Sign in"}
        </button>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      </form>
    </Shell>
  );
};

// Uploads a bundled asset (e.g. a screenshot imported in constants) to storage.
async function uploadAsset(url, name) {
  if (!url) return null;
  const blob = await (await fetch(url)).blob();
  const ext = url.split("?")[0].split(".").pop();
  return uploadMedia(new File([blob], `${name}.${ext}`, { type: blob.type }));
}

const Dashboard = ({ session }) => {
  const [projects, setProjects] = useState(null);
  const [editing, setEditing] = useState(null); // null | "new" | project
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      setProjects(await fetchProjects());
    } catch (e) {
      setError(e.message);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const run = async (action) => {
    setBusy(true);
    setError("");
    try {
      await action();
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  // Only one project is shown as featured, so clear the flag on the others.
  const clearOtherFeatured = async (id) => {
    let query = supabase.from("projects").update({ featured: false }).eq("featured", true);
    if (id) query = query.neq("id", id);
    const { error } = await query;
    if (error) throw error;
  };

  const save = (project) => run(async () => {
    if (project.featured) await clearOtherFeatured(project.id);
    const row = toRow(project);
    const { error } = project.id
      ? await supabase.from("projects").update(row).eq("id", project.id)
      : await supabase.from("projects").insert({ ...row, sort_order: projects.length });
    if (error) throw error;
    setEditing(null);
  });

  const remove = (project) => {
    if (!window.confirm(`Delete "${project.title}"? This can't be undone.`)) return;
    run(async () => {
      const { error } = await supabase.from("projects").delete().eq("id", project.id);
      if (error) throw error;
    });
  };

  const move = (index, delta) => run(async () => {
    const reordered = [...projects];
    const [item] = reordered.splice(index, 1);
    reordered.splice(index + delta, 0, item);
    const results = await Promise.all(
      reordered.map((p, i) => supabase.from("projects").update({ sort_order: i }).eq("id", p.id))
    );
    const failed = results.find((r) => r.error);
    if (failed) throw failed.error;
  });

  const importCurrent = () => run(async () => {
    for (const [i, p] of PROJECTS.entries()) {
      const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const image = await uploadAsset(p.image, slug);
      const video = await uploadAsset(p.video, `${slug}-video`);
      const { error } = await supabase.from("projects").insert(toRow({ ...p, image, video, sortOrder: i }));
      if (error) throw error;
    }
  });

  if (editing) {
    return (
      <Shell>
        <ProjectForm
          initial={editing === "new" ? null : editing}
          busy={busy}
          error={error}
          onSave={save}
          onCancel={() => { setEditing(null); setError(""); }}
        />
      </Shell>
    );
  }

  return (
    <Shell>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Projects</h1>
          <p className="mt-1 text-sm text-faint">Signed in as {session.user.email}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/" className="btn-secondary"><FaExternalLinkAlt className="text-xs" /> View site</a>
          <button type="button" onClick={() => supabase.auth.signOut()} className="btn-secondary"><FaSignOutAlt /> Sign out</button>
        </div>
      </header>

      {error && <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

      <div className="mt-10 flex flex-wrap gap-3">
        <button type="button" onClick={() => setEditing("new")} disabled={busy} className="btn-primary disabled:opacity-60"><FaPlus className="text-xs" /> Add project</button>
      </div>

      {!projects ? (
        <p className="mt-10 text-faint">Loading projects...</p>
      ) : projects.length === 0 ? (
        <div className="mt-10 rounded-[2rem] border border-dashed border-line-strong bg-bg p-8">
          <h2 className="font-display text-2xl font-semibold text-ink">No projects in the database yet</h2>
          <p className="mt-2 max-w-lg text-body">
            The live site is showing the built-in projects. Import them to start editing, including their screenshots and video.
          </p>
          <button type="button" onClick={importCurrent} disabled={busy} className="btn-primary mt-6 disabled:opacity-60">
            {busy ? "Importing..." : `Import ${PROJECTS.length} current projects`}
          </button>
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {projects.map((project, i) => (
            <li key={project.id} className="flex items-center gap-4 rounded-2xl border border-line bg-bg p-3 pr-4">
              <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-surface-alt">
                {project.image && <img src={project.image} alt="" className="h-full w-full object-cover object-top" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 truncate font-semibold text-ink">
                  {project.featured && <FaStar className="flex-shrink-0 text-accent" aria-label="Featured" />}
                  <span className="truncate">{project.title}</span>
                </p>
                {project.subtitle && <p className="truncate text-sm text-faint">{project.subtitle}</p>}
              </div>
              <div className="flex flex-shrink-0 items-center gap-1">
                <IconButton label="Move up" onClick={() => move(i, -1)} disabled={busy || i === 0}><FaArrowUp /></IconButton>
                <IconButton label="Move down" onClick={() => move(i, 1)} disabled={busy || i === projects.length - 1}><FaArrowDown /></IconButton>
                <IconButton label={`Edit ${project.title}`} onClick={() => setEditing(project)} disabled={busy}><FaPen /></IconButton>
                <IconButton label={`Delete ${project.title}`} onClick={() => remove(project)} disabled={busy} danger><FaTrash /></IconButton>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
};

const IconButton = ({ label, onClick, disabled, danger, children }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={onClick}
    disabled={disabled}
    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors disabled:opacity-30 ${danger ? "text-red-700 hover:bg-red-50" : "text-body hover:bg-surface-alt hover:text-accent"}`}
  >
    {children}
  </button>
);

const Admin = () => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    document.title = "Admin | Meyrushan Nadarajan";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);

    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!supabase) return <NotConfigured />;
  if (session === undefined) return null;
  return session ? <Dashboard session={session} /> : <Login />;
};

export default Admin;
