import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const Submit = () => {
  // Lưu file CV đã chọn: uri & name
  const [cvFile, setCvFile] = useState<{ uri: string; name: string } | null>(null);

  const [portfolioLink, setPortfolioLink] = useState<string>('');
  const [portfolioSlides, setPortfolioSlides] = useState<string[]>([]);
  const [portfolioPdfs, setPortfolioPdfs] = useState<string[]>([]);
  const [portfolioPhotos, setPortfolioPhotos] = useState<string[]>([]);

  const handleCvUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
        copyToCacheDirectory: false,
      });

      if (result.assets && result.assets.length > 0) {
        const pickedFile = result.assets[0];
        const fileName = pickedFile.name;
        const fileUri = pickedFile.uri;

        const cvFolder = FileSystem.documentDirectory + 'cv/';
        const destPath = cvFolder + fileName;

        // Tạo folder nếu chưa có
        const folderInfo = await FileSystem.getInfoAsync(cvFolder);
        if (!folderInfo.exists) {
          await FileSystem.makeDirectoryAsync(cvFolder, { intermediates: true });
        }

        // Xóa file cũ nếu đã tồn tại
        const existing = await FileSystem.getInfoAsync(destPath);
        if (existing.exists) {
          await FileSystem.deleteAsync(destPath);
        }

        // Copy file vào app
        await FileSystem.copyAsync({ from: fileUri, to: destPath });

        // Cập nhật state
        setCvFile({ uri: destPath, name: fileName });
        console.log('📄 File saved to:', destPath);
      } else {
        console.log('❌ No file selected');
      }
    } catch (error) {
      console.error('❌ Error picking file:', error);
    }
  };

  const handlePortfolioLink = () => {
    setPortfolioLink('https://myportfolio.com');
  };

  const handleAddSlide = () => {
    setPortfolioSlides([...portfolioSlides, 'slide1.pptx']);
  };

  const handleAddPdf = () => {
    setPortfolioPdfs([...portfolioPdfs, 'portfolio.pdf']);
  };

  const handleAddPhotos = () => {
    setPortfolioPhotos([...portfolioPhotos, 'photo1.jpg']);
  };

  const handleApply = async () => {
    console.log('📩 Gửi đơn với dữ liệu:');
    console.log('CV:', cvFile?.name, '| URI:', cvFile?.uri);

    // Sau này upload Appwrite tại đây
    // await storage.createFile(bucketId, ID.unique(), file: cvFile.uri)

    console.log({
      portfolioLink,
      portfolioSlides,
      portfolioPdfs,
      portfolioPhotos,
    });

    Alert.alert('✅ Nộp đơn thành công!');
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Hồ sơ & Portfolio</Text>
      </View>

      {/* CV Upload */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>CV hoặc Resume</Text>
        <Text style={styles.sectionSubtitle}>Tải lên hồ sơ cá nhân để ứng tuyển công việc</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleCvUpload}>
          <Text style={styles.uploadButtonText}>
            {cvFile ? cvFile.name : 'Tải file Doc/Docx/PDF'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Nộp đơn</Text>
        </TouchableOpacity>
      </View>

      {/* Portfolio */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Portfolio (Không bắt buộc)</Text>
        <View style={styles.portfolioButtonsContainer}>
          <TouchableOpacity style={styles.portfolioButton} onPress={handlePortfolioLink}>
            <Text style={styles.portfolioButtonText}>Thêm link Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.portfolioButton} onPress={handleAddSlide}>
            <Text style={styles.portfolioButtonText}>Thêm Slide</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.portfolioButtonsContainer}>
          <TouchableOpacity style={styles.portfolioButton} onPress={handleAddPdf}>
            <Text style={styles.portfolioButtonText}>Thêm PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.portfolioButton} onPress={handleAddPhotos}>
            <Text style={styles.portfolioButtonText}>Thêm Hình ảnh</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.addPdfButton} onPress={handleAddPdf}>
        <Text style={styles.addPdfButtonText}>Thêm PDF</Text>
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
