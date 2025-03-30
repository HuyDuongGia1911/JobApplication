import { Client, Account, ID, Databases } from 'react-native-appwrite';

const client = new Client()
    .setProject('67e8c1960007568848e9')
    .setPlatform('com.project.jobapplication');

const databases = new Databases(client);
const databases_id = '67e8c482002b317d5244'
const collection_job_id = '67e8c50d003e2f3390e9'

export { client, databases, databases_id, collection_job_id }