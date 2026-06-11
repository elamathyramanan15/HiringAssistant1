import { useState } from "react"
import {
  Calendar, Clock, Video, MapPin, Phone,
  User, Mail, CheckCircle, ChevronLeft,
  MoreVertical, Plus, AlertCircle, Save
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// ─── Reusable Input ────────────────────────────────────────────────────────────
const Input = ({ label, icon, required, hint, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    <label style={{
      fontSize: 11, fontWeight: 700, color: "#9CA3AF",
      textTransform: "uppercase", letterSpacing: "0.07em",
    }}>
      {label} {required && <span style={{ color: "#EF4444" }}>*</span>}
    </label>
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      border: "1px solid #E5E7EB", borderRadius: 8,
      padding: "0 12px", background: "#fff",
    }}>
      {icon && <span style={{ color: "#9CA3AF", flexShrink: 0 }}>{icon}</span>}
      <input
        {...props}
        style={{
          flex: 1, border: "none", outline: "none",
          padding: "10px 0", fontSize: 13, color: "#111827",
          background: "transparent",
        }}
      />
    </div>
    {hint && <span style={{ fontSize: 11, color: "#EF4444" }}>{hint}</span>}
  </div>
)

// ─── Reusable Select ───────────────────────────────────────────────────────────
const Select = ({ label, options, required, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    <label style={{
      fontSize: 11, fontWeight: 700, color: "#9CA3AF",
      textTransform: "uppercase", letterSpacing: "0.07em",
    }}>
      {label} {required && <span style={{ color: "#EF4444" }}>*</span>}
    </label>
    <select
      {...props}
      style={{
        border: "1px solid #E5E7EB", borderRadius: 8,
        padding: "10px 12px", fontSize: 13, color: "#111827",
        background: "#fff", outline: "none", cursor: "pointer",
        appearance: "none",
      }}
    >
      {options.map(o => (
        <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
          {typeof o === 'string' ? o : o.label}
        </option>
      ))}
    </select>
  </div>
)

// ─── Availability Slot ─────────────────────────────────────────────────────────
const availabilitySlots = [
  { time: "10:00 AM – 11:30 AM", status: "FREE",  color: "#059669", bg: "#ECFDF5" },
  { time: "02:00 PM – 03:30 PM", status: "BUSY",  color: "#EF4444", bg: "#FEF2F2" },
  { time: "04:00 PM – 05:00 PM", status: "FREE",  color: "#059669", bg: "#ECFDF5" },
]

// ─── Interviewer Panel Data ────────────────────────────────────────────────────
const defaultInterviewers = [
  { id: 1, name: "Mark Chen",   role: "Engineering Lead", avatar: "MC", color: "#7C3AED" },
  { id: 2, name: "Alicia Vogt", role: "Senior Designer",  avatar: "AV", color: "#0EA5E9" },
]

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function ScheduleInterview() {
  const navigate    = useNavigate()
  const [submitted, setSubmitted]   = useState(false)
  const [showError, setShowError]   = useState(false)
  const [interviewers, setInterviewers] = useState(defaultInterviewers)

  // ✅ Form state matches DB schema exactly
  const [form, setForm] = useState({
    // Candidate Info
    candidateName:   "Alex Rivera",
    applicationId:   "APP-1042",

    // DB: interview_round (INTEGER)
    interviewRound:  "2",

    // DB: interview_type VARCHAR(50) — HR, Technical, Managerial
    interviewType:   "Technical",

    // DB: interview_mode VARCHAR(30) — Online, Offline
    interviewMode:   "Video",

    // DB: interview_status VARCHAR(30)
    interviewStatus: "Scheduled",

    // DB: scheduled_date TIMESTAMP
    scheduledDate:   "2024-10-24",
    scheduledTime:   "10:30",

    // DB: meeting_link TEXT
    meetingLink:     "",

    // DB: interviewer_name, interviewer_email
    interviewerName:  "",
    interviewerEmail: "",

    // DB: feedback TEXT
    feedback: "Review the candidate's portfolio section on complex data visualizations. Focus on their experience with React Performance optimization.",

    // DB: score DECIMAL(5,2)
    score: "",

    // DB: recommendation VARCHAR(30) — Proceed, Hold, Reject
    recommendation: "Proceed",
  })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setShowError(false)
  }

  const handleSubmit = () => {
    if (!form.scheduledDate || !form.scheduledTime || !form.candidateName) {
      setShowError(true)
      return
    }
    // ✅ Build DB-ready object
    const dbPayload = {
      application_id:   form.applicationId,
      interview_round:  parseInt(form.interviewRound),
      interview_type:   form.interviewType,
      interview_mode:   form.interviewMode === 'Video' ? 'Online' : form.interviewMode === 'In-Person' ? 'Offline' : 'Online',
      interview_status: form.interviewStatus,
      scheduled_date:   `${form.scheduledDate}T${form.scheduledTime}:00`,
      interviewer_name:  form.interviewerName || interviewers[0]?.name,
      interviewer_email: form.interviewerEmail,
      feedback:         form.feedback,
      score:            form.score ? parseFloat(form.score) : null,
      recommendation:   form.recommendation,
      meeting_link:     form.meetingLink,
    }
    console.log("DB Payload →", dbPayload)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const removeInterviewer = (id) =>
    setInterviewers(prev => prev.filter(i => i.id !== id))

  const modeOptions = [
    { icon: Video,  label: "Video",     value: "Video"     },
    { icon: Phone,  label: "Phone",     value: "Phone"     },
    { icon: MapPin, label: "In-Person", value: "In-Person" },
  ]

  // Format time for preview
  const formatTime = (t) => {
    if (!t) return "—"
    const [h, m] = t.split(":")
    const hr  = parseInt(h)
    const ampm = hr >= 12 ? "PM" : "AM"
    const hr12 = hr % 12 || 12
    return `${hr12}:${m} ${ampm} (60 min)`
  }

  return (
    <div style={{ flex: 1, minHeight: "100vh", background: "#F5F3FF", padding: "0" }}>

      {/* ── Top Bar ── */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #EDE9FE",
        padding: "12px 28px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: 13, color: "#9CA3AF" }}>
          <span
            style={{ cursor: "pointer", color: "#6B7280" }}
            onClick={() => navigate("/candidates")}
          >
            Candidates
          </span>
          <span>›</span>
          <span style={{ color: "#111827", fontWeight: 600 }}>Schedule Interview</span>
        </div>

        {/* Right — Search + Settings */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#F9FAFB", border: "1px solid #E5E7EB",
            borderRadius: 8, padding: "7px 14px",
          }}>
            <span style={{ fontSize: 13, color: "#9CA3AF" }}>🔍</span>
            <input
              placeholder="Search records..."
              style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", background: "transparent", width: 160 }}
            />
          </div>
          <button style={{
            background: "#F9FAFB", border: "1px solid #E5E7EB",
            borderRadius: 8, padding: "7px 10px", cursor: "pointer",
            display: "flex", alignItems: "center",
          }}>
            ⚙️
          </button>
        </div>
      </div>

      <div style={{ padding: "28px 28px" }}>

        {/* Page Title */}
        <div style={{ marginBottom: 24 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: "pointer",
              color: "#7C3AED", fontSize: 13, fontWeight: 600,
              marginBottom: 8, padding: 0,
            }}
          >
            <ChevronLeft size={15} /> Back
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: 0 }}>
            Schedule Interview
          </h1>
          <p style={{ fontSize: 13, color: "#9CA3AF", margin: "4px 0 0" }}>
            Configure interview details and logistics for the candidate pipeline.
          </p>
        </div>

        {/* Success Banner */}
        {submitted && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "#ECFDF5", border: "1px solid #A7F3D0",
            borderRadius: 10, padding: "12px 20px", marginBottom: 20,
          }}>
            <CheckCircle size={18} color="#059669" />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#059669" }}>
              Interview Scheduled Successfully!
            </span>
          </div>
        )}

        {/* Error Banner */}
        {showError && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "#FEF2F2", border: "1px solid #FECACA",
            borderRadius: 10, padding: "12px 20px", marginBottom: 20,
          }}>
            <AlertCircle size={18} color="#EF4444" />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#EF4444" }}>
              Please fill all required fields before scheduling.
            </span>
          </div>
        )}

        {/* ── Main Grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>

          {/* ── LEFT: Main Form ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Section 1 — Candidate Information */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #EDE9FE", padding: 24 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
                Candidate Information
              </h2>
              <p style={{ fontSize: 12, color: "#9CA3AF", margin: "0 0 20px" }}>
                Select the applicant and their target role.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Input
                  label="Candidate Name" required
                  icon={<User size={14} />}
                  name="candidateName"
                  value={form.candidateName}
                  onChange={handleChange}
                  placeholder="e.g. Alex Rivera"
                />
                {/* DB: interview_type */}
                <Select
                  label="Interview Stage" required
                  name="interviewType"
                  value={form.interviewType}
                  onChange={handleChange}
                  options={["HR", "Technical", "Managerial"]}
                />
              </div>
            </div>

            {/* Section 2 — Logistics */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #EDE9FE", padding: 24 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
                Logistics
              </h2>
              <p style={{ fontSize: 12, color: "#9CA3AF", margin: "0 0 20px" }}>
                Set the schedule and meeting medium.
              </p>

              {/* Date + Time */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <Input
                  label="Interview Date" required
                  icon={<Calendar size={14} />}
                  type="date"
                  name="scheduledDate"
                  value={form.scheduledDate}
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    Interview Time <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    border: "1px solid #E5E7EB", borderRadius: 8,
                    padding: "0 12px", background: "#fff",
                  }}>
                    <Clock size={14} color="#9CA3AF" />
                    <input
                      type="time"
                      name="scheduledTime"
                      value={form.scheduledTime}
                      onChange={handleChange}
                      style={{ flex: 1, border: "none", outline: "none", padding: "10px 0", fontSize: 13, color: "#111827", background: "transparent" }}
                    />
                  </div>
                  <span style={{ fontSize: 11, color: "#9CA3AF" }}>Timezone: UTC-5 (EST)</span>
                </div>
              </div>

              {/* DB: interview_mode — Video / Phone / In-Person */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  Interview Mode
                </label>
                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  {modeOptions.map(({ icon: Icon, label, value }) => (
                    <button
                      key={value}
                      onClick={() => setForm(f => ({ ...f, interviewMode: value }))}
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "9px 18px", borderRadius: 8, border: "1px solid",
                        borderColor: form.interviewMode === value ? "#7C3AED" : "#E5E7EB",
                        background: form.interviewMode === value ? "#7C3AED" : "#fff",
                        color: form.interviewMode === value ? "#fff" : "#374151",
                        fontSize: 13, fontWeight: 600, cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      <Icon size={14} /> {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* DB: meeting_link */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  Interview Location / Link {form.interviewMode !== "In-Person" && <span style={{ color: "#EF4444" }}>*</span>}
                </label>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  border: `1px solid ${showError && !form.meetingLink ? "#EF4444" : "#E5E7EB"}`,
                  borderRadius: 8, padding: "0 12px", background: "#fff", marginTop: 6,
                }}>
                  {form.interviewMode === "In-Person"
                    ? <MapPin size={14} color="#9CA3AF" />
                    : <Video size={14} color="#9CA3AF" />}
                  <input
                    name="meetingLink"
                    value={form.meetingLink}
                    onChange={handleChange}
                    placeholder={form.interviewMode === "In-Person"
                      ? "e.g. Office address or Conference Room B"
                      : "e.g. Zoom Link or Conference Room B"}
                    style={{ flex: 1, border: "none", outline: "none", padding: "10px 0", fontSize: 13, color: "#111827", background: "transparent" }}
                  />
                </div>
                {showError && !form.meetingLink && (
                  <span style={{ fontSize: 11, color: "#EF4444", marginTop: 4, display: "block" }}>
                    Required field: Please provide a meeting location.
                  </span>
                )}
              </div>
            </div>

            {/* Section 3 — Preparation Notes */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #EDE9FE", padding: 24 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
                Preparation Notes
              </h2>
              <p style={{ fontSize: 12, color: "#9CA3AF", margin: "0 0 16px" }}>
                Specific instructions for the candidate or panel.
              </p>

              {/* DB: feedback TEXT */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  Internal Notes
                </label>
                <textarea
                  name="feedback"
                  value={form.feedback}
                  onChange={handleChange}
                  placeholder="Add preparation notes, key topics, or feedback guidelines..."
                  style={{
                    width: "100%", border: "1px solid #E5E7EB", borderRadius: 8,
                    padding: 12, fontSize: 13, color: "#111827",
                    resize: "vertical", minHeight: 100, marginTop: 6,
                    outline: "none", boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              {/* DB: score + recommendation */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Input
                  label="Score (0–100)"
                  name="score"
                  type="number"
                  min="0" max="100"
                  value={form.score}
                  onChange={handleChange}
                  placeholder="e.g. 87.5"
                />
                <Select
                  label="Recommendation"
                  name="recommendation"
                  value={form.recommendation}
                  onChange={handleChange}
                  options={["Proceed", "Hold", "Reject"]}
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div style={{
              background: "#fff", borderRadius: 14, border: "1px solid #EDE9FE",
              padding: "14px 24px", display: "flex",
              alignItems: "center", justifyContent: "space-between",
            }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  padding: "9px 22px", background: "#fff", color: "#374151",
                  border: "1px solid #E5E7EB", borderRadius: 8,
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: 12, color: "#9CA3AF" }}>
                  Draft autosaved at 12:45 PM
                </span>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: "9px 24px", background: "#7C3AED", color: "#fff",
                    border: "none", borderRadius: 8, fontSize: 13,
                    fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 7,
                  }}
                >
                  <CheckCircle size={15} /> Schedule Interview
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Preview Panel ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Pipeline Preview Card */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #EDE9FE", padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
                Pipeline Preview
              </div>

              {/* Card */}
              <div style={{ background: "#F9FAFB", borderRadius: 10, border: "1px solid #EDE9FE", padding: 14, marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: "#059669",
                    background: "#ECFDF5", borderRadius: 20, padding: "2px 10px",
                  }}>
                    Scheduled
                  </span>
                  <MoreVertical size={14} color="#9CA3AF" />
                </div>

                <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 2 }}>
                  Interview with {form.candidateName || "Candidate"}
                </div>
                <div style={{ fontSize: 12, color: "#7C3AED", marginBottom: 12, fontWeight: 500 }}>
                  Senior Product Designer • Round {form.interviewRound}
                </div>

                {[
                  { icon: "📅", text: form.scheduledDate || "Date not set" },
                  { icon: "🕐", text: form.scheduledTime ? formatTime(form.scheduledTime) : "Time not set" },
                  { icon: form.interviewMode === "In-Person" ? "📍" : "💻", text: form.meetingLink || (form.interviewMode === "Video" ? "Video Call via Zoom" : form.interviewMode) },
                ].map(({ icon, text }, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6B7280", marginBottom: 6 }}>
                    <span>{icon}</span> {text}
                  </div>
                ))}

                {/* DB: interview_status actions */}
                <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                  <button
                    onClick={() => setForm(f => ({ ...f, interviewStatus: "Selected" }))}
                    style={{
                      flex: 1, padding: "7px 0", fontSize: 12, fontWeight: 600,
                      background: form.interviewStatus === "Selected" ? "#ECFDF5" : "#F9FAFB",
                      color: form.interviewStatus === "Selected" ? "#059669" : "#374151",
                      border: `1px solid ${form.interviewStatus === "Selected" ? "#A7F3D0" : "#E5E7EB"}`,
                      borderRadius: 7, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                    }}
                  >
                    <CheckCircle size={13} /> Select
                  </button>
                  <button
                    onClick={() => setForm(f => ({ ...f, interviewStatus: "Rejected" }))}
                    style={{
                      flex: 1, padding: "7px 0", fontSize: 12, fontWeight: 600,
                      background: form.interviewStatus === "Rejected" ? "#FEF2F2" : "#EF4444",
                      color: "#fff",
                      border: "none", borderRadius: 7, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                    }}
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            </div>

            {/* Availability Hint */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #EDE9FE", padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 14 }}>🕐</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Availability Hint</span>
              </div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 14 }}>
                Based on Sarah's Calendar
              </div>
              {availabilitySlots.map((slot, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: i < availabilitySlots.length - 1 ? "1px solid #F3F4F6" : "none",
                }}>
                  <span style={{ fontSize: 12, color: "#374151" }}>{slot.time}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: slot.color,
                    background: slot.bg, borderRadius: 20, padding: "2px 10px",
                  }}>
                    {slot.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Interviewer Panel */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #EDE9FE", padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
                Interviewer Panel
              </div>

              {interviewers.map((iv, i) => (
                <div key={iv.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  marginBottom: 12,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%",
                      background: iv.color, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff",
                    }}>
                      {iv.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{iv.name}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>{iv.role}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeInterviewer(iv.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: 16, padding: "2px 6px" }}
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Add Interviewer */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                <input
                  name="interviewerName"
                  value={form.interviewerName}
                  onChange={handleChange}
                  placeholder="Interviewer name"
                  style={{
                    border: "1px solid #E5E7EB", borderRadius: 7,
                    padding: "8px 10px", fontSize: 12, color: "#111827",
                    outline: "none",
                  }}
                />
                <input
                  name="interviewerEmail"
                  value={form.interviewerEmail}
                  onChange={handleChange}
                  placeholder="Email"
                  style={{
                    border: "1px solid #E5E7EB", borderRadius: 7,
                    padding: "8px 10px", fontSize: 12, color: "#111827",
                    outline: "none",
                  }}
                />
              </div>

              <button
                onClick={() => {
                  if (!form.interviewerName) return
                  setInterviewers(prev => [...prev, {
                    id: Date.now(),
                    name:  form.interviewerName,
                    role:  form.interviewerEmail || "Interviewer",
                    avatar: form.interviewerName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
                    color: "#7C3AED",
                  }])
                  setForm(f => ({ ...f, interviewerName: "", interviewerEmail: "" }))
                }}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "none", border: "none", cursor: "pointer",
                  color: "#7C3AED", fontSize: 13, fontWeight: 600, padding: 0,
                }}
              >
                <Plus size={14} /> Add Interviewer
              </button>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 28, fontSize: 12, color: "#9CA3AF" }}>
          © 2024 TalentFlow Recruitment Suite. All rights reserved.
          <span style={{ marginLeft: 16, cursor: "pointer" }}>Security Policy</span>
          <span style={{ marginLeft: 16, cursor: "pointer" }}>Support</span>
        </div>
      </div>

      <style>{`* { box-sizing: border-box; } input::placeholder, textarea::placeholder { color: #9CA3AF; }`}</style>
    </div>
  )
}