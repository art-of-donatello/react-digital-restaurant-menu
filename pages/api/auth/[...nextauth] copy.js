import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import {app,db,auth} from "components/system/firebase";
import { getAuth,signOut, sendSignInLinkToEmail,signInWithEmailAndPassword,createUserWithEmailAndPassword,updateCurrentUser,updateProfile,updatePassword,updateEmail,updatePhoneNumber } from "firebase/auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "components/system/mongo";
import GoogleProvider from "next-auth/providers/google";

const fireapp = getAuth(app);

export default NextAuth({


    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          session: {
            strategy: 'database'
          },
        
          credentials: {
            username: { label: "username", type: "text", placeholder: "username" },
            password: {  label: "password", type: "password" },
            loginType: {  label: "loginType", type: "hidden" },
          },
        
          async authorize(credentials, req) {
            // You need to provide your own logic here that takes the credentials
            // submitted and returns either a object representing a user or value
            // that is false/null if the credentials are invalid.
            // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            // You can also use the `req` object to obtain additional parameters
            // (i.e., the request IP address)
            // e.g. return { id: 1, name: 'J Smith', email: '
          
          
            

            
         /*   const res = await fetch("/your/endpoint", {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()*/
            
            // If no error and we have user data, return it
            var user1 ="";
            // Return null if user data could not be retrieved
            
            if(credentials.loginType==="login"){
                user1 = await login(credentials);
               
               user1= user1.email?{ id: 1, name: "", email: user1, token: 'asdasdadsad',adasd:'asdasd',user:"omer" }:"error:".user1;
               const user=user1;
               console.log(user1);
               return user;
            }else{
              console.log("buraya gelindi");
                user1 = await save(credentials);
               user1= user1.email?{ id: 1, name: "", email: user1, token: 'asdasdadsad',adasd:'asdasd',user:"omer" }:user1;
               const user=user1;
               console.log(user1);
               return user;
            }
        
           
          }
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
      ],
      //client 284601990552-3nctqa87e965ahdesm5uqoiuqptkjjcd.apps.googleusercontent.com
      //client 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
      adapter: MongoDBAdapter(clientPromise),
      secret: process.env.SECRET,
     /* pages: {
        signIn: '/auth/login',
        register: '/auth/register',
        
      },*/
      callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
          if (user) {
           
            // token = user;
            token.user=user
          }
          return Promise.resolve(token);
        },
        async session({ session, token, user }) {
          // Send properties to the client, like an access_token from a provider.
          console.log('### SESSION CALLBACK ###')
       
        
         
          session.accessToken = "asdasdas";
          session.user = token.user
          session.token = token
          session.user.fikir = "";
        
         
        // you might return this in new version
        return Promise.resolve(session)
        }
      }
      
      
})

async function login(credentials){
    var email="";
   await signInWithEmailAndPassword(fireapp,credentials.username,credentials.password).then((userCredential) => {
        // Signed in 
     
    
        email = {email:userCredential.user.email};
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error.code);
        const errorMessage = error.message;
        email = error.code;
      });
      return email;
}
async function save(credentials) {
    var email="";
    await createUserWithEmailAndPassword(fireapp,credentials.username,credentials.password).then((userCredential) => {
     
      email = {email:userCredential.user.email};
      console.log(userCredential.user.email);
      
      }).catch((error) => {
        email = null;
      console.log(error);
       
    });
    return email;
}
