import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Submit = () => {
  const [cvFile, setCvFile] = useState<string | null>(null);
  const [portfolioLink, setPortfolioLink] = useState<string>('');
  const [portfolioSlides, setPortfolioSlides] = useState<string[]>([]);
  const [portfolioPdfs, setPortfolioPdfs] = useState<string[]>([]);
  const [portfolioPhotos, setPortfolioPhotos] = useState<string[]>([]);

  // Placeholder functions for file uploads (you can integrate actual file picker logic here)
  const handleCvUpload = () => {
    // Logic to upload a Doc/Docx/PDF file (e.g., using expo-document-picker)
    setCvFile('resume.pdf'); // Mock file name for now
  };

  const handlePortfolioLink = () => {
    // Logic to add a portfolio link (e.g., open a text input modal)
    setPortfolioLink('https://myportfolio.com'); // Mock link for now
  };

  const handleAddSlide = () => {
    // Logic to add a slide (e.g., using a file picker or custom input)
    setPortfolioSlides([...portfolioSlides, 'slide1.pptx']); // Mock slide for now
  };

  const handleAddPdf = () => {
    // Logic to add a PDF (e.g., using expo-document-picker)
    setPortfolioPdfs([...portfolioPdfs, 'portfolio.pdf']); // Mock PDF for now
  };

  const handleAddPhotos = () => {
    // Logic to add photos (e.g., using expo-image-picker)
    setPortfolioPhotos([...portfolioPhotos, 'photo1.jpg']); // Mock photo for now
  };

  const handleApply = () => {
    // Logic to submit the application (e.g., send data to a server)
    console.log('Applying with:', { cvFile, portfolioLink, portfolioSlides, portfolioPdfs, portfolioPhotos });
    // Navigate back or to a confirmation page
    router.push('/'); // Adjust the route as needed
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topView}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Resume & Portfolio</Text>
      </View>

      {/* CV/Resume Upload Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Resume or CV</Text>
        <Text style={styles.sectionSubtitle}>Upload your CV or Resume and Where you apply Job</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleCvUpload}>
          <Text style={styles.uploadButtonText}>
            {cvFile ? cvFile : 'Upload a Doc/Docx/PDF'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      {/* Portfolio Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Portfolio (Optional)</Text>
        <View style={styles.portfolioButtonsContainer}>
          <TouchableOpacity style={styles.portfolioButton} onPress={handlePortfolioLink}>
            <Text style={styles.portfolioButtonText}>Portfolio Link</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.portfolioButton} onPress={handleAddSlide}>
            <Text style={styles.portfolioButtonText}>Add Slide</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.portfolioButtonsContainer}>
          <TouchableOpacity style={styles.portfolioButton} onPress={handleAddPdf}>
            <Text style={styles.portfolioButtonText}>Add Pdf</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.portfolioButton} onPress={handleAddPhotos}>
            <Text style={styles.portfolioButtonText}>Add Photos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add PDF Button (at the bottom) */}
      <TouchableOpacity style={styles.addPdfButton} onPress={handleAddPdf}>
        <Text style={styles.addPdfButtonText}>Add Pdf</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Submit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F264F',
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#666',
  },
  applyButton: {
    backgroundColor: '#28A745',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  portfolioButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  portfolioButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  portfolioButtonText: {
    fontSize: 16,
    color: '#666',
  },
  addPdfButton: {
    backgroundColor: '#28A745',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  addPdfButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});