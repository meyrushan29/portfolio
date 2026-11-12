import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowUp, FaArrowDown, FaPen, FaTrash, FaPlus, FaStar, FaExternalLinkAlt, FaSignOutAlt, FaSyncAlt } from "react-icons/fa";
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Runs fn up to `tries` times; a flaky connection mid-import ("Failed to
// fetch") should not abandon the whole run.
async function withRetry(fn, tries = 4) {
  let last;
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      if (attempt < tries) await sleep(700 * attempt);
    }
  }
  throw last;
}

// Uploads a bundled asset (e.g. a screenshot imported in constants) to storage.
async function uploadAsset(url, name) {
  if (!url) return null;
  return withRetry(async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Could not read ${url} (${res.status})`);
    const blob = await res.blob();
    // From the MIME type, so data: URLs and query strings cannot leak into the file name.
    const ext = (blob.type.split("/")[1] || "bin").replace(/[^a-z0-9]/gi, "").toLowerCase();
    return uploadMedia(new File([blob], `${name}.${ext}`, { type: blob.type }));
  });
}

const Dashboard = ({ session }) => {
  const [projects, setProjects] = useState(null);
  const [editing, setEditing] = useState(null); // null | "new" | project
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgressState] = useState("");
  const progressRef = useRef("");
  const setProgress = (text) => {
    progressRef.current = text;
    setProgressState(text);
  };

  const load = useCallback(
    () => fetchProjects().then(setProjects, (e) => setError(e.message)),
    []
  );

  useEffect(() => {
    load();
  }, [load]);

  const run = async (action) => {
    setBusy(true);
    setError("");
    try {
      await action();
      await load();
    } catch (e) {
      console.error(e);
      setError(progressRef.current ? `${progressRef.current}: ${e.message}` : e.message);
    } finally {
      setBusy(false);
      setProgress("");
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

  // Imports the built-in projects that are not in the database yet (matched
  // by title), so a run that stopped half way can simply be started again.
  const importBuiltIn = async () => {
    const { data: existing, error: readError } = await supabase.from("projects").select("title");
    if (readError) throw readError;
    const have = new Set((existing || []).map((r) => r.title));
    const todo = PROJECTS.filter((p) => !have.has(p.title));

    for (const [n, p] of todo.entries()) {
      const label = `${p.title} (${n + 1} of ${todo.length})`;
      const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      setProgress(`${label}: uploading cover`);
      const image = await uploadAsset(p.image, slug);
      if (p.video) setProgress(`${label}: uploading video`);
      const video = await uploadAsset(p.video, `${slug}-video`);
      const gallery = [];
      for (const [j, url] of (p.gallery || []).entries()) {
        setProgress(`${label}: screenshot ${j + 1} of ${p.gallery.length}`);
        gallery.push(await uploadAsset(url, `${slug}-${String(j + 1).padStart(2, "0")}`));
      }
      setProgress(`${label}: saving`);
      const sortOrder = PROJECTS.indexOf(p);
      const { error } = await withRetry(() => supabase.from("projects").insert(toRow({ ...p, image, video, gallery, sortOrder })));
      if (error) throw error;
    }
  };

  const importCurrent = () => run(importBuiltIn);

  const missingBuiltIn = projects
    ? PROJECTS.filter((p) => !projects.some((row) => row.title === p.title))
    : [];

  // Replaces everything in the database with the built-in projects from the
  // code, so new fields added in constants show up without editing each row.
  const resetToBuiltIn = () => {
    const ok = window.confirm(
      `Delete all ${projects.length} projects in the database and import the ${PROJECTS.length} built-in projects again? Edits made here will be lost.`
    );
    if (!ok) return;
    run(async () => {
      setProgress("Deleting existing projects");
      const { error } = await withRetry(() => supabase.from("projects").delete().not("id", "is", null));
      if (error) throw error;
      await importBuiltIn();
    });
  };

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

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setEditing("new")} disabled={busy} className="btn-primary disabled:opacity-60"><FaPlus className="text-xs" /> Add project</button>
        {missingBuiltIn.length > 0 && projects?.length > 0 && (
          <button type="button" onClick={importCurrent} disabled={busy} className="btn-secondary disabled:opacity-60">
            <FaPlus className="text-xs" /> Import {missingBuiltIn.length} missing built-in {missingBuiltIn.length === 1 ? "project" : "projects"}
          </button>
        )}
        {projects?.length > 0 && (
          <button type="button" onClick={resetToBuiltIn} disabled={busy} className="btn-secondary disabled:opacity-60">
            <FaSyncAlt className="text-xs" /> Delete all and re-import built-in projects
          </button>
        )}
      </div>
      {progress && (
        <p aria-live="polite" className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm text-ink">
          <FaSyncAlt className="animate-spin text-xs text-accent" /> {progress}
        </p>
      )}

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
