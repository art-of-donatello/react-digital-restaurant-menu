import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import {app,db,auth} from "components/system/firebase";
import { getAuth,signOut, sendSignInLinkToEmail,signInWithEmailAndPassword,createUserWithEmailAndPassword,updateCurrentUser,updateProfile,updatePassword,updateEmail,updatePhoneNumber } from "firebase/auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "components/system/mongo";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = 
  {


    providers: [
        
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
          
        }
        )
      ],
      //client 284601990552-3nctqa87e965ahdesm5uqoiuqptkjjcd.apps.googleusercontent.com
      //client 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
      adapter: MongoDBAdapter(clientPromise),
      jwt: {
        encryption: true
      },
      secret: process.env.SECRET,
     /* pages: {
        signIn: '/auth/login',
        register: '/auth/register',
        
      },*/
      callbacks: {
        async jwt(token, account) {
          if (account ?.accessToken) {
            token.accessToken = account.accessToken
          }
          return token;
        },
        
    redirect: async (url, _baseUrl)=>{
      if (url === '/admin') {
        return Promise.resolve('/')
      }
      return  Promise.resolve('/')
    }
      }
      
      
}



export default NextAuth(authOptions)

