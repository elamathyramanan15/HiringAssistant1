import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Plus, X, Bold, Italic, List, AlignLeft, Link } from 'lucide-react'

const inputStyle = {
  width: '100%', padding: '10px 14px', fontSize: '14px',
  border: '1px solid #E5E7EB', borderRadius: '8px',
  outline: 'none', color: '#111827', background: '#fff',
  boxSizing: 'border-box',
}

const selectStyle = {
  width: '100%', padding: '10px 14px', fontSize: '14px',
  border: '1px solid #E5E7EB', borderRadius: '8px',
  outline: 'none', color: '#111827', background: '#fff',
  appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
  boxSizing: 'border-box',
}

const sectionLabel = {
  fontSize: '11px', fontWeight: 700, color: '#9CA3AF',
  textTransform: 'uppercase', letterSpacing: '0.08em',
  marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px',
}

const fieldLabel = {
  fontSize: '14px', fontWeight: 500, color: '#111827', marginBottom: '6px',
  display: 'flex', alignItems: 'center', gap: '4px',
}

export default function CreateJobDescription() {
  const navigate = useNavigate()

  const [jobTitle, setJobTitle]       = useState('')
  const [department, setDepartment]   = useState('Engineering')
  const [expLevel, setExpLevel]       = useState('Senior Level (5-8 years)')
  const [education, setEducation]     = useState("Bachelor's Degree")
  const [endDate, setEndDate]         = useState('')
  const [skills, setSkills]           = useState(['React', 'TypeScript', 'Node.js', 'Tailwind CSS'])
  const [skillInput, setSkillInput]   = useState('')
  const [description, setDescription] = useState(
`## About the Role
We are looking for a Senior Frontend Engineer who is passionate about building performant, accessible, and beautiful user interfaces. You will join our core product team and help shape the future of our recruitment platform.

## What You'll Do
- Architect and implement complex UI components using React and TypeScript.
- Collaborate closely with Product Designers to turn Figma designs into pixel-perfect code.
- Mentor junior developers and lead code reviews to maintain high quality standards.
- Optimize application performance for a seamless user experience across devices.

## What We're Looking For
- 5+ years of professional experience in frontend development.
- Mastery of modern CSS frameworks, particularly Tailwind CSS.
- Strong understanding of React hooks, state management, and the DOM.
- A user-centric mindset and an eye for great design.`
  )

  const maxChars  = 1240
  const remaining = maxChars - description.length

  const addSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault()
      if (!skills.includes(skillInput.trim()))
        setSkills([...skills, skillInput.trim()])
      setSkillInput('')
    }
  }

  const removeSkill = (s) => setSkills(skills.filter(sk => sk !== s))

  // ✅ Save job and go back to dashboard
  const handleCreate = () => {
    if (!jobTitle.trim()) {
      alert('Please enter a Job Title.')
      return
    }
    if (!endDate) {
      alert('Please select an Application End Date.')
      return
    }

    const today = new Date()
    const createdDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    const newJob = {
      id:          Date.now(),
      title:       jobTitle,
      dept:        department,
      date:        createdDate,
      endDate:     new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      applied:     0,
      status:      'Open',
      skills:      skills,
      expLevel:    expLevel,
      education:   education,
      description: description,
    }

    const existing = JSON.parse(localStorage.getItem('jobs') || '[]')
    localStorage.setItem('jobs', JSON.stringify([newJob, ...existing]))
    navigate('/jobs')
  }

  return (
    <div style={{ flex: 1, background: '#F3F4F6', minHeight: '100vh', padding: '32px' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#9CA3AF', marginBottom: '12px' }}>
        <span style={{ cursor: 'pointer', color: '#6B7280' }} onClick={() => navigate('/')}>Recruitment</span>
        <ChevronRight size={14} />
        <span style={{ cursor: 'pointer', color: '#6B7280' }}>Job Descriptions</span>
        <ChevronRight size={14} />
        <span style={{ color: '#111827', fontWeight: 500 }}>Create New</span>
      </div>

      {/* Page Title */}
      <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>
        Create Job Description
      </h1>
      <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '28px', maxWidth: '620px' }}>
        Define the requirements, responsibilities, and benefits for your new position.
        This information will be used to attract high-quality candidates.
      </p>

      {/* Main Card */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>

        {/* Position Details Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '18px 28px', borderBottom: '1px solid #F3F4F6',
        }}>
          <div style={{
            width: '24px', height: '24px', borderRadius: '50%',
            border: '2px solid #7C3AED', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Plus size={14} color="#7C3AED" />
          </div>
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>Position Details</span>
        </div>

        <div style={{ padding: '28px' }}>

          {/* GENERAL INFORMATION */}
          <div style={{ marginBottom: '32px' }}>
            <div style={sectionLabel}>
              General Information
              <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
            </div>

            {/* Job Title */}
            <div style={{ marginBottom: '20px' }}>
              <div style={fieldLabel}>
                Job Title <span style={{ color: '#EF4444' }}>*</span>
              </div>
              <input
                style={inputStyle}
                placeholder="e.g. Senior Frontend Engineer"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
              />
              <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '5px' }}>
                Try to be specific with the level and core technology (e.g., "Lead React Developer").
              </div>
            </div>

            {/* Department */}
            <div style={{ marginBottom: '20px' }}>
              <div style={fieldLabel}>
                Department <span style={{ color: '#EF4444' }}>*</span>
              </div>
              <div style={{ position: 'relative', maxWidth: '340px' }}>
                <select style={selectStyle} value={department} onChange={e => setDepartment(e.target.value)}>
                  <option>Engineering</option>
                  <option>Product</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                  <option>Operations</option>
                </select>
                <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>▾</span>
              </div>
            </div>

            {/* Application End Date */}
            <div>
              <div style={fieldLabel}>
                Application End Date <span style={{ color: '#EF4444' }}>*</span>
              </div>
              <input
                type="date"
                style={{ ...inputStyle, maxWidth: '340px', cursor: 'pointer' }}
                value={endDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setEndDate(e.target.value)}
              />
              <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '5px' }}>
                Last date candidates can apply for this position.
              </div>
            </div>
          </div>

          {/* TECHNICAL REQUIREMENTS */}
          <div style={{ marginBottom: '32px' }}>
            <div style={sectionLabel}>
              Technical Requirements
              <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
            </div>

            {/* Required Skills */}
            <div style={{ marginBottom: '20px' }}>
              <div style={fieldLabel}>
                Required Skills <span style={{ color: '#EF4444' }}>*</span>
              </div>
              <div style={{
                border: '1px solid #E5E7EB', borderRadius: '8px',
                padding: '10px 12px', background: '#fff',
                display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center',
                minHeight: '48px',
              }}>
                {skills.map(skill => (
                  <span key={skill} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    background: '#F3F0FF', border: '1px solid #DDD6FE',
                    borderRadius: '6px', padding: '3px 10px',
                    fontSize: '13px', color: '#7C3AED',
                  }}>
                    {skill}
                    <X size={12} style={{ cursor: 'pointer', color: '#9CA3AF' }} onClick={() => removeSkill(skill)} />
                  </span>
                ))}
                <input
                  placeholder="Add skill..."
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={addSkill}
                  style={{
                    border: 'none', outline: 'none', fontSize: '13px',
                    color: '#374151', minWidth: '100px', background: 'transparent',
                  }}
                />
              </div>
              <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ⓘ Press Enter after each skill to add it to the list.
              </div>
            </div>

            {/* Experience + Education */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <div style={fieldLabel}>
                  Experience Level <span style={{ color: '#EF4444' }}>*</span>
                </div>
                <div style={{ position: 'relative' }}>
                  <select style={selectStyle} value={expLevel} onChange={e => setExpLevel(e.target.value)}>
                    <option>Entry Level (0-2 years)</option>
                    <option>Mid Level (2-5 years)</option>
                    <option>Senior Level (5-8 years)</option>
                    <option>Lead (8+ years)</option>
                  </select>
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>▾</span>
                </div>
              </div>
              <div>
                <div style={fieldLabel}>Education Requirement</div>
                <div style={{ position: 'relative' }}>
                  <select style={selectStyle} value={education} onChange={e => setEducation(e.target.value)}>
                    <option>High School Diploma</option>
                    <option>Associate's Degree</option>
                    <option>Bachelor's Degree</option>
                    <option>Master's Degree</option>
                    <option>PhD</option>
                  </select>
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>▾</span>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT EDITOR */}
          <div>
            <div style={sectionLabel}>
              Content Editor
              <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
            </div>

            <div style={fieldLabel}>
              Detailed Job Description <span style={{ color: '#EF4444' }}>*</span>
            </div>

            {/* Toolbar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '8px 12px', border: '1px solid #E5E7EB',
              borderBottom: 'none', borderRadius: '8px 8px 0 0',
              background: '#F9FAFB',
            }}>
              {[{ icon: Bold }, { icon: Italic }, { icon: List }, { icon: AlignLeft }].map(({ icon: Icon }, i) => (
                <button key={i} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '5px 8px', borderRadius: '4px', color: '#6B7280',
                  display: 'flex', alignItems: 'center',
                }}>
                  <Icon size={15} />
                </button>
              ))}
              <div style={{ width: '1px', height: '18px', background: '#E5E7EB', margin: '0 4px' }} />
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px 8px', borderRadius: '4px', color: '#6B7280', display: 'flex', alignItems: 'center' }}>
                <Link size={15} />
              </button>
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: '12px', color: remaining < 100 ? '#EF4444' : '#9CA3AF' }}>
                {remaining.toLocaleString()} characters remaining
              </span>
            </div>

            {/* Text Area */}
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{
                width: '100%', minHeight: '280px', padding: '16px',
                border: '1px solid #E5E7EB', borderRadius: '0 0 8px 8px',
                fontSize: '14px', color: '#374151', lineHeight: '1.7',
                outline: 'none', resize: 'vertical', fontFamily: 'inherit',
                boxSizing: 'border-box', background: '#fff',
              }}
            />
          </div>

          {/* Footer Actions */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: '24px', padding: '16px 20px',
            background: '#F9FAFB', borderRadius: '8px',
            border: '1px solid #E5E7EB',
          }}>
            <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
              Draft autosaved at 10:45 AM
            </span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  padding: '10px 24px', fontSize: '14px', fontWeight: 500,
                  background: '#fff', border: '1px solid #E5E7EB',
                  borderRadius: '8px', cursor: 'pointer', color: '#374151',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                style={{
                  padding: '10px 24px', fontSize: '14px', fontWeight: 500,
                  background: '#7C3AED', border: 'none',
                  borderRadius: '8px', cursor: 'pointer', color: '#fff',
                }}
              >
                Create Job Description
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#6B7280' }}>
            Need help writing a job description? Check out our{' '}
            <span style={{ color: '#7C3AED', fontWeight: 500, cursor: 'pointer' }}>Best Practices Guide</span>
            {' '}or use our{' '}
            <span style={{ color: '#7C3AED', fontWeight: 500, cursor: 'pointer' }}>AI Templates.</span>
          </div>

        </div>
      </div>
    </div>
  )
}