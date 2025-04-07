'use client'

import { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

export default function RegistrationPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    userName: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const signUp = () => {
    // TODO: отправить запрос на сервер
    console.log('Signing up with:', form)
  }

  return (
    <div className="registration-page p-4 bg-light rounded" style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2 className="registration-title mb-4" style={{ color: 'black' }}>
        Registration
      </h2>

      <InputGroup size="sm" className="mb-3">
        <Form.Control
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup size="sm" className="mb-3">
        <Form.Control
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <Button
          variant={showPassword ? 'success' : 'outline-success'}
          onClick={() => setShowPassword(!showPassword)}
        >
          👁
        </Button>
      </InputGroup>

      <InputGroup size="sm" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Username"
          name="userName"
          value={form.userName}
          onChange={handleChange}
        />
      </InputGroup>

      <Button variant="primary" className="w-100 mb-2" onClick={signUp}>
        Confirm
      </Button>

      <Button variant="link" className="w-100" onClick={() => router.push('/login')}>
        Login
      </Button>
    </div>
  )
}
