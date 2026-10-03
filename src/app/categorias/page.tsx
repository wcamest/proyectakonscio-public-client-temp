import { redirect } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'

const page = () => {
  redirect('/categorias/economia-real-colaborativa')
}

export default page