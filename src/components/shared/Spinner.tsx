import React from 'react'
import { useUsers } from '../../store/users.store'


export default function SpinnerOverlay() {
  const loading = useUsers(s => s.isLoading)
  if (!loading) return null

  return (
    <div
      aria-live="polite"
      aria-busy="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1050,
        backdropFilter: 'blur(1px)',
      }}
    >
      <div className="d-flex flex-column align-items-center gap-3">
        <div className="spinner-border text-primary" role="status" aria-label="Loading"></div>
        <span className="text-body-secondary">Loading...</span>

      </div>
    </div>
  )
}
