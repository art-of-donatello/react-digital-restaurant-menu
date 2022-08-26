
import { NextResponse } from "next/server"




export async function middleware(req,res) {
  // return early if url isn't supposed to be protected
   // Doesn't work here 
  if (req.url.includes("/Login")) {
    return NextResponse.next()
  }


  // You could also check for any property on the session object,
  // like role === "admin" or name === "John Doe", etc.


  // If user is authenticated, continue.
  return NextResponse.next()
}