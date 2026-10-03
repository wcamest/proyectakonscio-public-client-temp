import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  return redirect("/blogs/notikonscio");
}

export default page