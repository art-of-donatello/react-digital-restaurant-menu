import React from "react"
import '../styles/globals.css';
import ReactDOM from 'react-dom'
import { SessionProvider } from "next-auth/react"
import store from "store/store";
import App from "next/app";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {Provider} from 'react-redux';



export default class MyApp extends App {

  static async getInitialProps({ Component, router, ctx,session}) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
 
    return { pageProps };
  }
  render() {
    const { Component, pageProps,session } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (

     
      <Provider store={store}>
          <SessionProvider session={session}>
              <Layout>
                  <Component {...pageProps} />
              
              </Layout>
          </SessionProvider>
      </Provider>
   
    
    );
  }
}
