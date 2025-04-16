import { Client, Account, ID, Databases, Query } from 'react-native-appwrite';

const client = new Client()
    .setProject('67e8c1960007568848e9')
    .setPlatform('com.project.jobapplication')
    .setEndpoint('https://cloud.appwrite.io/v1');
    
    

const databases = new Databases(client);

export const account = new Account(client);
export async function getAllDocuments(databaseId: string, collectionId: string) {
    try {
      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.orderDesc("$createdAt")
      ]);
      return response.documents;
    } catch (error) {
      console.error("Error fetching documents:", error);
      return [];
    }
  }
  export const getAppliedJobs = async (recruiterId: string) => {
    try {
      // Lấy tất cả job do recruiter đăng
      const jobsRes = await databases.listDocuments(databases_id, collection_job_id, [
        Query.equal('users', recruiterId),
      ]);
  
      const jobIds = jobsRes.documents.map((job) => job.$id);
  
      // Lấy tất cả application liên quan tới các job đó
      const applicationsRes = await databases.listDocuments(databases_id, collection_applied_jobs_id, [
        Query.equal('jobId', jobIds),
      ]);
  
      // Lấy thông tin user & job để hiển thị đẹp
      const results = await Promise.all(
        applicationsRes.documents.map(async (app) => {
          const job = jobsRes.documents.find((j) => j.$id === app.jobId);
          const userRes = await databases.getDocument(databases_id, collection_user_id, app.userId);
          return { ...app, job, user: userRes };
        })
      );
  
      return results;
    } catch (error) {
      console.error('Lỗi khi lấy applied jobs:', error);
      return [];
    }
  };
  
  export const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      await databases.updateDocument(databases_id, collection_applied_jobs_id, applicationId, {
        status,
      });
    } catch (error) {
      console.error('Lỗi cập nhật status:', error);
    }
  };

const databases_id = '67e8c482002b317d5244'
const collection_job_id = '67e8c50d003e2f3390e9'
const collection_user_id = '67eb6f55003bab0d48d7'
const collection_jobtype_id = '67eb67ac002af299cf8b';
const collection_jobcategory_id = '67eb6bfc00221765d9e4';
const collection_company_id ='67f61f400009809453a2';
const collection_saved_jobs_id = '67fba800002508632ee5';
const collection_applied_jobs_id= '67fe804c003af89aa92c';

export { client, databases, databases_id, collection_job_id, collection_user_id,collection_jobtype_id, collection_jobcategory_id, collection_company_id, collection_saved_jobs_id, collection_applied_jobs_id, Query }
export { ID };