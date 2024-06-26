import React, { useEffect, useState } from "react"
import "./FormStyle.css"


export default function SelectForm() {
  const [formData, setFormData] = useState({
    id: "f45ae1ba-6376-4ae0-81ce-20dd45f3b3fe",
    document_type_id: null,
    document: null,
    first_name: "Support",
    last_name: null,
    email: "support@abb.hardmand.com",
    role_id: "6126917f-f7e3-4ee8-a5a1-16e3b128f26b",
  });
  // Fetch user data for the form
  // useEffect(() => {
  //   fetch(`https://jp9dtqt5-3000.use2.devtunnels.ms/api/v1/users/:${id}`)
  //       .then(response => response.json())
  //       .then(data => setFormData(data));
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/v1/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle success
      })
      .catch(error => {
        // Handle error
      });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <input type="text" value={formData.first_name} onChange={e => setFormData({ ...formData, first_name: e.target.value })} placeholder="First Name" />
          <input type="text" value={formData.last_name} onChange={e => setFormData({ ...formData, last_name: e.target.value })} placeholder="Last Name" />
          <select value={formData.document_type_id} onChange={e => setFormData({ ...formData, document_type_id: e.target.value })} >
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="C">Cédula de Extranjería</option>
            <option value="P">Pasaporte</option>
          </select>
          <input type="text" value={formData.document} onChange={e => setFormData({ ...formData, document: e.target.value })} placeholder="Document" />
          <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email" />
          <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="Password" />
          <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="support">Support</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div >
    </>
  )
}