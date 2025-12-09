import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import './Auth.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate form
      if (!formData.email || !formData.password || !formData.fullName) {
        setError('Vui lòng điền đầy đủ thông tin bắt buộc');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự');
        setLoading(false);
        return;
      }

      // Bước 1: Tạo tài khoản Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
          }
        }
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Không thể tạo tài khoản');
      }

      // Bước 2: Lưu thông tin user vào bảng users
      const { error: dbError } = await supabase
        .from('users')
        .insert([{
          id: authData.user.id, // Dùng ID từ Supabase Auth
          email: formData.email,
          full_name: formData.fullName,
          phone: formData.phone || null,
          role: 'reader',
          quota: 5,
          current_borrowing: 0,
          penalty_status: '',
        }]);

      if (dbError) {
        // Nếu lỗi khi lưu vào database, xóa tài khoản auth đã tạo
        console.error('Error saving user to database:', dbError);
        throw new Error('Lỗi lưu thông tin người dùng');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err: any) {
      console.error('Registration error:', err);
      
      // Xử lý các lỗi cụ thể
      if (err.message?.includes('already registered')) {
        setError('Email này đã được đăng ký');
      } else if (err.message?.includes('Invalid email')) {
        setError('Email không hợp lệ');
      } else if (err.message?.includes('Password')) {
        setError('Mật khẩu phải có ít nhất 6 ký tự');
      } else {
        setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Đăng Ký</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            Đăng ký thành công! Đang chuyển hướng...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên: *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Email: *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0123456789"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu: *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ít nhất 6 ký tự"
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>

        <p className="auth-footer">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
