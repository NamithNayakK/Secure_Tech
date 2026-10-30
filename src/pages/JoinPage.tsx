import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { SITE_CONFIG } from "../config/site";

const schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid college email"),
  department: z.string().min(2, "Department is required"),
  semester: z.coerce.number().int().min(1).max(8, "Semester must be 1–8"),
  interests: z.array(z.string()).min(1, "Select at least one area of interest"),
  whyJoin: z.string().min(50, "Tell us a bit more — at least 50 characters"),
});
type FormData = z.infer<typeof schema>;

const INTEREST_OPTIONS = [
  "Ethical Hacking", "Web Application Security", "Network Security",
  "Digital Forensics", "Cloud Security", "AI & ML Security",
  "Malware Analysis", "Security Operations", "CTF Competitions",
  "Security Research", "Awareness & Outreach",
];

const BENEFITS = [
  { title: "Hands-On Learning", body: "Access to workshops, labs and the Cyber Range — tools and technique, not just theory." },
  { title: "CTF Competition Teams", body: "Join organised teams for inter-college and national CTF competitions." },
  { title: "Research Collaboration", body: "Work on student-led security research projects with peer and faculty guidance." },
  { title: "Industry Exposure", body: "Guest sessions with practitioners, campus talks and external event participation." },
  { title: "Peer Community", body: "A supportive group of fellow enthusiasts across all skill levels and backgrounds." },
  { title: "Portfolio Building", body: "Real project contributions, write-ups and competition records for your CV." },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p style={{ color: "var(--c-alert)", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", marginTop: "0.25rem" }}>
      ✕ {message}
    </p>
  );
}

const getTimestamp = () => new Date().toISOString();

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: { interests: [] },
  });

  const interests = useWatch({ control, name: "interests" }) ?? [];

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setValue("interests", interests.filter((i) => i !== interest), { shouldValidate: true });
    } else {
      setValue("interests", [...interests, interest], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    if (!isSupabaseConfigured || !supabase) {
      // Form is not connected — never fake success
      setSubmitError(
        `The form is not connected to a database yet. Nothing was saved.\n\nTo enquire directly, email: ${SITE_CONFIG.contact.email}`
      );
      return;
    }

    const { error } = await supabase.from("membership_enquiries").insert([{
      full_name: data.fullName,
      email: data.email,
      department: data.department,
      semester: data.semester,
      interests: data.interests,
      why_join: data.whyJoin,
      submitted_at: getTimestamp(),
    }]);

    if (error) {
      setSubmitError(`Submission failed: ${error.message}. Please email us directly at ${SITE_CONFIG.contact.email}.`);
    } else {
      setSubmitted(true);
    }
  };

  const fieldStyle = {
    width: "100%",
    background: "var(--c-navy)",
    border: "1px solid rgba(232,238,245,0.1)",
    color: "var(--c-text)",
    fontFamily: "var(--font-body)",
    fontSize: "var(--fs-sm)",
    padding: "0.75rem 1rem",
    borderRadius: 2,
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <main id="main-content" style={{ paddingTop: "var(--header-h)" }}>
      {/* Header */}
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <p className="section-number" style={{ marginBottom: "0.75rem" }}>JOIN US</p>
        <h1 className="font-display" style={{ fontSize: "var(--fs-hero)", lineHeight: 0.88, marginBottom: "1.5rem" }}>
          BE PART OF
          <br />
          <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>THE</em>
          <br />
          DEFENCE.
        </h1>
        <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-xl)", maxWidth: "40ch", lineHeight: 1.5 }}>
          Open to all students of Global Academy of Technology, regardless of prior security experience.
        </p>
      </section>

      {/* Benefits */}
      <section className="section-bone" style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)" }}>
        <p className="section-number" style={{ color: "rgba(11,18,32,0.45)", marginBottom: "1.5rem" }}>01 / WHY JOIN</p>
        <h2 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, color: "var(--c-bone-text)", marginBottom: "2.5rem" }}>
          WHAT YOU GET.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "2rem" }}>
          {BENEFITS.map((b, i) => (
            <div key={i} style={{ borderTop: "1px solid rgba(11,18,32,0.1)", paddingTop: "1.25rem" }}>
              <p className="font-mono-label" style={{ color: "rgba(11,18,32,0.4)", marginBottom: "0.5rem" }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-lg)", fontWeight: 900, textTransform: "uppercase", color: "var(--c-bone-text)", marginBottom: "0.5rem" }}>
                {b.title}
              </h3>
              <p style={{ color: "rgba(11,18,32,0.55)", fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)" }}>
        <p className="section-number" style={{ marginBottom: "1.5rem" }}>02 / ENQUIRY FORM</p>

        {!isSupabaseConfigured && (
          <div style={{
            padding: "0.875rem 1.25rem",
            background: "rgba(57,123,255,0.06)",
            border: "1px solid rgba(57,123,255,0.2)",
            marginBottom: "2rem",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-xs)",
            color: "var(--c-muted)",
            lineHeight: 1.6,
          }}>
            ℹ The form backend is not configured. Submitting will not save your data. To enquire directly, email{" "}
            <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: "var(--c-cyan)" }}>{SITE_CONFIG.contact.email}</a>.
          </div>
        )}

        {submitted ? (
          <div style={{
            border: "1px solid rgba(22,196,217,0.3)",
            padding: "3rem",
            textAlign: "center",
          }}>
            <p className="font-display" style={{ fontSize: "var(--fs-3xl)", color: "var(--c-cyan)", marginBottom: "0.75rem" }}>
              ENQUIRY RECEIVED.
            </p>
            <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>
              Thank you for your interest in Secure Tech Club. We'll be in touch at the email you provided.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ maxWidth: "640px" }}>
            {/* Full Name */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="fullName" className="font-mono-label" style={{ color: "var(--c-muted)", display: "block", marginBottom: "0.5rem" }}>
                Full Name *
              </label>
              <input id="fullName" {...register("fullName")} style={fieldStyle} placeholder="As per ID card" />
              <FieldError message={errors.fullName?.message} />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="email" className="font-mono-label" style={{ color: "var(--c-muted)", display: "block", marginBottom: "0.5rem" }}>
                College Email *
              </label>
              <input id="email" type="email" {...register("email")} style={fieldStyle} placeholder="yourname@gat.ac.in" />
              <FieldError message={errors.email?.message} />
            </div>

            {/* Department + Semester */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <label htmlFor="department" className="font-mono-label" style={{ color: "var(--c-muted)", display: "block", marginBottom: "0.5rem" }}>
                  Department *
                </label>
                <input id="department" {...register("department")} style={fieldStyle} placeholder="e.g. CSE, ISE, ECE" />
                <FieldError message={errors.department?.message} />
              </div>
              <div>
                <label htmlFor="semester" className="font-mono-label" style={{ color: "var(--c-muted)", display: "block", marginBottom: "0.5rem" }}>
                  Semester *
                </label>
                <input id="semester" type="number" min={1} max={8} {...register("semester")} style={fieldStyle} placeholder="1–8" />
                <FieldError message={errors.semester?.message} />
              </div>
            </div>

            {/* Interests */}
            <div style={{ marginBottom: "1.5rem" }}>
              <p className="font-mono-label" style={{ color: "var(--c-muted)", marginBottom: "0.75rem" }}>
                Areas of Interest * (select all that apply)
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }} role="group" aria-label="Areas of interest">
                {INTEREST_OPTIONS.map((opt) => {
                  const selected = interests.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleInterest(opt)}
                      aria-pressed={selected}
                      className="btn"
                      style={{
                        padding: "0.35rem 0.875rem",
                        background: selected ? "var(--c-cyan)" : "transparent",
                        color: selected ? "var(--c-obsidian)" : "var(--c-muted)",
                        border: `1px solid ${selected ? "var(--c-cyan)" : "rgba(232,238,245,0.12)"}`,
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              <FieldError message={errors.interests?.message} />
            </div>

            {/* Why Join */}
            <div style={{ marginBottom: "2rem" }}>
              <label htmlFor="whyJoin" className="font-mono-label" style={{ color: "var(--c-muted)", display: "block", marginBottom: "0.5rem" }}>
                Why do you want to join? *
              </label>
              <textarea
                id="whyJoin"
                {...register("whyJoin")}
                rows={5}
                style={{ ...fieldStyle, resize: "vertical" }}
                placeholder="Tell us what draws you to cybersecurity and what you hope to learn or contribute..."
              />
              <FieldError message={errors.whyJoin?.message} />
            </div>

            {submitError && (
              <div style={{
                background: "rgba(255,90,54,0.06)",
                border: "1px solid rgba(255,90,54,0.3)",
                padding: "0.875rem 1rem",
                marginBottom: "1.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-xs)",
                color: "var(--c-alert)",
                whiteSpace: "pre-line",
                lineHeight: 1.6,
              }} role="alert">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ padding: "0.875rem 2rem", opacity: isSubmitting ? 0.6 : 1 }}
            >
              {isSubmitting ? "Submitting…" : "Submit Enquiry"} <ArrowRight size={14} />
            </button>

            <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", marginTop: "1rem" }}>
              Prefer email? Reach us at{" "}
              <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: "var(--c-cyan)" }}>
                {SITE_CONFIG.contact.email}
              </a>
            </p>
          </form>
        )}
      </section>
    </main>
  );
}
