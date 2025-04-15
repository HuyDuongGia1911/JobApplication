import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { account, databases, databases_id, collection_saved_jobs, ID, Query } from '@/lib/appwrite'

const jobDescription = () => {

  const {jobId} : {jobId: string} = useLocalSearchParams()
  const [userId, setUserId] = useState<string>('')
  const [checkSaveJob, setCheckSaveJob] = useState<boolean>(false)
  const [loadding, setLoadding] = useState<boolean>(false)
  const [jobIdOfUser, setJobIdOfUser] = useState<string>('')

  useEffect(() => {
    load_userId()
    load_data_save_jobs()
  },[userId])

  const load_data_save_jobs = async () => {
    try{
      if(userId){
        setLoadding(true)
        const dataSaveJobs = await databases.listDocuments(
          databases_id,
          collection_saved_jobs,
          [Query.equal('userId', userId), Query.equal('jobId', jobId)]
        )

        if(dataSaveJobs.documents.length > 0){
          setCheckSaveJob(true)
          setJobIdOfUser(dataSaveJobs.documents[0].$id)
        }else{
          setCheckSaveJob(false)
        }
        setLoadding(false)
      }
    }catch{
      setLoadding(false)
    }
  }

  const load_userId = async () => {
    const user = await account.get()
    setUserId(user.$id)
  }

  const add_jobs = async () => {
    try{
      if (userId){
        setLoadding(true)
        await databases.createDocument(
          databases_id,
          collection_saved_jobs,
          ID.unique(),
          {
            userId: userId,
            jobId: jobId,
          }
        )
        await load_data_save_jobs()
      }
    }catch{
      setLoadding(false)
    }
  }

  const delete_jobs = async () => {
    try{
      if (userId){
        setLoadding(true)
        await databases.deleteDocument(
          databases_id,
          collection_saved_jobs,
          jobIdOfUser
        )
        await load_data_save_jobs()
        console.log('xoa thanh cong')
      }
    }catch{
      setLoadding(false)
    }
  }

  if(loadding) {
    return(
      <Text>Dang loadding</Text>
    )
  }

  return (
    <ScrollView>
      <View></View>
      <View>
      {
        checkSaveJob ? (
          <TouchableOpacity onPress={delete_jobs}>
            <Ionicons name='heart' size={20} color={'red'}/>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={add_jobs}>
            <Ionicons name='heart-outline' size={20} color={'red'}/>
          </TouchableOpacity>
        )
      }
      
      </View>
    </ScrollView>
  )
}

export default jobDescription

const styles = StyleSheet.create({})