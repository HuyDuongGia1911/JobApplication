import { Client, Account, ID, Databases } from 'react-native-appwrite';

const client = new Client()
    .setProject('67e8c1960007568848e9')
    .setPlatform('com.project.jobapplication')
    .setEndpoint('https://cloud.appwrite.io/v1');
    
    

const databases = new Databases(client);

export const account = new Account(client);


const databases_id = '67e8c482002b317d5244'
const collection_job_id = '67e8c50d003e2f3390e9'
const collection_user_id = '67eb6f55003bab0d48d7'

export { client, databases, databases_id, collection_job_id, collection_user_id }
export { ID };