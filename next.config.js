/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    apiKey: "AIzaSyAxws6Q7gXSEojmErwfP2YAbG_tBPaNAIQ",
    authDomain: "mywebsite-62e8c.firebaseapp.com",
    databaseURL: "https://mywebsite-62e8c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mywebsite-62e8c",
    storageBucket: "mywebsite-62e8c.appspot.com",
    messagingSenderId: "284601990552",
    appId: "1:284601990552:web:1d971d15c5c8fb3ea87fed",
    measurementId: "G-JQNSPQ67M6",
    MONGODB_URI: "mongodb+srv://omarx816:135790Omer@cluster0.dcjbm.mongodb.net/?retryWrites=true&w=majority",
    GOOGLE_CLIENT_ID: "284601990552-66k2rvm6fgh667u8e6ol36gsvafsuvm1.apps.googleusercontent.com",
    
    GOOGLE_CLIENT_SECRET: "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",
    AWS_ACCESS_KEY_ID: "AKIATZVWWAVE33HSI6GC",
    AWS_SECRET_ACCESS_KEY: "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",
    AWS_BUCKET_NAME: "myqrcodeapp",
  },
  
}

module.exports = nextConfig
