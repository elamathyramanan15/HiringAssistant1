import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Calendar, MoreVertical, Plus,
  ChevronLeft, ChevronRight, Edit2, Users,
  Trash2, Download, ChevronDown, X
} from 'lucide-react'

const defaultJobs = [
  {
    id: 101, title: 'Senior Frontend Engineer', team: 'Product Team',
    location: 'Remote', type: 'Full-time',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    applied: 42, status: 'Open',
    createdDate: 'May 12, 2024', endDate: 'Nov 30, 2024',
  },
  {
    id: 102, title: 'AI Research Scientist', team: 'AI/ML Lab',
    location: 'San Francisco, CA', type: 'Full-time',
    skills: ['Python', 'PyTorch', 'NLP', 'TensorFlow'],
    applied: 18, status: 'Open',
    createdDate: 'May 15, 2024', endDate: 'Dec 10, 2024',
  },
  {
    id: 103, title: 'UX/UI Designer', team: 'Design System',
    location: 'New York, NY', type: 'Contract',
    skills: ['Figma', 'Prototyping', 'User Research', 'Adobe XD'],
    applied: 25, status: 'Draft',
    createdDate: 'May 18, 2024', endDate: 'Dec 20, 2024',
  },
  {
    id: 104, title: 'Full Stack Developer', team: 'Internal Tools',
    location: 'Remote', type: 'Full-time',
    skills: ['Node.js', 'PostgreSQL', 'React', 'Docker'],
    applied: 56, status: 'Closed',
    createdDate: 'Apr 28, 2024', endDate: 'Oct 31, 2024',
  },
  {
    id: 105, title: 'DevOps Engineer', team: 'Infrastructure',
    location: 'Austin, TX', type: 'Full-time',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    applied: 12, status: 'Open',
    createdDate: 'May 20, 2024', endDate: 'Dec 15, 2024',
  },
]

const statusConfig = {
  Open:   { bg: '#ECFDF5', color: '#059669', dot: '#059669' },
  Draft:  { bg: '#FEF3C7', color: '#D97706', dot: '#D97706' },
  Closed: { bg: '#F3F4F6', color: '#6B7280', dot: '#6B7280' },
}

