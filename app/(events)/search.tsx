import { useLocalSearchParams } from 'expo-router';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import {
  databases,
  databases_id,
  collection_job_id,
  collection_jobtype_id,
  collection_jobcategory_id,
  Query
} from '@/lib/appwrite';
import DropDownPicker from 'react-native-dropdown-picker';
import { Provider as PaperProvider } from 'react-native-paper';

interface Job {
  $id: string;
  title: string;
  corp_name: string;
  image: string;
  nation: string;
  corp_description: string;
  skills_required: string;
  responsibilities: string;
  created_at: string;
  updated_at: string;
  salary: number;
  city: string;
  jobTypes: any;
  jobCategories: any;
}

interface JobType {
  $id: string;
  type_name: string;
}

interface JobCategory {
  $id: string;
  category_name: string;
}

export default function SearchScreen() {
  const { q } = useLocalSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);

  const [jobTypes, setJobTypes] = useState<JobType[]>([]);
  const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);

  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const fetchJobs = async () => {
    try {
      const queries = [];

      if (q) queries.push(Query.search('title', q as string));
      if (selectedTypeId) queries.push(Query.equal('jobTypes', selectedTypeId));
      if (selectedCategoryId) queries.push(Query.equal('jobCategories', selectedCategoryId));

      const response = await databases.listDocuments(databases_id, collection_job_id, queries);

      const formattedJobs: Job[] = response.documents.map((doc: any) => ({
        ...doc
      }));

      setJobs(formattedJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchFilters = async () => {
    try {
      const typesRes = await databases.listDocuments(databases_id, collection_jobtype_id);
      const categoriesRes = await databases.listDocuments(databases_id, collection_jobcategory_id);

      setJobTypes(
        typesRes.documents.map((doc: any) => ({
          $id: doc.$id,
          type_name: doc.type_name,
        }))
      );
      
      setJobCategories(
        categoriesRes.documents.map((doc: any) => ({
          $id: doc.$id,
          category_name: doc.category_name,
        }))
      );
      
    } catch (err) {
      console.error('Error loading filters:', err);
    }
  };

  const clearFilters = () => {
    setSelectedTypeId(null);
    setSelectedCategoryId(null);
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [q, selectedTypeId, selectedCategoryId]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.heading}>Kết quả cho: "{q}"</Text>

        {/* DropDown Loại công việc */}
        <View style={{ zIndex: 2000 }}>
          <DropDownPicker
            open={typeDropdownOpen}
            setOpen={setTypeDropdownOpen}
            value={selectedTypeId}
            setValue={setSelectedTypeId}
            items={jobTypes.map((type) => ({
              label: type.type_name,
              value: type.$id
            }))}
            placeholder="Loại công việc"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>

        {/* DropDown Danh mục công việc */}
        <View style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={categoryDropdownOpen}
            setOpen={setCategoryDropdownOpen}
            value={selectedCategoryId}
            setValue={setSelectedCategoryId}
            items={jobCategories.map((cat) => ({
              label: cat.category_name,
              value: cat.$id
            }))}
            placeholder="Danh mục công việc"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>

        <TouchableOpacity onPress={clearFilters}>
          <Text style={styles.clearButton}> Xóa bộ lọc</Text>
        </TouchableOpacity>

        <Text style={styles.jobListTitle}>Danh sách công việc:</Text>
      
        {jobs.length === 0 ? (
          <Text style={styles.noJobsText}>Không có công việc nào</Text>
        ) : (

    <FlatList
    data={jobs}
    keyExtractor={(item) => item.$id}
    renderItem={({ item }) => (
      <TouchableOpacity>
      <View style={styles.jobItem}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text>{item.corp_name} - {item.city}</Text>
      </View>
      </TouchableOpacity>
          )}
          />
          )}
    </View>           
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff'
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdown: {
    borderColor: '#ccc',
    marginBottom: 10,
    position: 'relative',
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  clearButton: {
    marginVertical: 10,
    color: 'red',
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  jobListTitle: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  jobItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  noJobsText: {
    fontStyle: 'italic',
    color: '#999',
    marginTop: 10,
  },
  
});
