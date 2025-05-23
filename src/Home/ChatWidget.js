import React, { useState, useEffect } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    
    // Configure your WhatsApp number here (without + or spaces)
    const whatsappNumber = '1234567890'; // Replace with your actual number
    const whatsappMessage = 'Hello! I need help with...'; // Default message
    
    // Configure your Messenger username/page ID
    const messengerUsername = 'yourpage'; // Replace with your Facebook page username
    
    // Show notification badge after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(true);
        }, 5000);
        
        return () => clearTimeout(timer);
    }, []);
    
    // Show tooltip after 10 seconds if not opened
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) {
                setShowTooltip(true);
                // Hide tooltip after 5 seconds
                setTimeout(() => {
                    setShowTooltip(false);
                }, 5000);
            }
        }, 10000);
        
        return () => clearTimeout(timer);
    }, [isOpen]);
    
    const handleWhatsAppClick = () => {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(url, '_blank');
        setIsOpen(false);
    };
    
    const handleMessengerClick = () => {
        const url = `https://m.me/${messengerUsername}`;
        window.open(url, '_blank');
        setIsOpen(false);
    };
    
    const toggleChat = () => {
        setIsOpen(!isOpen);
        setShowNotification(false);
        setShowTooltip(false);
    };
    
    return (
        <>
            {/* Main chat button */}
            <div className="chat-widget">
                {/* Tooltip */}
                {showTooltip && !isOpen && (
                    <div className="chat-tooltip">
                        <p>👋 Need help? Chat with us!</p>
                        <div className="tooltip-arrow"></div>
                    </div>
                )}
                
                <button 
                    className="chat-toggle-btn"
                    onClick={toggleChat}
                    aria-label="Toggle chat menu"
                >
                    {/* Online status indicator on button */}
                    <span className="button-status-dot"></span>
                    
                    {/* Notification badge */}
                    {showNotification && !isOpen && (
                        <span className="notification-badge">1</span>
                    )}
                    
                    {!isOpen ? (
                        <div className="chat-icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="chat-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="chat-icon-hover">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                        </div>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </button>
                
                {/* Chat options */}
                <div className={`chat-options ${isOpen ? 'open' : ''}`}>
                    <div className="chat-header">
                        <div className="header-top">
                            <div className="agent-info">
                                <div className="agent-avatar">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="avatar-status"></span>
                                </div>
                                <div>
                                    <h3>Support Team</h3>
                                    <div className="chat-status">
                                        <span className="status-dot"></span>
                                        <span className="status-text">Active now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="response-time">Typically replies instantly</p>
                    </div>
                    
                    <div className="chat-body">
                        <div className="welcome-message">
                            <p>👋 Hi there! How can we help you today?</p>
                        </div>
                        
                        <button 
                            className="chat-option whatsapp"
                            onClick={handleWhatsAppClick}
                            aria-label="Chat on WhatsApp"
                        >
                            <div className="option-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                            </div>
                            <div className="option-content">
                                <span className="option-title">WhatsApp</span>
                                <span className="option-subtitle">Quick response</span>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="arrow-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        
                        <button 
                            className="chat-option messenger"
                            onClick={handleMessengerClick}
                            aria-label="Chat on Messenger"
                        >
                            <div className="option-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.733 8l3.13 3.259L19.752 8l-6.561 6.963z"/>
                                </svg>
                            </div>
                            <div className="option-content">
                                <span className="option-title">Messenger</span>
                                <span className="option-subtitle">Facebook chat</span>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="arrow-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="chat-footer">
                        <p>Available 24/7 for your queries</p>
                    </div>
                </div>
            </div>
            
            {/* Backdrop */}
            {isOpen && <div className="chat-backdrop" onClick={() => setIsOpen(false)} />}
        </>
    );
};

export default ChatWidget;