export default function JobDescriptions() {
  const navigate = useNavigate()
  const [jobs, setJobs]               = useState(defaultJobs)
  const [search, setSearch]           = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [openMenu, setOpenMenu]       = useState(null)
  const [openStatusId, setOpenStatusId] = useState(null)
  const menuRef = useRef(null)

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('jobs') || '[]')
    if (saved.length > 0) {
      const mapped = saved.map(j => ({
        id:          j.id,
        title:       j.title,
        team:        j.dept,
        location:    'Remote',
        type:        'Full-time',
        skills:      j.skills || [],
        applied:     j.applied || 0,
        status:      j.status || 'Open',
        createdDate: j.date || 'Recently',
        endDate:     j.endDate || '—',
      }))
      setJobs([...mapped, ...defaultJobs])
    }
  }, [])

  // Close menus on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null)
        setOpenStatusId(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = jobs.filter(j => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.skills.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      j.team.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || j.status === statusFilter
    return matchSearch && matchStatus
  })

  const handleStatusChange = (jobId, newStatus) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j))
    setOpenStatusId(null)
  }

  const handleDelete = (jobId) => {
    if (window.confirm('Delete this job? This cannot be undone.')) {
      setJobs(prev => prev.filter(j => j.id !== jobId))
      // also remove from localStorage
      const saved = JSON.parse(localStorage.getItem('jobs') || '[]')
      localStorage.setItem('jobs', JSON.stringify(saved.filter(j => j.id !== jobId)))
    }
    setOpenMenu(null)
  }

  const handleDownload = (job) => {
    const content = `JOB DESCRIPTION\n===============\nTitle: ${job.title}\nTeam: ${job.team}\nLocation: ${job.location}\nType: ${job.type}\nStatus: ${job.status}\nCreated: ${job.createdDate}\nEnd Date: ${job.endDate}\nRequired Skills: ${job.skills.join(', ')}\nCandidates: ${job.applied}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `${job.title.replace(/\s+/g, '_')}.txt`
    a.click()
    URL.revokeObjectURL(url)
    setOpenMenu(null)
  }

  return (
    <div style={{ flex: 1, background: '#F3F4F6', minHeight: '100vh', padding: '32px' }}>

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
            Job Descriptions
          </h1>
          <p style={{ fontSize: '14px', color: '#6B7280' }}>
            Create, manage, and optimize your job postings with AI.
          </p>
        </div>
        <button
          onClick={() => navigate('/create-job')}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: '#7C3AED', color: '#fff', border: 'none',
            borderRadius: '8px', padding: '10px 18px',
            fontSize: '14px', fontWeight: 500, cursor: 'pointer',
          }}
        >
          <Plus size={16} />
          Create Job Description
        </button>
      </div>

      {/* Filters Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#fff', border: '1px solid #E5E7EB',
          borderRadius: '8px', padding: '9px 14px', width: '300px',
        }}>
          <Search size={15} color="#9CA3AF" />
          <input
            placeholder="Search job title, skills, or team..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              border: 'none', outline: 'none', fontSize: '14px',
              color: '#374151', width: '100%', background: 'transparent',
            }}
          />
          {search && (
            <X size={14} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => setSearch('')} />
          )}
        </div>

        {/* Status Filter Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {['All', 'Open', 'Draft', 'Closed'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: '8px 16px', borderRadius: '8px', fontSize: '13px',
                fontWeight: 500, cursor: 'pointer', border: '1px solid',
                borderColor: statusFilter === s ? '#7C3AED' : '#E5E7EB',
                background:  statusFilter === s ? '#F3F0FF' : '#fff',
                color:       statusFilter === s ? '#7C3AED' : '#6B7280',
                transition: 'all 0.15s',
              }}
            >
              {s === 'All' ? 'Status: All' : s}
            </button>
          ))}
        </div>

        {/* Date Range */}
        <button style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '8px 16px', borderRadius: '8px', fontSize: '13px',
          fontWeight: 500, cursor: 'pointer', border: '1px solid #E5E7EB',
          background: '#fff', color: '#6B7280',
        }}>
          <Calendar size={14} />
          Date Range
        </button>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'visible' }} ref={menuRef}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
              {['Job Title', 'Required Skills', 'Candidates', 'Status', 'Created Date', 'End Date', 'Actions'].map(col => (
                <th key={col} style={{
                  fontSize: '11px', color: '#9CA3AF', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  padding: '14px 14px', textAlign: 'left',
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: '#9CA3AF', fontSize: '14px' }}>
                  No jobs found. Try adjusting your search or filters.
                </td>
              </tr>
            ) : filtered.map((job, i) => (
              <tr
                key={job.id}
                style={{
                  borderBottom: i < filtered.length - 1 ? '1px solid #F9FAFB' : 'none',
                  position: 'relative',
                }}
              >
                {/* Job Title */}
                <td style={{ padding: '16px 14px', verticalAlign: 'middle', minWidth: '220px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                    {job.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>{job.team}</span>
                    <span style={{ color: '#D1D5DB' }}>·</span>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>{job.location}</span>
                    <span style={{
                      fontSize: '11px', color: '#374151',
                      background: '#F3F4F6', border: '1px solid #E5E7EB',
                      borderRadius: '4px', padding: '1px 7px',
                    }}>{job.type}</span>
                  </div>
                </td>

                {/* Skills */}
                <td style={{ padding: '16px 14px', verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {job.skills.slice(0, 3).map(skill => (
                      <span key={skill} style={{
                        background: '#F3F0FF', color: '#7C3AED',
                        border: '1px solid #DDD6FE',
                        borderRadius: '5px', padding: '2px 8px',
                        fontSize: '12px', fontWeight: 500,
                      }}>{skill}</span>
                    ))}
                    {job.skills.length > 3 && (
                      <span style={{
                        background: '#F9FAFB', color: '#9CA3AF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '5px', padding: '2px 8px', fontSize: '12px',
                      }}>+{job.skills.length - 3} more</span>
                    )}
                  </div>
                </td>

                {/* Candidates */}
                <td style={{ padding: '16px 14px', verticalAlign: 'middle' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#F3F4F6', fontSize: '13px', fontWeight: 600, color: '#374151',
                  }}>
                    {job.applied}
                  </div>
                </td>

                {/* Status — clickable dropdown */}
                <td style={{ padding: '16px 14px', verticalAlign: 'middle', position: 'relative' }}>
                  <div
                    onClick={() => setOpenStatusId(openStatusId === job.id ? null : job.id)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '5px 12px', borderRadius: '20px', fontSize: '12px',
                      fontWeight: 500, cursor: 'pointer',
                      background: statusConfig[job.status].bg,
                      color: statusConfig[job.status].color,
                      border: `1px solid ${statusConfig[job.status].bg}`,
                      userSelect: 'none',
                    }}
                  >
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: statusConfig[job.status].dot, flexShrink: 0,
                    }} />
                    {job.status}
                    <ChevronDown size={11} />
                  </div>

                  {/* Status Dropdown */}
                  {openStatusId === job.id && (
                    <div style={{
                      position: 'absolute', top: '48px', left: '14px',
                      background: '#fff', border: '1px solid #E5E7EB',
                      borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                      zIndex: 100, minWidth: '130px', overflow: 'hidden',
                    }}>
                      {['Open', 'Draft', 'Closed'].map(s => (
                        <div
                          key={s}
                          onClick={() => handleStatusChange(job.id, s)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '9px 14px', fontSize: '13px', cursor: 'pointer',
                            color: statusConfig[s].color,
                            background: job.status === s ? statusConfig[s].bg : '#fff',
                            fontWeight: job.status === s ? 600 : 400,
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = statusConfig[s].bg}
                          onMouseLeave={e => e.currentTarget.style.background = job.status === s ? statusConfig[s].bg : '#fff'}
                        >
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: statusConfig[s].dot }} />
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </td>

                {/* Created Date */}
                <td style={{ padding: '16px 14px', verticalAlign: 'middle', fontSize: '13px', color: '#6B7280', whiteSpace: 'nowrap' }}>
                  {job.createdDate}
                </td>

                {/* End Date */}
                <td style={{ padding: '16px 14px', verticalAlign: 'middle', fontSize: '13px', whiteSpace: 'nowrap',
                  color: job.status === 'Closed' ? '#EF4444' : '#6B7280',
                }}>
                  {job.endDate}
                </td>

                {/* Actions */}
                <td style={{ padding: '16px 14px', verticalAlign: 'middle', position: 'relative' }}>
                  <button
                    onClick={() => setOpenMenu(openMenu === job.id ? null : job.id)}
                    style={{
                      background: openMenu === job.id ? '#F3F0FF' : 'none',
                      border: '1px solid',
                      borderColor: openMenu === job.id ? '#DDD6FE' : '#E5E7EB',
                      cursor: 'pointer', color: openMenu === job.id ? '#7C3AED' : '#9CA3AF',
                      padding: '5px 8px', borderRadius: '6px',
                      display: 'flex', alignItems: 'center',
                    }}
                  >
                    <MoreVertical size={16} />
                  </button>

                  {/* Actions Dropdown */}
                  {openMenu === job.id && (
                    <div style={{
                      position: 'absolute', top: '44px', right: '14px',
                      background: '#fff', border: '1px solid #E5E7EB',
                      borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      zIndex: 100, minWidth: '180px', overflow: 'hidden',
                    }}>
                      {/* Edit */}
                      <div
                        onClick={() => { navigate('/create-job'); setOpenMenu(null) }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '11px 16px', fontSize: '13px', cursor: 'pointer',
                          color: '#374151',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                      >
                        <Edit2 size={14} color="#7C3AED" />
                        Edit Job
                      </div>

                      {/* View Candidates */}
                      <div
                        onClick={() => { navigate('/candidates'); setOpenMenu(null) }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '11px 16px', fontSize: '13px', cursor: 'pointer',
                          color: '#374151',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                      >
                        <Users size={14} color="#0EA5E9" />
                        View Candidates
                      </div>

                      <div style={{ height: '1px', background: '#F3F4F6', margin: '2px 0' }} />

                      {/* Download */}
                      <div
                        onClick={() => handleDownload(job)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '11px 16px', fontSize: '13px', cursor: 'pointer',
                          color: '#374151',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                      >
                        <Download size={14} color="#10B981" />
                        Download JD
                      </div>

                      <div style={{ height: '1px', background: '#F3F4F6', margin: '2px 0' }} />

                      {/* Delete */}
                      <div
                        onClick={() => handleDelete(job.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '11px 16px', fontSize: '13px', cursor: 'pointer',
                          color: '#EF4444',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                      >
                        <Trash2 size={14} color="#EF4444" />
                        Delete Job
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px', borderTop: '1px solid #F3F4F6',
        }}>
          <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
            Showing {filtered.length} of {jobs.length} jobs
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              padding: '6px 14px', borderRadius: '6px', fontSize: '13px',
              border: '1px solid #E5E7EB', background: '#fff',
              color: '#6B7280', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <ChevronLeft size={14} /> Prev
            </button>
            <button style={{
              padding: '6px 14px', borderRadius: '6px', fontSize: '13px',
              border: '1px solid #7C3AED', background: '#7C3AED',
              color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}