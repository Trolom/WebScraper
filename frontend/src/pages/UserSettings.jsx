import React, { useState, useEffect } from 'react';
import api from '../api'; // Adjust the import path as necessary
import '../styles/user.css';
import NavBarGeneral from "../components/NavBarGeneral";
import Footer from "../components/Footer";
import Faq from "../components/Faq";

const UserSettings = () => {
    const [activeTab, setActiveTab] = useState('account-general');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
        birthday: '',
        country: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch user data when component mounts
        api.get('/api/users/me/')
            .then(response => {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    username: response.data.username || '',
                    email: response.data.email || '',
                    birthday: response.data.birthday || '',
                    country: response.data.country || '',
                    phone: response.data.phone || ''
                }));
            })
            .catch(error => {
                console.error("There was an error fetching the user data!", error);
            });
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeTab === 'account-change-password') {
            handleChangePassword();
        } else if (activeTab === 'account-info') {
            handleUpdateInfo();
        }
    };

    const handleChangePassword = () => {
        if (formData.newPassword !== formData.repeatNewPassword) {
            setErrors({ repeatNewPassword: "Passwords do not match" });
            return;
        }

        const passwordData = {
            current_password: formData.currentPassword,
            new_password: formData.newPassword,
        };

        api.put('/api/users/me/', passwordData)
            .then(response => {
                alert("Password changed successfully");
                setFormData({
                    ...formData,
                    currentPassword: '',
                    newPassword: '',
                    repeatNewPassword: ''
                });
            })
            .catch(error => {
                console.error("There was an error changing the password!", error);
            });
    };

    const handleUpdateInfo = () => {
        const infoData = {
            birthday: formData.birthday,
            country: formData.country,
            phone: formData.phone
        };

        api.put('/api/users/me/', infoData)
            .then(response => {
                alert("Information updated successfully");
            })
            .catch(error => {
                console.error("There was an error updating the information!", error);
            });
    };


    return (
        <div>
            <NavBarGeneral />
            <div className="container light-style flex-grow-1 container-p-y user-segment">
            <div className="section-title">
                <h2>user info</h2>
                <p>Manage your account settings and set preferences</p>
            </div>
                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-3 pt-0">
                            <div className="list-group list-group-flush account-settings-links">
                                <a 
                                    className={`list-group-item list-group-item-action ${activeTab === 'account-general' ? 'active' : ''}`} 
                                    onClick={() => handleTabChange('account-general')}
                                >
                                    General
                                </a>
                                <a 
                                    className={`list-group-item list-group-item-action ${activeTab === 'account-change-password' ? 'active' : ''}`} 
                                    onClick={() => handleTabChange('account-change-password')}
                                >
                                    Change password
                                </a>
                                <a 
                                    className={`list-group-item list-group-item-action ${activeTab === 'account-info' ? 'active' : ''}`} 
                                    onClick={() => handleTabChange('account-info')}
                                >
                                    Info
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="tab-content">
                                <div className={`tab-pane fade ${activeTab === 'account-general' ? 'active show' : ''}`} id="account-general">
                                    <div className="card-body">
                                        <div className="user-inf-group">
                                            <label className="form-label">Username</label>
                                            <input type="text" className="user-inf-form" name="username" value={formData.username} readOnly />
                                        </div>
                                        <div className="user-inf-group">
                                            <label className="form-label">E-mail</label>
                                            <input type="text" className="user-inf-form" name="email" value={formData.email} readOnly />
                                            <div className="alert alert-warning mt-3">
                                                Your email is not confirmed. Please check your inbox.<br />
                                                <a href="#">Resend confirmation</a>
                                            </div>
                                        </div>
                                        <div className="user-inf-group">
                                            <label className="form-label">Phone</label>
                                            <input type="text" className="user-inf-form" name="phone" value={formData.phone} readOnly />
                                        </div>
                                        <div className="user-inf-group">
                                            <label className="form-label">Birthday</label>
                                            <input type="text" className="user-inf-form" name="birthday" value={formData.birthday} readOnly />
                                        </div>
                                        <div className="user-inf-group">
                                            <label className="form-label">Country</label>
                                            <input type="text" className="user-inf-form" name="country" value={formData.country} readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className={`tab-pane fade ${activeTab === 'account-change-password' ? 'active show' : ''}`} id="account-change-password">
                                    <div className="card-body pb-2">
                                        <form onSubmit={handleSubmit}>
                                            <div className="user-inf-group">
                                                <label className="form-label">Current password</label>
                                                <input type="password" className="user-inf-form" name="currentPassword" value={formData.currentPassword} onChange={handleChange} />
                                            </div>
                                            <div className="user-inf-group">
                                                <label className="form-label">New password</label>
                                                <input type="password" className="user-inf-form" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                                            </div>
                                            <div className="user-inf-group">
                                                <label className="form-label">Repeat new password</label>
                                                <input type="password" className="user-inf-form" name="repeatNewPassword" value={formData.repeatNewPassword} onChange={handleChange} />
                                                {errors.repeatNewPassword && <span className="text-danger">{errors.repeatNewPassword}</span>}
                                            </div>
                                            <div className="button-group">
                                                <button type="button" className="btn-user-empty" onClick={() => setActiveTab('account-general')}>Cancel</button>
                                                <button type="submit" className="btn-user">Save changes</button>&nbsp;
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className={`tab-pane fade ${activeTab === 'account-info' ? 'active show' : ''}`} id="account-info">
                                    <div className="card-body pb-2">
                                        <form onSubmit={handleSubmit}>
                                            <div className="user-inf-group">
                                                <label className="form-label">Birthday</label>
                                                <input type="date" className="user-inf-form" name="birthday" value={formData.birthday} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Country</label>
                                                <select className="custom-select" name="country" value={formData.country} onChange={handleChange}>
                                                    <option value="USA">USA</option>
                                                    <option value="Canada">Canada</option>
                                                    <option value="UK">UK</option>
                                                    <option value="Germany">Germany</option>
                                                    <option value="France">France</option>
                                                </select>
                                            </div>
                                            <div className="user-inf-group">
                                                <label className="form-label">Phone</label>
                                                <input type="text" className="user-inf-form" name="phone" value={formData.phone} onChange={handleChange} />
                                            </div>
                                            <div className="button-group">
                                                <button type="button" className="btn-user-empty" onClick={() => setActiveTab('account-general')}>Cancel</button>
                                                <button type="submit" className="btn-user">Save changes</button>&nbsp;
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Faq />
            <Footer />
        </div>
    );
};

export default UserSettings;
