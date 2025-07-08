import { CreateUserParams, SignInParams } from "@/type"
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite"

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT! ,
  projectId:  process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.essam.food",
  databaseId: "686c1816003c1bb502ba",
  userCollectionId: "686c181e00014b979848",
}  


export const client = new Client()

client
.setEndpoint(appwriteConfig.endpoint!)
.setProject(appwriteConfig.projectId!)
.setPlatform(appwriteConfig.platform!) 


export const account = new Account(client)
export const databases = new Databases(client)
const avatar  = new Avatars(client)


export const createUser = async ({name, email, password}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name)

    if (!newAccount) throw new Error

    await signIn({ email, password })

    const avatarUrl = await avatar.getInitialsURL(name)

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        name,
        password,
        email,
        avatar: avatarUrl
      }
    )
  


  } catch (error: any) {
    throw new Error(error as string)
  }
}


export const signIn = async ({email, password}: SignInParams) => {

  try{
    const session = await account.createEmailPasswordSession(email, password)

   
  }catch (error: any) {
    throw new Error(error as string)
  }
 
}


export const getCurrentUser = async () => {
  try{
    const userAccount  = await account.get()
    if (!userAccount) throw Error

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", userAccount.$id)]
    )

    if (!currentUser) throw Error
    return currentUser.documents[0]

  }catch(error){
    console.log(error)
    throw new Error(error as string)
  }
}