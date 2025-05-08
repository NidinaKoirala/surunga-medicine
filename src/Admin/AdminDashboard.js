import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../Context/AppContext';
import './AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faSave, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
    const { doctors, specialityData, addDoctor, updateDoctor, deleteDoctor } = useContext(AppContext);
    
    // State for the doctors list and filtered doctors
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    // State for the form
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentDoctorId, setCurrentDoctorId] = useState(null);
    
    // Form data state
    const [formData, setFormData] = useState({
        name: '',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '1 Years',
        fees: 50,
        about: '',
        address: {
            line1: '',
            line2: ''
        }
    });
    
    // Update filtered doctors when doctors or search term changes
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredDoctors(doctors);
        } else {
            const filtered = doctors.filter(
                doctor => 
                    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredDoctors(filtered);
        }
    }, [doctors, searchTerm]);
    
    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [addressField]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    
    // Reset form
    const resetForm = () => {
        setFormData({
            name: '',
            speciality: 'General physician',
            degree: 'MBBS',
            experience: '1 Years',
            fees: 50,
            about: '',
            address: {
                line1: '',
                line2: ''
            }
        });
        setEditMode(false);
        setCurrentDoctorId(null);
    };
    
    // Open add form
    const handleAddNew = () => {
        resetForm();
        setShowForm(true);
    };
    
    // Open edit form
    const handleEdit = (doctor) => {
        setFormData({
            name: doctor.name,
            speciality: doctor.speciality,
            degree: doctor.degree,
            experience: doctor.experience,
            fees: doctor.fees,
            about: doctor.about,
            address: {
                line1: doctor.address.line1,
                line2: doctor.address.line2
            }
        });
        setEditMode(true);
        setCurrentDoctorId(doctor._id);
        setShowForm(true);
    };
    
    // Handle delete
    const handleDelete = (doctorId) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            const success = deleteDoctor(doctorId);
            if (success) {
                alert('Doctor deleted successfully!');
            } else {
                alert('Failed to delete doctor.');
            }
        }
    };
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.speciality) {
            alert('Name and Speciality are required!');
            return;
        }
        
        if (editMode) {
            // Update existing doctor
            const success = updateDoctor(currentDoctorId, formData);
            if (success) {
                alert('Doctor updated successfully!');
                setShowForm(false);
                resetForm();
            } else {
                alert('Failed to update doctor.');
            }
        } else {
            // Add new doctor
            const newId = addDoctor(formData);
            if (newId) {
                alert(`Doctor added successfully with ID: ${newId}`);
                setShowForm(false);
                resetForm();
            } else {
                alert('Failed to add doctor.');
            }
        }
    };
    
    // Handle cancel
    const handleCancel = () => {
        setShowForm(false);
        resetForm();
    };
    
    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>{showForm ? (editMode ? 'Edit Doctor' : 'Add New Doctor') : 'Doctor Management'}</h1>
                
                {!showForm && (
                    <div className="dashboard-actions">
                        <div className="search-container">
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            <input 
                                type="text" 
                                placeholder="Search doctors..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="add-btn" onClick={handleAddNew}>
                            <FontAwesomeIcon icon={faPlus} /> Add New Doctor
                        </button>
                    </div>
                )}
            </div>
            
            {!showForm ? (
                <div className="doctors-table-container">
                    <table className="doctors-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Speciality</th>
                                <th>Degree</th>
                                <th>Experience</th>
                                <th>Fees</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDoctors.map(doctor => (
                                <tr key={doctor._id}>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.speciality}</td>
                                    <td>{doctor.degree}</td>
                                    <td>{doctor.experience}</td>
                                    <td>${doctor.fees}</td>
                                    <td className="action-buttons">
                                        <button 
                                            className="edit-btn" 
                                            onClick={() => handleEdit(doctor)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => handleDelete(doctor._id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            
                            {filteredDoctors.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="no-data">No doctors found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="doctor-form-container">
                    <form onSubmit={handleSubmit} className="doctor-form">
                        <div className="form-group">
                            <label htmlFor="name">Doctor Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleInputChange}
                                placeholder="Dr. John Smith"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="speciality">Speciality</label>
                            <select 
                                id="speciality" 
                                name="speciality" 
                                value={formData.speciality} 
                                onChange={handleInputChange}
                                required
                            >
                                {specialityData.map((specialty, index) => (
                                    <option key={index} value={specialty.speciality}>
                                        {specialty.speciality}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="degree">Degree</label>
                                <input 
                                    type="text" 
                                    id="degree" 
                                    name="degree" 
                                    value={formData.degree} 
                                    onChange={handleInputChange}
                                    placeholder="MBBS, MD, etc."
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="experience">Experience</label>
                                <input 
                                    type="text" 
                                    id="experience" 
                                    name="experience" 
                                    value={formData.experience} 
                                    onChange={handleInputChange}
                                    placeholder="5 Years"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="fees">Fees ($)</label>
                                <input 
                                    type="number" 
                                    id="fees" 
                                    name="fees" 
                                    value={formData.fees} 
                                    onChange={handleInputChange}
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="about">About</label>
                            <textarea 
                                id="about" 
                                name="about" 
                                value={formData.about} 
                                onChange={handleInputChange}
                                rows="4"
                                placeholder="Brief description about the doctor..."
                                required
                            ></textarea>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="address.line1">Address Line 1</label>
                            <input 
                                type="text" 
                                id="address.line1" 
                                name="address.line1" 
                                value={formData.address.line1} 
                                onChange={handleInputChange}
                                placeholder="Street Address"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="address.line2">Address Line 2</label>
                            <input 
                                type="text" 
                                id="address.line2" 
                                name="address.line2" 
                                value={formData.address.line2} 
                                onChange={handleInputChange}
                                placeholder="City, State, Country"
                                required
                            />
                        </div>
                        
                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={handleCancel}>
                                <FontAwesomeIcon icon={faTimes} /> Cancel
                            </button>
                            <button type="submit" className="save-btn">
                                <FontAwesomeIcon icon={faSave} /> {editMode ? 'Update Doctor' : 'Add Doctor'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;