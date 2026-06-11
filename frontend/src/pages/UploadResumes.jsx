import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Upload, X, CheckCircle, AlertCircle,
  RefreshCw, Clock, Briefcase, Users, Zap
} from 'lucide-react'

const jobOptions = [
  'Senior Frontend Engineer (React)',
  'AI Research Scientist',
  'UX/UI Designer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Financial Analyst',
]

const initialFiles = [
  { id: 1, name: 'Resume_Sarah_Johnson_UX.pdf',   size: '1.2 MB', progress: 100, status: 'completed' },
  { id: 2, name: 'Michael_Chen_Fullstack_Dev.pdf', size: '2.4 MB', progress: 45,  status: 'uploading' },
  { id: 3, name: 'Portfolio_Design_2023.pdf',      size: '8.1 MB', progress: 15,  status: 'failed'    },
]

export default function UploadResumes() {
  const navigate                      = useNavigate()
  const [selectedJob, setSelectedJob] = useState('Senior Frontend Engineer (React)')
  const [files, setFiles]             = useState(initialFiles)
  const [dragging, setDragging]       = useState(false)
  const [showSuccess, setShowSuccess] = useState(true)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    // Backend integration pending
  }

  const removeFile  = (id) => setFiles(prev => prev.filter(f => f.id !== id))
  const clearAll    = () => setFiles([])
  const retryFile   = (id) => setFiles(prev => prev.map(f => f.id === id ? { ...f, progress: 0, status: 'uploading' } : f))

  const statusColor = { completed: '#059669', uploading: '#7C3AED', failed: '#EF4444' }
  const barColor    = { completed: '#7C3AED', uploading: '#7C3AED', failed: '#EF4444' }

  return (
    <div style={{ flex: 1, background: '#F3F4F6', minHeight: '100vh', padding: '40px 48px' }}>

      {/* Success Banner */}
      {showSuccess && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px',
          padding: '12px 20px', marginBottom: '28px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle size={18} color="#059669" />
            <div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                Resumes uploaded successfully.
              </span>
              <span style={{ fontSize: '13px', color: '#6B7280', marginLeft: '8px' }}>
                Batch #8291 has been added to the screening queue.
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            style={{ background: 'none', border: 'none', fontSize: '13px', color: '#6B7280', cursor: 'pointer', fontWeight: 500 }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Page Title */}
      <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
        Upload Resumes
      </h1>
      <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '28px', maxWidth: '500px' }}>
        Efficiently ingest candidate profiles. Select a target job description and drag
        multiple PDF resumes to begin the AI-powered screening process.
      </p>

      {/* Main Card */}
      <div style={{
        background: '#fff', borderRadius: '12px',
        border: '1px solid #E5E7EB', padding: '28px',
        marginBottom: '24px',
      }}>

        {/* Upload Source Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Upload size={16} color="#7C3AED" />
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>Upload Source</span>
        </div>
        <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>
          Assign these candidates to a specific requisition.
        </p>

        {/* Select Job Description */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Briefcase size={14} color="#6B7280" />
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>Select Job Description</span>
          </div>
          <div style={{ position: 'relative' }}>
            <select
              value={selectedJob}
              onChange={e => setSelectedJob(e.target.value)}
              style={{
                width: '100%', padding: '10px 36px 10px 14px',
                border: '1px solid #E5E7EB', borderRadius: '8px',
                fontSize: '14px', color: '#111827', background: '#fff',
                appearance: 'none', WebkitAppearance: 'none',
                outline: 'none', cursor: 'pointer',
              }}
            >
              {jobOptions.map(j => <option key={j}>{j}</option>)}
            </select>
            <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>▾</span>
          </div>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragging ? '#7C3AED' : '#D1D5DB'}`,
            borderRadius: '10px', padding: '40px 20px',
            textAlign: 'center', cursor: 'default',
            background: dragging ? '#F3F0FF' : '#FAFAFA',
            transition: 'all 0.2s', marginBottom: '20px',
          }}
        >
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: '#F3F0FF', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 14px',
          }}>
            <Upload size={22} color="#7C3AED" />
          </div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#111827', marginBottom: '6px' }}>
            Drag files here
          </div>
          <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>
            Support for multiple <span style={{ color: '#7C3AED', fontWeight: 500 }}>PDF</span> files up to 10MB each.
          </div>
          <span style={{ fontSize: '13px', color: '#7C3AED', fontWeight: 500 }}>Browse files</span>
        </div>

        {/* File Queue */}
        {files.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                File Queue ({files.length})
              </span>
              <button
                onClick={clearAll}
                style={{ background: 'none', border: 'none', fontSize: '13px', color: '#7C3AED', cursor: 'pointer', fontWeight: 500 }}
              >
                Clear all
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {files.map(file => (
                <div key={file.id} style={{
                  border: '1px solid #F3F4F6', borderRadius: '8px',
                  padding: '14px 16px', background: '#FAFAFA',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '6px',
                        background: '#F3F0FF', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Upload size={14} color="#7C3AED" />
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>{file.name}</div>
                        <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{file.size}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* Status Badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {file.status === 'completed' && <CheckCircle size={14} color="#059669" />}
                        {file.status === 'uploading' && <RefreshCw size={14} color="#7C3AED" style={{ animation: 'spin 1s linear infinite' }} />}
                        {file.status === 'failed'    && <AlertCircle size={14} color="#EF4444" />}
                        <span style={{ fontSize: '12px', fontWeight: 500, color: statusColor[file.status] }}>
                          {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                        </span>
                      </div>

                      {/* Retry for failed */}
                      {file.status === 'failed' && (
                        <button onClick={() => retryFile(file.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                          <RefreshCw size={14} />
                        </button>
                      )}

                      {/* Remove */}
                      <button onClick={() => removeFile(file.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                        <X size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{file.progress}% Uploaded</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>
                        {file.status === 'completed' ? 'Finished' : file.status === 'failed' ? 'Remaining: 2s' : 'Remaining: 2s'}
                      </span>
                    </div>
                    <div style={{ height: '4px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${file.progress}%`,
                        background: barColor[file.status],
                        borderRadius: '4px', transition: 'width 0.4s ease',
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
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
          onClick={() => navigate('/screening')}
          style={{
            padding: '10px 28px', fontSize: '14px', fontWeight: 500,
            background: '#7C3AED', border: 'none',
            borderRadius: '8px', cursor: 'pointer', color: '#fff',
          }}>
            Upload Resumes
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          {
            icon: Zap, iconBg: '#F3F0FF', iconColor: '#7C3AED',
            title: 'Automated Extraction',
            desc: 'Our AI automatically extracts skills, experience, and contact info from your PDF documents.',
          },
          {
            icon: Briefcase, iconBg: '#ECFDF5', iconColor: '#059669',
            title: 'Smart Role Matching',
            desc: 'Candidates are scored against the selected job description for relevance and quality.',
          },
          {
            icon: Users, iconBg: '#EFF6FF', iconColor: '#0EA5E9',
            title: 'Batch Processing',
            desc: "Upload up to 100 resumes at once. We'll handle the heavy lifting in parallel.",
          },
        ].map(({ icon: Icon, iconBg, iconColor, title, desc }) => (
          <div key={title} style={{
            background: '#fff', borderRadius: '12px',
            border: '1px solid #E5E7EB', padding: '20px',
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '8px',
              background: iconBg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', marginBottom: '12px',
            }}>
              <Icon size={18} color={iconColor} />
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827', marginBottom: '6px' }}>{title}</div>
            <div style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.5' }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
          © 2024 TalentStream AI. All rights reserved. Secure encrypted uploads.
        </span>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['Privacy Policy', 'Terms of Service', 'Contact Support'].map(link => (
            <span key={link} style={{ fontSize: '12px', color: '#6B7280', cursor: 'pointer' }}>{link}</span>
          ))}
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}