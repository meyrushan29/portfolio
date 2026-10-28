import { useState } from "react";
import { uploadMedia } from "../lib/projects";

const empty = {
  title: "", subtitle: "", description: "", features: [], technologies: [],
  image: "", video: "", github: "", demo: "", paper: "", featured: false,
};

const Field = ({ label, htmlFor, hint, children }) => (
  <div>
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
    {children}
    {hint && <p className="mt-1.5 text-xs text-faint">{hint}</p>}
  </div>
);

const MediaField = ({ id, label, accept, value, onChange, kind }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      onChange(await uploadMedia(file));
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <Field label={label} htmlFor={id}>
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4">
        {value && (kind === "video"
          ? <video src={value} controls muted className="max-h-56 w-full rounded-xl bg-surface-alt object-contain" />
          : <img src={value} alt="" className="max-h-56 w-full rounded-xl bg-surface-alt object-contain" />)}
        <div className="flex flex-wrap items-center gap-3">
          <input id={id} type="file" accept={accept} onChange={upload} disabled={uploading} className="text-sm text-body file:mr-3 file:rounded-full file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-accent" />
          {uploading && <span className="text-sm text-faint">Uploading...</span>}
          {value && !uploading && (
            <button type="button" onClick={() => onChange("")} className="text-sm font-medium text-red-700 hover:underline">Remove</button>
          )}
        </div>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      </div>
    </Field>
  );
};

const ProjectForm = ({ initial, busy, error, onSave, onCancel }) => {
  const [form, setForm] = useState(() => ({ ...empty, ...initial }));
  const [featuresText, setFeaturesText] = useState((initial?.features || []).join("\n"));
  const [techText, setTechText] = useState((initial?.technologies || []).join(", "));

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      features: featuresText.split("\n").map((s) => s.trim()).filter(Boolean),
      technologies: techText.split(",").map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
          {initial ? "Edit project" : "New project"}
        </h1>
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>

      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

      <div className="flex flex-col gap-6 rounded-[2rem] border border-line bg-bg p-6 sm:p-8">
        <Field label="Title" htmlFor="p-title">
          <input id="p-title" required value={form.title} onChange={set("title")} className="admin-input" />
        </Field>
        <Field label="Subtitle" htmlFor="p-subtitle">
          <input id="p-subtitle" value={form.subtitle} onChange={set("subtitle")} className="admin-input" />
        </Field>
        <Field label="Description" htmlFor="p-description">
          <textarea id="p-description" rows={5} value={form.description} onChange={set("description")} className="admin-input resize-y" />
        </Field>
        <Field label="Key features" htmlFor="p-features" hint="One per line. Shown as a checklist on the featured project.">
          <textarea id="p-features" rows={4} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} className="admin-input resize-y" />
        </Field>
        <Field label="Technologies" htmlFor="p-tech" hint="Separate with commas, e.g. React, Node.js, MongoDB">
          <input id="p-tech" value={techText} onChange={(e) => setTechText(e.target.value)} className="admin-input" />
        </Field>

        <MediaField id="p-image" label="Screenshot" accept="image/*" kind="image" value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
        <MediaField id="p-video" label="Demo video (optional)" accept="video/*" kind="video" value={form.video} onChange={(url) => setForm((f) => ({ ...f, video: url }))} />

        <div className="grid gap-6 sm:grid-cols-3">
          <Field label="GitHub URL" htmlFor="p-github">
            <input id="p-github" type="url" value={form.github} onChange={set("github")} className="admin-input" placeholder="https://github.com/..." />
          </Field>
          <Field label="Live demo URL" htmlFor="p-demo">
            <input id="p-demo" type="url" value={form.demo} onChange={set("demo")} className="admin-input" placeholder="https://..." />
          </Field>
          <Field label="Paper URL" htmlFor="p-paper">
            <input id="p-paper" type="url" value={form.paper} onChange={set("paper")} className="admin-input" placeholder="https://ieeexplore..." />
          </Field>
        </div>

        <label className="flex items-start gap-3 text-sm text-ink">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="mt-0.5 h-4 w-4 accent-[rgb(var(--accent))]" />
          <span>
            <span className="font-medium">Featured project</span>
            <span className="block text-faint">Shown large at the top of Projects. Only one project can be featured.</span>
          </span>
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
        <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
          {busy ? "Saving..." : initial ? "Save changes" : "Add project"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
