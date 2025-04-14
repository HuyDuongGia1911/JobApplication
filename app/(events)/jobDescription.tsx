import { StyleSheet, Text, TouchableOpacity, View, Image, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'

import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { collection_job_id, collection_user_id, databases, databases_id } from '@/lib/appwrite'
import { useLocalSearchParams } from 'expo-router';
import { useSavedJobs } from '@/app/saveJobsContext';
const jobDescription = () => {
  const [selected, setSelected] = useState(0);

  const Switch_Selected = async (index: number) => {
    setSelected(index);
  }
  const { jobId } = useLocalSearchParams();
  const [dataJob, setDataJob] = useState<any>(null);
  const { isJobSaved, toggleSaveJob } = useSavedJobs();
  const [posterInfo, setPosterInfo] = useState<{ name?: string, email?: string }>({});
  useEffect(() => {
    if (jobId) {
      load_data(jobId as string);
    }
  }, [jobId]);


  const load_data = async (id: string) => {

    try {
      const result = await databases.getDocument(
        databases_id,
        collection_job_id,
        id
      );

      if (result.users?.$id) {
        try {

          const userDoc = await databases.getDocument(
            databases_id,
            collection_user_id,
            result.users.$id
          );


          if (userDoc.name) {
            setPosterInfo({
              name: userDoc.name,
              email: userDoc.email
            });
          }
        } catch (dbError) {
          console.log("Không lấy được từ Database:", dbError);
        }
      }
      setDataJob(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveJob = () => {
    if (jobId) {
      toggleSaveJob(jobId as string);
      // Hiển thị thông báo
      ToastAndroid.show(
        isJobSaved(jobId as string) ? 'Đã bỏ lưu công việc' : 'Đã lưu công việc',
        ToastAndroid.SHORT
      );
    }
  };

  if (!dataJob) return <Text>Loading...</Text>;
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity style={styles.buttons} onPress={() => router.push("/")}>
          <Ionicons name='arrow-back' size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons} onPress={() => router.push("/")}>
          <Ionicons name='share-social' size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.jobImageContainer}>
          <Image
            style={styles.jobImage}
            source={{ uri: dataJob.image }}
          />
        </View>
        <View style={styles.companyName}>

          <Text style={styles.companyNameText}>{dataJob?.title}</Text>
          <Text style={styles.companyNameText}>{dataJob?.company?.corp_name}</Text>
        </View>
        <View style={styles.jobInfoContainer}>
          <View style={styles.jobInfoBox}>
            <Text style={styles.jobInfoText}>{dataJob?.jobTypes?.type_name || "No Job Type"}</Text>
          </View>
          <View style={styles.jobInfoBox}>
            <Text style={styles.jobInfoText}>{dataJob?.jobCategories?.category_name || "No Job Category"}</Text>
          </View>
        </View>
        <View style={styles.companyInfoBox}>
          <View>
            <Text style={styles.companyInfoText}>$ {dataJob?.salary}</Text>
          </View>
          <View style={styles.companyLocation}>
            <Text style={styles.companyInfoText}>{dataJob?.company?.city} /</Text>
            <Ionicons style={styles.companyInfoText2} name='location' size={24} />
            <Text style={styles.companyInfoText2}>{dataJob?.company?.nation || "No Nation"}</Text>
          </View>
        </View>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tabBox, selected === 0 ? styles.tabActive : styles.tabNormal]} onPress={() => Switch_Selected(0)}>
          <Text style={[selected === 0 ? styles.tabActiveText : styles.tabNormalText]}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabBox, selected === 1 ? styles.tabActive : styles.tabNormal]} onPress={() => Switch_Selected(1)}>
          <Text style={[selected === 1 ? styles.tabActiveText : styles.tabNormalText]}>Qualification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabBox, selected === 2 ? styles.tabActive : styles.tabNormal]} onPress={() => Switch_Selected(2)}>
          <Text style={[selected === 2 ? styles.tabActiveText : styles.tabNormalText]}>Responsibility</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentTab}>
        {selected === 0 ? (
          <View>
            <Text style={styles.descriptionContent}>
            Người đăng: {posterInfo.name || posterInfo.email || "Ẩn danh"}
            </Text>
            <Text style={styles.descriptionContent}>{dataJob.job_Description}</Text>
            <Text style={styles.descriptionContent}>{dataJob.skills_required}</Text>
            <Text style={styles.descriptionContent}>{dataJob.responsibilities}</Text>

          </View>
        )
          : selected === 1 ? (
            <Text style={styles.descriptionContent}>{dataJob.skills_required}</Text>

          )
            : (
              <Text style={styles.descriptionContent}>{dataJob.responsibilities}</Text>
            )
        }
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.heartContainer} onPress={handleSaveJob}>
          <Ionicons
            name={isJobSaved(jobId as string) ? 'heart' : 'heart-outline'}
            style={[
              styles.iconHeart,
              isJobSaved(jobId as string) && styles.iconHeartActive
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyContainer} onPress={() => router.push({ pathname: '/(events)/submit', params: { jobId } })} >

          <Text style={styles.applyText}>Apply Now</Text>

        </TouchableOpacity>
      </View>
    </View>
  )
}

export default jobDescription

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    borderWidth: 0,
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobImage: {
    height: '100%',
    width: 100,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  jobImageContainer: {
    marginTop: 10,
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#EBF2FC',



  },
  companyName: {

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#EBF2FC',
  },
  companyNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  companyInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',


  },
  companyInfoText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  companyInfoText2: {
    fontSize: 15,
    textShadowColor: 'black',
    color: '#a9a9a9'
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: "center",
    gap: 10,
  },
  tabBox: {
    borderWidth: 0,
    borderRadius: 15,
    height: 50,
    width: "100%",
    justifyContent: 'center',
    alignItems: "center",
    flex: 1,

  },
  tabNormal: {
    backgroundColor: '#EEEEEE'
  },
  tabNormalText: {
    color: '#AAAAAA'
  },
  tabActive: {
    backgroundColor: '#2F264F'
  },
  tabActiveText: {
    color: 'white',
  },

  contentTab: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    padding: 14,
    height: 450,
  },
  descriptionContent: {
    fontSize: 15,
    color: 'black',
    textAlign: 'justify',
  },
  companyLocation: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#EBF2FC',
  },
  jobInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',

    gap: 10,

  },
  jobInfoBox: {
    backgroundColor: 'blue',
    borderWidth: 0,
    borderRadius: 15,
    padding: 5,
  },
  jobInfoText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  headerContainer: {
    marginBottom: 20,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#EBF2FC',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: "center",
    gap: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  heartContainer: {
    borderWidth: 0,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 20,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconHeart: {
    fontSize: 32,
    color: '#F97459',
  },
  iconHeartActive: {
    color: '#F97459',
  },
  applyContainer: {
    flex: 1,
    height: 60,
    backgroundColor: '#F97459',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F97459',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,

  },
  applyText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
})