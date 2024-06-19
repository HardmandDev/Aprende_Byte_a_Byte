import { useState, useEffect } from 'react';

const documentTypeMap = {
  "5c6f2dd1-b178-4c8b-a8b6-7838407ef278": "cc",
  "aaa82df3-978e-47ed-a821-77c6a5c9cac7": "ti",
  "91552d4b-3fda-4213-838b-49d856493a79": "ce",
  "3b072269-605c-4612-81f2-941fe3c3bb30": "ppt",
  "9ea647ea-04a1-4a69-ae59-acb224a4ac3e": "pp"
};

const roleMap = {
  "8c890948-5402-40e6-a38d-6f2df9e3b4db": "student",
  "f3d9324c-ecbd-4d1b-bc92-dbe75ff149db": "teacher",
  "6126917f-f7e3-4ee8-a5a1-16e3b128f26b": "support",
  "7bf4770d-ab11-4aba-9e0a-991b3f162488": "admin"
};

const UserForm = ({ user, onSave, showRoleField = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    document_type_id: '',
    document: '',
    first_name: '',
    last_name: '',
    role_id: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        password: '',
        document_type_id: user.document_type_id || '',
        document: user.document || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        role_id: user.role_id || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Document Type:</label>
        <select
          name="document_type_id"
          value={formData.document_type_id}
          onChange={handleChange}
        >
          {Object.entries(documentTypeMap).map(([id, type]) => (
            <option key={id} value={id}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Document:</label>
        <input
          type="text"
          name="document"
          value={formData.document}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
      </div>
      {showRoleField && (
        <div>
          <label>Role:</label>
          <select
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
          >
            {Object.entries(roleMap).map(([id, role]) => (
              <option key={id} value={id}>{role}</option>
            ))}
          </select>
        </div>
      )}
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
