import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { databases, ID, account } from '@/lib/appwrite';

type JobOption = {
    label: string;
    value: string;
  };
  const AddJob = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [salary, setSalary] = useState('');
  const [image, setImage] = useState('');
  const [jobDescription, setjobDescription] = useState('');
  const [userId, setUserId] = useState<string>('');
  const [jobTypeItems, setJobTypeItems] = useState<JobOption[]>([]);
  const [jobCategoryItems, setJobCategoryItems] = useState<JobOption[]>([]);
  const [companyItems, setCompanyItems] = useState<JobOption[]>([]);

  const [selectedJobType, setSelectedJobType] = useState(null);
  const [selectedJobCategory, setSelectedJobCategory] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState<string>('');

  const [openJobType, setOpenJobType] = useState(false);
  const [openJobCategory, setOpenJobCategory] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);

  const [isAddingNewCompany, setIsAddingNewCompany] = useState(false);
  const [newCompany, setNewCompany] = useState({
    corp_name: '',
    nation: '',
    corp_description: '',
    city: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);

  const fetchOptions = async () => {
    try {
      const [types, categories, companies] = await Promise.all([
        databases.listDocuments('67e8c482002b317d5244', '67eb67ac002af299cf8b'),
        databases.listDocuments('67e8c482002b317d5244', '67eb6bfc00221765d9e4'),
        databases.listDocuments('67e8c482002b317d5244', '67f61f400009809453a2'),
      ]);

      setJobTypeItems(types.documents.map(d => ({ label: d.type_name, value: d.$id })));
      setJobCategoryItems(categories.documents.map(d => ({ label: d.category_name, value: d.$id })));
      setCompanyItems(companies.documents.map(d => ({ label: d.corp_name, value: d.$id })));
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải dữ liệu lựa chọn');
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);
  useEffect(() => {
      load_user_id();
    },[]);
  const load_user_id = async () => {
      try {
        const result = await account.get();
        setUserId(result.$id);
        console.log(result.$id)
        
      } catch (error) {
        console.log(error);
      }
    };

  const handleAddJob = async () => {
    if (!title || !salary || !selectedJobType || !selectedJobCategory || (!selectedCompany && !isAddingNewCompany)) {
      return Alert.alert('Thiếu thông tin', 'Vui lòng điền đầy đủ thông tin');
    }

    try {
      setLoading(true);
      let companyId = selectedCompany;

      if (isAddingNewCompany) {
        const newComp = await databases.createDocument(
          '67e8c482002b317d5244',
          '67f61f400009809453a2',
          ID.unique(),
          newCompany
        );
        companyId = newComp.$id;
      }

      await databases.createDocument(
        '67e8c482002b317d5244',
        '67e8c50d003e2f3390e9',
        ID.unique(),
        {
          title,
          image: image,
          skills_required: skillsRequired,
          responsibilities,
          salary: parseFloat(salary),
          jobTypes: selectedJobType,
          jobCategories: selectedJobCategory,
          company: companyId,
          users: userId,
          job_Description: jobDescription,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      );

      Alert.alert('Thành công', 'Đã thêm công việc mới');
      router.back();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm công việc');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput style={styles.input} placeholder="Tiêu đề công việc" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Giới thiệu công việc" value={jobDescription} onChangeText={setjobDescription} />
      <TextInput style={styles.input} placeholder="Kỹ năng cần thiết" value={skillsRequired} onChangeText={setSkillsRequired} />
      <TextInput style={styles.input} placeholder="Trách nhiệm" value={responsibilities} onChangeText={setResponsibilities} />
      <TextInput style={styles.input} placeholder="Mức lương" value={salary} onChangeText={setSalary} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Link ảnh công việc" value={image} onChangeText={setImage} />

      <Text style={styles.sectionTitle}>Loại công việc</Text>
      <DropDownPicker
        open={openJobType}
        value={selectedJobType}
        items={jobTypeItems}
        setOpen={setOpenJobType}
        setValue={setSelectedJobType}
        setItems={setJobTypeItems}
        placeholder="Chọn loại công việc"
        style={{ marginBottom: openJobType ? 100 : 12 }}
      />

      <Text style={styles.sectionTitle}>Danh mục công việc</Text>
      <DropDownPicker
        open={openJobCategory}
        value={selectedJobCategory}
        items={jobCategoryItems}
        setOpen={setOpenJobCategory}
        setValue={setSelectedJobCategory}
        setItems={setJobCategoryItems}
        placeholder="Chọn danh mục"
        style={{ marginBottom: openJobCategory ? 100 : 12 }}
      />

      <TouchableOpacity onPress={() => setIsAddingNewCompany(!isAddingNewCompany)}>
        <Text style={styles.linkText}>
          {isAddingNewCompany ? '← Chọn công ty có sẵn' : '+ Thêm công ty mới'}
        </Text>
      </TouchableOpacity>

      {isAddingNewCompany ? (
        <>
          <TextInput style={styles.input} placeholder="Tên công ty" value={newCompany.corp_name} onChangeText={text => setNewCompany({ ...newCompany, corp_name: text })} />
          <TextInput style={styles.input} placeholder="Quốc gia" value={newCompany.nation} onChangeText={text => setNewCompany({ ...newCompany, nation: text })} />
          <TextInput style={styles.input} placeholder="Mô tả" value={newCompany.corp_description} onChangeText={text => setNewCompany({ ...newCompany, corp_description: text })} />
          <TextInput style={styles.input} placeholder="Thành phố" value={newCompany.city} onChangeText={text => setNewCompany({ ...newCompany, city: text })} />
          <TextInput style={styles.input} placeholder="Link ảnh công ty" value={newCompany.image} onChangeText={text => setNewCompany({ ...newCompany, image: text })} />
        </>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Công ty</Text>
          <DropDownPicker
            open={openCompany}
            value={selectedCompany}
            items={companyItems}
            setOpen={setOpenCompany}
            setValue={setSelectedCompany}
            setItems={setCompanyItems}
            placeholder="Chọn công ty"
            style={{ marginBottom: openCompany ? 100 : 12 }}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleAddJob} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="add-circle-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Thêm công việc</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddJob
const styles = StyleSheet.create({
  container : {
    padding: 16,
    backgroundColor: '#fff',
  },
  input :{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    fontSize:16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,

  },
  linkText: {
  color: '#007AFF',
  marginBottom: 18,
  fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});