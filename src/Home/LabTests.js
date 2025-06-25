import React, { useState } from 'react';
import { FaSearch, FaFlask, FaHeartbeat, FaEye, FaMicroscope, FaVirus, FaBaby } from 'react-icons/fa';
import './LabTests.css';

function LabTests() {
    const [searchTerm, setSearchTerm] = useState('');

    // Categorized Lab Tests Data
    const labTestsData = {
        'Blood Sugar & Diabetes': [
            { name: "RBS", fullName: "Random Blood Sugar", category: "diabetes" },
            { name: "FBS", fullName: "Fasting Blood Sugar", category: "diabetes" },
            { name: "PPBS", fullName: "Post Prandial Blood Sugar", category: "diabetes" },
            { name: "OGTT", fullName: "Oral Glucose Tolerance Test", category: "diabetes" },
            { name: "GTT", fullName: "Glucose Tolerance Test", category: "diabetes" },
            { name: "HbA1c", fullName: "Glycated Hemoglobin", category: "diabetes" }
        ],
        'Blood Tests': [
            { name: "CBC", fullName: "Complete Blood Count", category: "blood" },
            { name: "PBS", fullName: "Peripheral Blood Smear", category: "blood" },
            { name: "Reticulocytes", fullName: "Reticulocyte Count", category: "blood" },
            { name: "AEC", fullName: "Absolute Eosinophil Count", category: "blood" },
            { name: "Blood Grouping", fullName: "ABO & Rh Blood Group", category: "blood" },
            { name: "ICT", fullName: "Indirect Coombs Test", category: "blood" },
            { name: "Blood C/S", fullName: "Blood Culture & Sensitivity", category: "blood" }
        ],
        'Organ Function Tests': [
            { name: "TFT", fullName: "Thyroid Function Test", category: "organ" },
            { name: "LFT", fullName: "Liver Function Test", category: "organ" },
            { name: "RFT", fullName: "Renal Function Test", category: "organ" },
            { name: "Iron Profile", fullName: "Iron Studies", category: "organ" },
            { name: "Amylase", fullName: "Serum Amylase", category: "organ" },
            { name: "Lipase", fullName: "Serum Lipase", category: "organ" }
        ],
        'Lipid & Cardiac': [
            { name: "Fasting Lipid Profile", fullName: "Cholesterol & Lipid Analysis", category: "cardiac" },
            { name: "CRP (Quantitative)", fullName: "C-Reactive Protein", category: "cardiac" }
        ],
        'Minerals & Vitamins': [
            { name: "Calcium", fullName: "Serum Calcium", category: "minerals" },
            { name: "Phosphorous", fullName: "Serum Phosphorous", category: "minerals" },
            { name: "Uric Acid", fullName: "Serum Uric Acid", category: "minerals" },
            { name: "Vitamin D", fullName: "25-Hydroxy Vitamin D", category: "minerals" },
            { name: "Vitamin B12", fullName: "Cobalamin Levels", category: "minerals" }
        ],
        'Hormones': [
            { name: "Sr. Prolactin", fullName: "Serum Prolactin", category: "hormones" },
            { name: "LH", fullName: "Luteinizing Hormone", category: "hormones" },
            { name: "FSH", fullName: "Follicle Stimulating Hormone", category: "hormones" },
            { name: "Testosterone", fullName: "Testosterone Levels", category: "hormones" },
            { name: "Anti TPO", fullName: "Anti-Thyroid Peroxidase", category: "hormones" }
        ],
        'Autoimmune & Arthritis': [
            { name: "Anti CCP", fullName: "Anti-Cyclic Citrullinated Peptide", category: "autoimmune" },
            { name: "ANA (IF)", fullName: "Antinuclear Antibody Immunofluorescence", category: "autoimmune" },
            { name: "ANA", fullName: "Antinuclear Antibody", category: "autoimmune" },
            { name: "RF (Quantitative)", fullName: "Rheumatoid Factor", category: "autoimmune" },
            { name: "C3", fullName: "Complement Component 3", category: "autoimmune" },
            { name: "C4", fullName: "Complement Component 4", category: "autoimmune" }
        ],
        'Infectious Diseases': [
            { name: "HIV", fullName: "Human Immunodeficiency Virus", category: "infectious" },
            { name: "VDRL", fullName: "Venereal Disease Research Laboratory", category: "infectious" },
            { name: "HBsAg", fullName: "Hepatitis B Surface Antigen", category: "infectious" },
            { name: "HCV", fullName: "Hepatitis C Virus", category: "infectious" },
            { name: "Dengue", fullName: "Dengue Fever Test", category: "infectious" },
            { name: "Typhoid (IgM/IgG)", fullName: "Typhoid Antibodies", category: "infectious" },
            { name: "Brucella", fullName: "Brucellosis Test", category: "infectious" },
            { name: "Scrub Typhus", fullName: "Scrub Typhus Antibodies", category: "infectious" },
            { name: "TPHA", fullName: "Treponema Pallidum Hemagglutination", category: "infectious" },
            { name: "TB Gold", fullName: "Tuberculosis Gold Test", category: "infectious" }
        ],
        'Urine Tests': [
            { name: "Urine RE/ME", fullName: "Urine Routine & Microscopy", category: "urine" },
            { name: "Urine C/S", fullName: "Urine Culture & Sensitivity", category: "urine" },
            { name: "Urine for ACR", fullName: "Albumin Creatinine Ratio", category: "urine" },
            { name: "24 Hours Urine", fullName: "24-Hour Urine Collection", category: "urine" }
        ],
        'Culture Tests': [
            { name: "Pus C/S", fullName: "Pus Culture & Sensitivity", category: "culture" },
            { name: "Stool C/S", fullName: "Stool Culture & Sensitivity", category: "culture" }
        ],
        'Cancer Markers': [
            { name: "CEA 125", fullName: "Cancer Antigen 125", category: "cancer" }
        ],
        'Allergy Tests': [
            { name: "Allergic Panel", fullName: "Comprehensive Allergy Testing", category: "allergy" },
            { name: "Food Panel", fullName: "Food Allergy Panel", category: "allergy" }
        ]
    };

    // Get category icon
    const getCategoryIcon = (category) => {
        const iconMap = {
            'Blood Sugar & Diabetes': <FaHeartbeat />,
            'Blood Tests': <FaFlask />,
            'Organ Function Tests': <FaMicroscope />,
            'Lipid & Cardiac': <FaHeartbeat />,
            'Minerals & Vitamins': <FaFlask />,
            'Hormones': <FaMicroscope />,
            'Autoimmune & Arthritis': <FaVirus />,
            'Infectious Diseases': <FaVirus />,
            'Urine Tests': <FaEye />,
            'Culture Tests': <FaMicroscope />,
            'Cancer Markers': <FaVirus />,
            'Allergy Tests': <FaBaby />
        };
        return iconMap[category] || <FaFlask />;
    };

    // Filter tests based on search term
    const filteredTests = Object.entries(labTestsData).reduce((acc, [category, tests]) => {
        const filteredCategoryTests = tests.filter(test => 
            test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredCategoryTests.length > 0) {
            acc[category] = filteredCategoryTests;
        }
        return acc;
    }, {});

    // Calculate total tests
    const totalTests = Object.values(labTestsData).reduce((total, tests) => total + tests.length, 0);

    return (
        <section className="lab-tests-section" id="lab-tests-section">
            <div className="container">
                {/* Section Header */}
                <div className="lab-tests-header">
                    <h2>Laboratory Tests</h2>
                    <p>Comprehensive diagnostic testing with accurate results and modern equipment</p>
                    <div className="stats-badge">
                        <FaFlask />
                        <span>{totalTests}+ Available Tests</span>
                    </div>
                </div>

                <div className="lab-tests-container">
                    {/* Search Bar */}
                    <div className="search-container">
                        <div className="search-input-wrapper">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for tests..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    {/* Tests Grid */}
                    <div className="lab-tests-content">
                        {Object.entries(filteredTests).map(([category, tests]) => (
                            <div key={category} className="test-category">
                                <div className="category-header">
                                    <div className="category-icon">
                                        {getCategoryIcon(category)}
                                    </div>
                                    <h3 className="category-title">{category}</h3>
                                    <span className="test-count">({tests.length} tests)</span>
                                </div>
                                
                                <div className="tests-grid">
                                    {tests.map((test, index) => (
                                        <div key={index} className="test-card">
                                            <div className="test-header">
                                                <h4 className="test-name">{test.name}</h4>
                                            </div>
                                            <p className="test-description">{test.fullName}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {Object.keys(filteredTests).length === 0 && searchTerm && (
                        <div className="no-results">
                            <FaSearch className="no-results-icon" />
                            <h3>No tests found</h3>
                            <p>Try adjusting your search terms</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default LabTests;