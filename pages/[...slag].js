import React from "react";

import { useRouter } from "next/router";

export default function Home() {

const data=useRouter();

console.log(data.query.slag);


return ""

}