// src/components/UserDetail.tsx
import React from 'react'
import { User } from '../../models/users.model'


type Props = {
  user: User
  onClose?: () => void
  className?: string
}

const roleVariant: Record<string, string> = {
  admin: 'danger',
  editor: 'warning',
  viewer: 'info',
}

function last4(value?: string) {
  if (!value) return ''
  const digits = value.replace(/\D/g, '')
  return digits.slice(-4)
}

function short(value?: string, max = 22) {
  if (!value) return ''
  return value.length > max ? value.slice(0, max - 1) + '…' : value
}

export default function UserDetail({ user, onClose, className }: Props) {
  const variant = roleVariant[user.role?.toLowerCase?.()] ?? 'secondary'

  return (
    <div className={className}>
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            {user.firstName} {user.lastName}
          </h5>
          {onClose && (
            <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>
              Chiudi
            </button>
          )}
        </div>

        <div className="card-body">
          <div className="row g-4 align-items-start">
            {/* Avatar + badge ruolo */}
            <div className="col-12 col-md-4 text-center">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="rounded-circle img-fluid mb-3"
                style={{ width: 140, height: 140, objectFit: 'cover' }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://via.placeholder.com/140?text=User'
                }}
              />
              <div className="d-flex justify-content-center gap-2 flex-wrap">
                <span className={`badge text-bg-${variant} text-uppercase`}>{user.role}</span>
                {user.status && <span className="badge text-bg-secondary">{user.status}</span>}
                {user.bloodGroup && (
                  <span className="badge text-bg-light border">{user.bloodGroup}</span>
                )}
              </div>
            </div>

            {/* Info principali */}
            <div className="col-12 col-md-8">
              <div className="row g-3">
                <div className="col-12">
                  <h6 className="text-uppercase text-muted mb-2">Contatti</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">
                      <strong>Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a>
                    </li>
                    <li className="list-group-item px-0">
                      <strong>Telefono:</strong> <a href={`tel:${user.phone}`}>{user.phone}</a>
                    </li>
                    <li className="list-group-item px-0">
                      <strong>Username:</strong> {user.username}
                    </li>
                  </ul>
                </div>

                <div className="col-12 col-lg-6">
                  <h6 className="text-uppercase text-muted mb-2">Profilo</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">
                      <strong>Genere:</strong> {user.gender}
                    </li>
                    <li className="list-group-item px-0">
                      <strong>Età:</strong> {user.age}
                    </li>
                    <li className="list-group-item px-0">
                      <strong>Altezza/Peso:</strong> {user.height} cm / {user.weight} kg
                    </li>
                    <li className="list-group-item px-0">
                      <strong>Occhi/Capelli:</strong> {user.eyeColor} / {user.hair?.color}{' '}
                      {user.hair?.type && `(${user.hair.type})`}
                    </li>
                  </ul>
                </div>

                <div className="col-12 col-lg-6">
                  <h6 className="text-uppercase text-muted mb-2">Lavoro</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">
                      <strong>Azienda:</strong> {user.company?.name}
                    </li>
                    <li className="list-group-item px-0">
                      <strong>Reparto:</strong> {user.company?.department}
                    </li>
                    <li className="list-group-item px-0">
                      <strong>Titolo:</strong> {user.company?.title}
                    </li>
                  </ul>
                </div>

                <div className="col-12">
                  <h6 className="text-uppercase text-muted mb-2">Indirizzo</h6>
                  <div className="border rounded p-3">
                    <div>
                      {user.address?.address}, {user.address?.city} ({user.address?.stateCode}) —{' '}
                      {user.address?.state}
                    </div>
                    <div>
                      {user.address?.postalCode}, {user.address?.country}
                    </div>
                    {user.address?.coordinates && (
                      <small className="text-muted">
                        lat: {user.address.coordinates.lat} · lng:{' '}
                        {user.address.coordinates.lng}
                      </small>
                    )}
                  </div>
                </div>

                {/* Info extra, con mascheramento leggero */}
                <div className="col-12">
                  <h6 className="text-uppercase text-muted mb-2">Extra</h6>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <div className="border rounded p-3 h-100">
                        <strong>Università:</strong> {short(user.university)}
                        <br />
                        <strong>IP:</strong> {user.ip}
                        <br />
                        <strong>MAC:</strong> {user.macAddress}
                        <br />
                        <strong>User Agent:</strong> <small className="text-muted">{short(user.userAgent, 48)}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="border rounded p-3 h-100">
                        <strong>Carta:</strong>{' '}
                        {user.bank?.cardType} •••• {last4(user.bank?.cardNumber)}
                        <br />
                        <strong>Scadenza:</strong> {user.bank?.cardExpire}
                        <br />
                        <strong>Valuta:</strong> {user.bank?.currency}
                        <br />
                        <strong>Crypto:</strong> {user.crypto?.coin} ·{' '}
                        <small className="text-muted">{short(user.crypto?.network)}</small>
                        <br />
                        <strong>Wallet:</strong> <code>{short(user.crypto?.wallet, 26)}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
